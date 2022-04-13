import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import ExpertDashboard from "../../../components/dashboard/experts/ExpertDashboard";
import Layout from "../../../components/layout/Layout";
const ExpertDashboardPaymentsPage = () => {
    return (
        <Layout title="Payments | Expert Dashboard | SlicedAdvice">
            <ExpertDashboard currentPage="Payments" />
        </Layout>
    );
};

export async function getServerSideProps<GetServerSideProps>(context: any) {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: `/login?returnUrl=/dashboard/expert/payments&returnContext=expert%20dashboard%20payments%20page`,
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}

export default ExpertDashboardPaymentsPage;
