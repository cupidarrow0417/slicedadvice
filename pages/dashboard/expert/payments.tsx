import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import ExpertDashboard from "../../../components/dashboard/experts/ExpertDashboard";
import Layout from "../../../components/layout/Layout";
import { wrapper } from "../../../redux/store";
const ExpertDashboardPaymentsPage = () => {
    return (
        <Layout title="Payments | Expert Dashboard | SlicedAdvice">
            <ExpertDashboard currentPage="Payments" />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        const session = await getSession({ req });

        if (!session) {
            return {
                redirect: {
                    destination: `/login?returnUrl=/dashboard/expert/payments&returnContext=expert%20dashboard%20payments%20page`,
                    permanent: false,
                },
            };
        }
        try {
            // await store.dispatch(getExpertisePosts(req));
            return { props: { session } };
        } catch (e) {
            return { props: { session } };
        }
    });

export default ExpertDashboardPaymentsPage;
