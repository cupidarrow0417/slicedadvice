import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Login from "../components/auth/Login";
import Layout from "../components/layout/Layout";

export default function LoginPage() {
    const { query: queryParams } = useRouter();

    return (
        <Layout title="Login to SlicedAdvice">
            <Login />
        </Layout>
    );
}

export async function getServerSideProps<GetServerSideProps>(context: any) {
    //first check if the user is already logged in. if so, then
    //redirect them to the home page
    const session = await getSession({ req: context.req });

    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}
