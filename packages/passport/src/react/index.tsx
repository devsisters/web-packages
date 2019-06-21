import * as React from 'react';
import { useContext } from 'react';

import { Token } from '../index';

export const tokenContext: React.Context<Token> = React.createContext(null as any);
export const useToken = () => useContext(tokenContext);
export const useEmail = () => useContext(tokenContext).content.email;
export const useName = () => useContext(tokenContext).content.name;
