import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import BookingsDashboard from "../../../components/dashboard/BookingsDashboard";
import Dashboard from "../../../components/dashboard/Dashboard";
import Layout from "../../../components/layout/Layout";
import dbConnect from "../../../config/dbConnect";
import { getBookings } from "../../../redux/actionCreators/bookingActionCreators";
import { wrapper } from "../../../redux/store";
import checkStripeField from "../../../utils/checkStripeField";
import User from "../../../models/user";

const ExpertDashboardBookingsPage = ({ user }: any) => {
    return (
        <Layout title="Bookings | Expert Dashboard | SlicedAdvice">
            <Dashboard dashboardType="Expert" user={user}>
                <BookingsDashboard dashboardType="Expert" />
            </Dashboard>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        dbConnect();
        const session: any = await getSession({ req });

        if (!session) {
            return {
                redirect: {
                    destination: `/login?returnUrl=/dashboard/expert/bookings&returnContext=expert%20dashboard%20bookings%20page`,
                    permanent: false,
                },
            };
        }

        const isOnboarded = await checkStripeField(
            session.user._id,
            "charges_enabled",
            undefined
        );
        if (!isOnboarded) {
            return {
                redirect: {
                    destination: `/dashboard/expert/home`,
                    permanent: false,
                },
            };
        }

        try {
            // Get user from database
            const user = await User.findById(session.user._id).lean();
            await store.dispatch(
                getBookings(req, 1, undefined, undefined, session.user._id)
            );
            return {
                props: {
                    user: JSON.parse(JSON.stringify(user)),
                },
            };
        } catch (e) {
            return { props: { user: null } };
        }
    });

export default ExpertDashboardBookingsPage;
