import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Dashboard from "../../../components/dashboard/Dashboard";
import PostsExpertDashboard from "../../../components/dashboard/expert/posts/PostsExpertDashboard";
import Layout from "../../../components/layout/Layout";
import dbConnect from "../../../config/dbConnect";
import User from "../../../models/user";
import ExpertisePost from "../../../models/expertisePost";

const ExpertDashboardPostsPage = ({
    user,
    expertisePosts,
}: any) => {
    return (
        <Layout title="Posts | Expert Dashboard | SlicedAdvice">
            <Dashboard dashboardType="Expert" user={user}>
                <PostsExpertDashboard
                    expertisePosts={expertisePosts}
                    user={user}
                />
            </Dashboard>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    dbConnect();
    const session: any = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: `/login?returnUrl=/dashboard/expert/posts&returnContext=expert%20dashboard%20posts%20page`,
                permanent: false,
            },
        };
    }

    let user;
    let expertisePosts;
    if (session) {
        user = await User.findById(session.user._id).lean();
        expertisePosts = await ExpertisePost.find({
            user: session?.user._id,
        })
            .sort({ createdAt: -1 })
            .lean();
    }

    return {
        props: {
            user: JSON.parse(JSON.stringify(user)),
            expertisePosts: JSON.parse(JSON.stringify(expertisePosts)),
        },
    };
};

export default ExpertDashboardPostsPage;
