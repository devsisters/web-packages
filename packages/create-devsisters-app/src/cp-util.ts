import * as childProcess from 'child_process';

export function spawn(command: string, options?: childProcess.SpawnOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = childProcess.spawn(command, {
      stdio: ['pipe', process.stdout, process.stderr],
      shell: true,
      ...options,
    });
    child.on('close', code => code === 0 ? resolve() : reject(code));
    child.on('error', reject);
  });
}
