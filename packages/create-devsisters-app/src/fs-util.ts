import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

import * as makeDir from "make-dir";

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);
const filterNotNull = <T>(arr: T[]) =>
  arr.filter((v) => v != null) as NonNullable<T>[];

export interface FileTree {
  [name: string]: FileTree | Buffer;
}

export async function readAll(dir: string): Promise<FileTree> {
  const result: FileTree = {};
  const itemNames = await readdir(dir);
  interface Item {
    isFile: boolean;
    name: string;
  }
  const a = filterNotNull(
    await Promise.all(
      itemNames.map(async (name) => {
        const statResult = await stat(path.resolve(dir, name));
        const isFile = statResult.isFile();
        const isDirectory = statResult.isDirectory();
        if (isFile || isDirectory) return { isFile, name } as Item;
        return null;
      })
    )
  );
  const b = await Promise.all(
    a.map(async ({ isFile, name }) => {
      const itemPath = path.resolve(dir, name);
      if (isFile) return [name, await readFile(itemPath)] as const;
      return [name, await readAll(itemPath)] as const;
    })
  );
  for (const [key, value] of b) result[key] = value;
  return result;
}

export async function writeAll(dir: string, fileTree: FileTree): Promise<void> {
  await makeDir(dir);
  for (const [name, value] of Object.entries(fileTree)) {
    const itemPath = path.resolve(dir, name);
    if (Buffer.isBuffer(value)) {
      const encoding = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(itemPath)
        ? "base64"
        : "utf8";
      await writeFile(itemPath, value, encoding);
    } else {
      await writeAll(itemPath, value);
    }
  }
}

export type MapFile = (value: Buffer, fileName: string) => Buffer;
export function mapFiles(fileTree: FileTree, mapFile: MapFile): FileTree {
  const result: FileTree = {};
  for (const [name, value] of Object.entries(fileTree)) {
    if (Buffer.isBuffer(value)) {
      result[name] = mapFile(value, name);
    } else {
      result[name] = mapFiles(value, mapFile);
    }
  }
  return result;
}
