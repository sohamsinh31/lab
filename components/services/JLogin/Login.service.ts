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

        const result = await this.request('POST', data, true);
        if (result) {
            nookies.set(null, 'username', data.username, { maxAge: 30 * 60 * 3600, path: "/" })
            console.log('Login successful:', result);
        } else {
            console.error('Login failed:', this.error.message);
        }
    }
}