import * as React from 'react';
import { login, Token } from '../index';
import { useContext } from 'react';

interface RootState {
    token: Token | null;
}

interface RootProps {
    clientId: string;
}

export class Root extends React.Component<RootProps, RootState> {
    state: RootState = {
        token: null
    };

    async componentDidMount() {
        const loginResult = await login({ clientId: this.props.clientId });

        for await (const token of loginResult) {
            this.setState({ token });
        }
    }

    render() {
        const { token } = this.state;
        if (!token)
            return null;

        return (
            <tokenContext.Provider value={token}>
                {this.props.children}
            </tokenContext.Provider>
        )
    }
}

export const tokenContext: React.Context<Token> = React.createContext(null as any);

export function useToken() {
    return useContext(tokenContext);
}
