import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import RefreshStripeMessage from "../../../components/dashboard/expert/RefreshStripeMessage";
import Layout from "../../../components/layout/Layout";
const StripeConnectOnboardingRefreshPage = () => {
    return (
        <Layout title="Redirecting to Stripe | SlicedAdvice">
            <RefreshStripeMessage />
        </Layout>
    );
};

export async function getServerSideProps<GetServerSideProps>(context: any) {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: `/login?returnUrl=/dashboard/expert/refresh&returnContext=expert%20payout%20onboarding%20flow`,
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}

export default StripeConnectOnboardingRefreshPage;