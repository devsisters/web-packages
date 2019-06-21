import * as React from 'react';
import { useState, useEffect } from 'react';

import { login, Token } from '.';
import { tokenContext } from './react';

interface PluginOptions {
    clientId: string;
}

export default ({ element }: any, pluginOptions: PluginOptions) => {
    return (
        <Login clientId={pluginOptions.clientId}>
            {element}
        </Login>
    );
};

interface LoginProps {
    clientId: string;
    children?: React.ReactNode;
}
const Login: React.FC<LoginProps> = ({ clientId, children }) => {
    const [token, setToken] = useState<Token | null>(null);
    const loginAndRefreshLoop = async () => {
        const loginResult = await login({ clientId });
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
