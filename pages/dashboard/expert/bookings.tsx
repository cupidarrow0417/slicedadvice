import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import ExpertDashboard from "../../../components/dashboard/experts/ExpertDashboard";
import Layout from "../../../components/layout/Layout";
import { getBookings } from "../../../redux/actions/bookingActions";
import { wrapper } from "../../../redux/store";
const ExpertDashboardBookingsPage = () => {
    return (
        <Layout title="Bookings | Expert Dashboard | SlicedAdvice">
            <ExpertDashboard currentPage="Bookings" />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        const session = await getSession({ req });

        if (!session) {
            return {
                redirect: {
                    destination: `/login?returnUrl=/dashboard/expert/bookings&returnContext=expert%20dashboard%20bookings%20page`,
                    permanent: false,
                },
            };
        }
        try {
            await store.dispatch(getBookings(req));
            return { props: { session } };
        } catch (e) {
            return { props: { session } };
        }
    });

export default ExpertDashboardBookingsPage;
