import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import ExpertDashboard from "../../../components/dashboard/experts/ExpertDashboard";
import Layout from "../../../components/layout/Layout";
import { getExpertisePosts } from "../../../redux/actions/expertisePostActions";
import { wrapper } from "../../../redux/store";
import checkStripeField from "../../../utils/checkStripeField";
const ExpertDashboardPostsPage = () => {
    return (
        <Layout title="Posts | Expert Dashboard | SlicedAdvice">
            <ExpertDashboard currentPage="Posts" />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        const session: any = await getSession({ req });

        if (!session) {
            return {
                redirect: {
                    destination: `/login?returnUrl=/dashboard/expert/posts&returnContext=expert%20dashboard%20posts%20page`,
                    permanent: false,
                },
            };
        }

        const isOnboarded = await checkStripeField(session.user.email, "charges_enabled", undefined)

        if (!isOnboarded) {
            return {
                redirect: {
                    destination: `/dashboard/expert/home`,
                    permanent: false,
                },
            };
        }
        try {
            await store.dispatch(getExpertisePosts(req));
            return { props: { session } };
        } catch (e) {
            return { props: { session } };
        }
    });

export default ExpertDashboardPostsPage;
