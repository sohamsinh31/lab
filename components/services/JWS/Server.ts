export abstract class JWServer {
    private static apiUrl: string;
    private path: string;

    // Define the error structure that the subclass will override
    abstract error: { state: boolean; code: string; message: string };

    // Protected constructor to initialize API path and avoid direct instantiation
    protected constructor(path: string) {
        console.log(process.env.NEXT_PUBLIC_JWS_URL)
        JWServer.apiUrl = process.env.NEXT_PUBLIC_JWS_URL + "/api" || 'http://localhost:8080/api';
        this.path = path;
    }

    // Method to make HTTP requests, can be reused across subclasses
    protected async request(
        method: 'POST' | 'GET' | 'PUT' | 'DELETE',
        data?: any,
        type: boolean = false // false for JSON (default), true for form-data
    ): Promise<any> {
        try {
            let body: any = null;
            let headers: any = {};

            // If type is true, prepare the data as FormData
            if (type) {
                body = new FormData();
                for (const key in data) {
                    body.append(key, data[key]);
                }
                // Do not set Content-Type header, browser will automatically set it with boundary
            } else {
                body = data ? JSON.stringify(data) : null;
                headers['Content-Type'] = 'application/json'; // Set content type to JSON if it's not form data
            }

            // Log the data being sent for debugging purposes
            console.log(type ? body : JSON.stringify(data) || "No data found");

            // Make the HTTP request
            const response = await fetch(`${JWServer.apiUrl}${this.path}`, {
                method,
                headers: type ? undefined : headers, // No headers for form data; the browser will handle it
                body: body,
                credentials: 'include', // Send cookies with requests
            });

            // Handle error responses
            if (!response.ok) {
                const errorData = await response.json();
                this.error = {
                    state: true,
                    code: response.status.toString(),
                    message: errorData.message || 'Request failed',
                };
                return null;
            }

            // Return the response data as JSON
            return response.json();
        } catch (err: any) {
            this.error = {
                state: true,
                code: '500',
                message: err.message || 'Server Error',
            };
            return null;
        }
    }

    // Abstract method that subclasses must implement
    abstract processRequest(): void;
}
