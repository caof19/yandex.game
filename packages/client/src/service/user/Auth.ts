/*
 *
 * Я так полагаю что у нас будет состояния авторизации храниться через Redux в будущем, пока просто синглтон
 * Сейчас не рационально делать иную авторизацию, потому что куки авторизации http-only, поэтому для проверки авторизации нужно делать запрос на сервер
 * Может я и не прав, но вроде так
 *
 * */
export default class Auth {
    private isAuth: boolean;
    private static instance: Auth;

    constructor() {
        if (Auth.instance) {
            return Auth.instance;
        }

        Auth.instance = this;
    }

    getAuthStatus() {
        return this.isAuth;
    }

    setSignIn() {
        this.isAuth = true;
    }

    setSignOut() {
        this.isAuth = false;
    }
}
