import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Login from "../components/auth/Login";
import Layout from "../components/layout/Layout";



export default function LoginPage() {
    const { query: queryParams } = useRouter();

    //check if they were redirected to here
    //from a specific page by checking the returnContext url. If so,
    //send that context information to the Login component, which will
    //render that with the header text to tell the user why they were 
    //abruptly sent here.
    const redirectContextStr = queryParams.returnContext ? queryParams.returnContext.toString() : ''
    return (
        <Layout title="Login to SlicedAdvice">
            <Login redirectContextStr={redirectContextStr} />
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
