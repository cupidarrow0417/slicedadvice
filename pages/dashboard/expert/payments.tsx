import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Dashboard from "../../../components/dashboard/Dashboard";
import PaymentsExpertDashboard from "../../../components/dashboard/expert/payments/PaymentsExpertDashboard";
import Layout from "../../../components/layout/Layout";
import { loadUser } from "../../../redux/actionCreators/userActions";
import { wrapper } from "../../../redux/store";
const ExpertDashboardPaymentsPage = () => {
    return (
        <Layout title="Payments | Expert Dashboard | SlicedAdvice">
            <Dashboard dashboardType="Expert">
                <PaymentsExpertDashboard />
            </Dashboard>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        const session: any = await getSession({ req });

        if (!session) {
            return {
                redirect: {
                    destination: `/login?returnUrl=/dashboard/expert/payments&returnContext=expert%20dashboard%20payments%20page`,
                    permanent: false,
                },
            };
        }
        try {
            await store.dispatch(loadUser(req, session.user._id));
            return { props: { session } };
        } catch (e) {
            return { props: { session } };
        }
    });

export default ExpertDashboardPaymentsPage;
