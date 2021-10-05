import * as React from 'react';
import { useState, useEffect } from 'react';

import { login, Token, FakeToken } from '.';
import { tokenContext, setFakeTokenContext } from './react';

interface PluginOptions {
    clientId: string;
    url?: string;
    realm?: string;
}

export default ({ element }: { element: React.ReactNode }, pluginOptions: PluginOptions) => {
    return (
        <Login pluginOptions={pluginOptions}>
            {element}
        </Login>
    );
};

interface LoginProps {
    children?: React.ReactNode;
    pluginOptions: PluginOptions;
}
const Login: React.FC<LoginProps> = ({ children, pluginOptions }) => {
    const [fakeToken, setFakeToken] = useFakeToken();
    const realToken = useLogin(pluginOptions);
    const token = fakeToken || realToken;
    if (!token) return null;
    return (
        <setFakeTokenContext.Provider value={setFakeToken}>
            <tokenContext.Provider value={token}>
                {children}
            </tokenContext.Provider>
        </setFakeTokenContext.Provider>
    );
};

function useLogin(pluginOptions: PluginOptions) {
    const [token, setToken] = useState<Token | null>(null);
    const loginAndRefreshLoop = async () => {
        const loginResult = await login(pluginOptions);
        for await (const token of loginResult) setToken(token);
    };
    useEffect(() => {
        if (sessionStorage.getItem('@devsisters/passport:skip-login') === 'true') return;
        loginAndRefreshLoop();
    }, []);
    return token;
}

function useFakeToken() {
    const key = '@devsisters/passport:fake-token' as const;
    const [fakeToken, setFakeToken] = useState<FakeToken | null>(null);
    useEffect(() => {
        const payload = sessionStorage.getItem(key);
        if (!payload) return;
        const { content, clientId } = JSON.parse(payload);
        setFakeToken(FakeToken.create(content, clientId));
    }, []);
    useEffect(() => {
        if (!fakeToken) return sessionStorage.removeItem(key);
        sessionStorage.setItem(key, JSON.stringify(fakeToken));
    }, [fakeToken]);
    return [fakeToken, setFakeToken] as const;
}
