import * as React from 'react';
import { useState, useEffect } from 'react';

import { login, Token, FakeToken } from '.';
import { tokenContext, setFakeTokenContext } from './react';

const FAKE_SESSION_KEY = '@devsisters/passport:fake-token';

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
    const [fakeToken, setFakeToken] = useState<FakeToken | null>(null);
    const loginAndRefreshLoop = async () => {
        const loginResult = await login(loginConfig);
        for await (const token of loginResult) {
            setToken(token);
        }
    };

    useEffect(() => {
        if (fakeToken) {
            sessionStorage.setItem(FAKE_SESSION_KEY, JSON.stringify(fakeToken));
        }
    }, [fakeToken]);

    useEffect(() => {
        const fakeSessionPayload = sessionStorage.getItem(FAKE_SESSION_KEY);
        if (fakeSessionPayload) {
            const { content, clientId } = JSON.parse(fakeSessionPayload);
            setFakeToken(FakeToken.create(content, clientId));
        } else {
            loginAndRefreshLoop();
        }
    }, []);

    if (!fakeToken && !token) return null;

    return (
        <setFakeTokenContext.Provider value={setFakeToken}>
            <tokenContext.Provider value={(fakeToken || token)!}>
                {children}
            </tokenContext.Provider>
        </setFakeTokenContext.Provider>
    );
};
