import * as React from 'react';
import { useContext } from 'react';

import { Token } from '../index';

export const tokenContext: React.Context<Token> = React.createContext(null as any);
export const useToken = () => useContext(tokenContext);
