import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import BookingsDashboard from "../../../components/dashboard/BookingsDashboard";
import Dashboard from "../../../components/dashboard/Dashboard";
import Layout from "../../../components/layout/Layout";
import { getBookings } from "../../../redux/actionCreators/bookingActionCreators";
import { loadUser } from "../../../redux/actionCreators/userActions";
import { wrapper } from "../../../redux/store";
import checkStripeField from "../../../utils/checkStripeField";
const ExpertDashboardBookingsPage = () => {
    return (
        <Layout title="Bookings | Expert Dashboard | SlicedAdvice">
            <Dashboard dashboardType="Expert">
                <BookingsDashboard dashboardType = "Expert"/>
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
                    destination: `/login?returnUrl=/dashboard/expert/bookings&returnContext=expert%20dashboard%20bookings%20page`,
                    permanent: false,
                },
            };
        }

        const isOnboarded = await checkStripeField(session.user._id, "charges_enabled", undefined)
        if (!isOnboarded) {
            return {
                redirect: {
                    destination: `/dashboard/expert/home`,
                    permanent: false,
                },
            };
        }
        
        try {
            await store.dispatch(loadUser(req, session.user._id));
            await store.dispatch(getBookings(req, 1, undefined, undefined, session.user._id));
            return { props: { session } };
        } catch (e) {
            return { props: { session } };
        }
    });

export default ExpertDashboardBookingsPage;
