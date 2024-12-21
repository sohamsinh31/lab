import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function useSessionExpirationCheck() {
    const { data: session } : any = useSession();

    useEffect(() => {
        if (!session || !session.accessTokenExpires) return;

        const expirationTime = session.accessTokenExpires as number;
        const isExpired = Date.now() > expirationTime;

        if (isExpired) {
            toast.warning("Your session has expired. Please log in again.", {
                position: "top-right",
                autoClose: 5000,
            });
        } else {
            // Set timeout to show toast just before the token actually expires
            const timeout = setTimeout(() => {
                toast.warning("Your session has expired. Please log in again.", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }, expirationTime - Date.now());

            return () => clearTimeout(timeout); // Clean up on unmount
        }
    }, [session]);
}
