import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Dashboard from "../../../components/dashboard/Dashboard";
import PaymentsExpertDashboard from "../../../components/dashboard/expert/payments/PaymentsExpertDashboard";
import Layout from "../../../components/layout/Layout";
import dbConnect from "../../../config/dbConnect";
import User from "../../../models/user";
const ExpertDashboardPaymentsPage = ({ user }: any) => {
    return (
        <Layout title="Payments | Expert Dashboard | SlicedAdvice">
            <Dashboard dashboardType="Expert" user={user}>
                <PaymentsExpertDashboard />
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
                destination: `/login?returnUrl=/dashboard/expert/payments&returnContext=expert%20dashboard%20payments%20page`,
                permanent: false,
            },
        };
    }
    // Get user from database
    const user = await User.findById(session.user._id).lean();
    return {
        props: {
            user: JSON.parse(JSON.stringify(user)),
        },
    };
    } catch (e) {
        console.log(e);
        return {
            props: {
                user: {},
            },
        };
    }
};
export default ExpertDashboardPaymentsPage;
