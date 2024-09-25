import { JWServer } from "../JWS/Server";

export class Services extends JWServer {
    // Error structure overridden by the subclass
    public error = { state: false, code: '', message: '' };
     processRequest(): void {
        throw new Error("Method not implemented.");
    }

}