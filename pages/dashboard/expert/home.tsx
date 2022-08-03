import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Dashboard from "../../../components/dashboard/Dashboard";
import HomeExpertDashboard from "../../../components/dashboard/expert/home/HomeExpertDashboard";
import Layout from "../../../components/layout/Layout";
import dbConnect from "../../../config/dbConnect";
import User from "../../../models/user";
import ExpertisePost from "../../../models/expertisePost";
import Booking from "../../../models/booking";

const ExpertDashboardHomePage = ({ user, expertisePosts, bookings }: any) => {
    return (
        <Layout title="Home | Expert Dashboard | SlicedAdvice">
            <Dashboard dashboardType="Expert" user={user}>
                <HomeExpertDashboard
                    user={user}
                    expertisePosts={expertisePosts}
                    bookings={bookings}
                />
            </Dashboard>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        dbConnect();
        const session: any = await getSession({ req: context.req });

        if (!session) {
            return {
                redirect: {
                    destination: `/login?returnUrl=/dashboard/expert/home&returnContext=expert%20dashboard%20home%20page`,
                    permanent: false,
                },
            };
        }

        let user;
        let expertisePosts;
        let bookings;
        if (session) {
            user = await User.findById(session.user._id).lean();
            expertisePosts = await ExpertisePost.find({
                user: session?.user._id,
            })
                .sort({ createdAt: -1 })
                .limit(5)
                .lean();
            bookings = await Booking.find({
                expert: session?.user._id,
            })
                .sort({ createdAt: -1 })
                .limit(5)
                .lean();
        }

        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                expertisePosts: JSON.parse(JSON.stringify(expertisePosts)),
                bookings: JSON.parse(JSON.stringify(bookings)),
            },
        };
    } catch (e) {
        console.log(e);
        return { props: { user: null, expertisePosts: null, bookings: null } };
    }
};

export default ExpertDashboardHomePage;
