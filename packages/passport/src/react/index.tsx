import * as React from 'react';
import { useContext } from 'react';

import { Token, FakeToken } from '../index';

export type SetFakeToken = (fakeToken: FakeToken | null) => void;
export const setFakeTokenContext = React.createContext<SetFakeToken>(null as any);
export const tokenContext = React.createContext<Token>(null as any);

export const useSetFakeToken = () => useContext(setFakeTokenContext);
export const useToken = () => useContext(tokenContext);
export const useEmail = () => useContext(tokenContext).content.email;
export const useName = () => useContext(tokenContext).content.name;
