import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import ExpertDashboard from "../../../components/dashboard/experts/ExpertDashboard";
import Layout from "../../../components/layout/Layout";
const ExpertDashboardSubmissionsPage = () => {
    return (
        <Layout title="Submissions | Expert Dashboard | SlicedAdvice">
            <ExpertDashboard currentPage="Submissions" />
        </Layout>
    );
};

export async function getServerSideProps<GetServerSideProps>(context: any) {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: `/login?returnUrl=/dashboard/expert/submissions&returnContext=expert%20dashboard%20submissions%20page`,
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}

export default ExpertDashboardSubmissionsPage;
