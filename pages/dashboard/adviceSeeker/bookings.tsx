import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import BookingsDashboard from "../../../components/dashboard/BookingsDashboard";
import Dashboard from "../../../components/dashboard/Dashboard";
import Layout from "../../../components/layout/Layout";
import { getBookings } from "../../../redux/actionCreators/bookingActionCreators";
import { wrapper } from "../../../redux/store";
const AdviceSeekerDashboardBookingsPage = () => {
    return (
        <Layout title="Bookings | Advice Seeker Dashboard | SlicedAdvice">
            <Dashboard dashboardType="Advice Seeker">
                <BookingsDashboard dashboardType="Advice Seeker"/>
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
                    destination: `/login?returnUrl=/dashboard/adviceSeeker/bookings&returnContext=advice%20seeker%20dashboard%20bookings%20page`,
                    permanent: false,
                },
            };
        }
        
        try {
            await store.dispatch(getBookings(req, 1, undefined, session.user._id, undefined));
            return { props: { session } };
        } catch (e) {
            return { props: { session } };
        }
    });

export default AdviceSeekerDashboardBookingsPage;
