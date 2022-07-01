import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import PaymentsAdviceSeekerDashboard from "../../../components/dashboard/adviceSeeker/payments/PaymentsAdviceSeekerDashboard";
import Dashboard from "../../../components/dashboard/Dashboard";
import Layout from "../../../components/layout/Layout";
import { wrapper } from "../../../redux/store";
const AdviceSeekerDashboardPaymentsPage = () => {
    return (
        <Layout title="Payments | Advice Seeker Dashboard | SlicedAdvice">
            <Dashboard dashboardType="Advice Seeker">
                <PaymentsAdviceSeekerDashboard />
            </Dashboard>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        const session = await getSession({ req });

        if (!session) {
            return {
                redirect: {
                    destination: `/login?returnUrl=/dashboard/adviceSeeker/payments&returnContext=advice%20seeker%20dashboard%20payments%20page`,
                    permanent: false,
                },
            };
        }
        try {
            return { props: { session } };
        } catch (e) {
            return { props: { session } };
        }
    });

export default AdviceSeekerDashboardPaymentsPage;
