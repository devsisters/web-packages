import * as React from 'react';
import { useState, useEffect } from 'react';

import { login, Token } from '.';
import { tokenContext } from './react';

interface PluginOptions {
    clientId: string;
    url?: string;
    realm?: string;
}

export default ({ element }: any, pluginOptions: PluginOptions) => {
    return (
        <Login {...pluginOptions}>
            {element}
        </Login>
    );
};

interface LoginProps {
    clientId: string;
    url?: string;
    realm?: string;
    children?: React.ReactNode;
}
const Login: React.FC<LoginProps> = ({ children, ...loginConfig }) => {
    const [token, setToken] = useState<Token | null>(null);
    const loginAndRefreshLoop = async () => {
        const loginResult = await login(loginConfig);
        for await (const token of loginResult) {
            setToken(token);
        }
    };
    useEffect(() => void loginAndRefreshLoop(), []);
    if (!token) return null;
    return (
        <tokenContext.Provider value={token}>
            {children}
        </tokenContext.Provider>
    );
};
