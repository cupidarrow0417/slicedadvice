import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import ExpertDashboard from "../../../components/dashboard/experts/ExpertDashboard";
import Layout from "../../../components/layout/Layout";
const ExpertDashboardHomePage = () => {
    return (
        <Layout title="Home | Expert Dashboard| SlicedAdvice">
            <ExpertDashboard currentPage="Home" />
        </Layout>
    );
};

export async function getServerSideProps<GetServerSideProps>(context: any) {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: `/login?returnUrl=/dashboard/expert/home&returnContext=expert%20dashboard%20home%20page`,
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}

export default ExpertDashboardHomePage;
