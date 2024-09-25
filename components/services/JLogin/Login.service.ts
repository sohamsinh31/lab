import { JWServer } from "../JWS/Server";
import nookies from "nookies"

export class JLogin extends JWServer {
    private static username: string;
    private static password: string;

    // Error structure overridden by the subclass
    public error = { state: false, code: '', message: '' };

    constructor() {
        super('/login'); // Pass the specific API path to JWServer
    }

    // Set the login data
    public static setCredentials(username: string, password: string): void {
        JLogin.username = username;
        JLogin.password = password;
    }

    // Override the processRequest method to send the login request
    public async processRequest(): Promise<void> {
        const data = {
            username: JLogin.username,
            password: JLogin.password,
        };

        const result = await this.request('POST', data, false);
        if (result) {
            nookies.set(null, 'jwtoken', result.token, { maxAge: 7 * 24 * 60 * 60 * 1000, path: "/" })
            nookies.set(null, 'username', data.username, { maxAge: 7 * 24 * 60 * 60 * 1000, path: "/" })
            // console.log('Login successful:', result);
        } else {
            console.error('Login failed:', this.error.message);
        }
    }
}