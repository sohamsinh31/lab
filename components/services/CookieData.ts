import { getServerSession } from 'next-auth/next'; // For server-side session retrieval
import authOptions from '@/pages/api/auth/[...nextauth]'; // Adjust this import path based on your project structure

// This is for server-side usage
export const getServerSideUser = async (ctx: any) => {
    const session: any = await getServerSession(ctx.req, ctx.res, authOptions);
    return session?.user?.name || null;
};

// Custom hook for client-side usage
import { useSession } from 'next-auth/react';

export const useClientSideUser = () => {
    const { data: session } = useSession();
    const username = session?.user?.name || 'Error';
    return { username };
};
