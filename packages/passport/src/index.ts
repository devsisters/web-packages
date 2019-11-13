import { IncomingHttpHeaders } from 'http';
import { KeycloakInstance } from 'keycloak-js';

const _Token: typeof Token = require('keycloak-connect/middleware/auth-utils/token');
export declare class Token {
    token: string;
    clientId: string;
    header: {};
    content: { exp: number, email: string, name: string };
    signature: Buffer;
    signed: string;
    constructor(token: string, clientId?: string);
    isExpired(): boolean;
    hasRole(name: string): boolean;
    hasApplicationRole(clientId: string, roleName: string): boolean;
    hasRealmRole(roleName: string): boolean;
    hasPermission(resource: string, scope?: string): boolean;
}

const authServerUrl = 'https://auth.devsisters.cloud/auth';
const defaultRealm = 'devsisters';

export interface GetAuthHeadersConfig {
    token: Token;
}
export function getAuthHeaders(config: GetAuthHeadersConfig) {
    const {
        token,
    } = config;
    return {
        'Authorization': `Bearer ${ token.token }`,
    };
}

const grantManagers: { [grantManagerHash: string]: any } = {};
export interface VerifyConfig {
    headers: IncomingHttpHeaders;
    realm?: string;
    url?: string;
}
export async function verify({
    headers,
    realm = defaultRealm,
    url = authServerUrl,
}: VerifyConfig): Promise<Token> {
    const { authorization } = headers;
    if (typeof authorization !== 'string') throw new Error();
    if (!authorization.startsWith('Bearer ')) throw new Error();
    const token = new _Token(authorization.substring(7));
    // 인증에 실패하면 안쪽에서 에러를 던져줍니다.
    await getGrantManager(realm).validateToken(token, 'Bearer');
    function getGrantManager(realm: string) {
        const grantManagerHash = realm;
        if (grantManagers[grantManagerHash]) return grantManagers[grantManagerHash];
        const nodeRequire = eval('require'); // to prevent webpack
        const Config = nodeRequire('keycloak-connect/middleware/auth-utils/config');
        const GrantManager = nodeRequire('keycloak-connect/middleware/auth-utils/grant-manager');
        grantManagers[grantManagerHash] = new GrantManager(new Config({
            authServerUrl: url,
            realm,
        }));
        return grantManagers[grantManagerHash];
    }
    return token;
}

export interface LoginConfig {
    [keycloakConfig: string]: any;
    realm?: string;
    clientId: string;
    checkLoginIframe?: boolean;
}
export interface LoginResult extends AsyncIterableIterator<Token> {
    [Symbol.asyncIterator](): LoginResult;
    next(): Promise<IteratorResult<Token>>;
    keycloak: KeycloakInstance;
}
export async function login(config: LoginConfig): Promise<LoginResult> {
    const Keycloak = await import('keycloak-js');
    const {
        checkLoginIframe = false,
        ...keycloakProps
    } = config;
    const keycloak = Keycloak({
        url: authServerUrl,
        realm: defaultRealm,
        ...keycloakProps,
    });
    keycloak.onTokenExpired = async () => {
        await keycloak.updateToken(-1);
        t = new _Token(keycloak.token!);
        resolve();
    };
    await keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe,
    });
    let t: Token | null = new _Token(keycloak.token!);
    let r: ((t: IteratorResult<Token>) => void)[] = [];
    const resolve = () => {
        if (!t || !r.length) return;
        for (const resolve of r) {
            resolve({
                done: false,
                value: t,
            });
        }
        t = null;
        r = [];
    };
    const result: LoginResult = {
        [Symbol.asyncIterator]: () => result,
        next: () => new Promise(_r => {
            r.push(_r);
            resolve();
        }),
        keycloak,
    };
    return result;
}
