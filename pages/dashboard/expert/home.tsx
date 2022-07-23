import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Dashboard from "../../../components/dashboard/Dashboard";
import HomeExpertDashboard from "../../../components/dashboard/expert/home/HomeExpertDashboard";
import Layout from "../../../components/layout/Layout";
import { getBookings } from "../../../redux/actionCreators/bookingActionCreators";
import { loadUser } from "../../../redux/actionCreators/userActions";
import { getExpertisePosts } from "../../../redux/actionCreators/expertisePostActions";
import { wrapper } from "../../../redux/store";
const ExpertDashboardHomePage = () => {
    return (
        <Layout title="Home | Expert Dashboard | SlicedAdvice">
            <Dashboard dashboardType="Expert">
                <HomeExpertDashboard />
            </Dashboard>
        </Layout>
    );
};


// NOTE: Not sure what context was for but my new implementation below does not use it.
// export async function getServerSideProps<GetServerSideProps>(context: any) {
//     const session = await getSession({ req: context.req });

//     if (!session) {
//         return {
//             redirect: {
//                 destination: `/login?returnUrl=/dashboard/expert/home&returnContext=expert%20dashboard%20home%20page`,
//                 permanent: false,
//             },
//         };
//     }

//     return {
//         props: { session },
//     };
// }
export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        const session: any = await getSession({ req });

        if (!session) {
            return {
                redirect: {
                    destination: `/login?returnUrl=/dashboard/expert/home&returnContext=expert%20dashboard%20home%20page`,
                    permanent: false,
                },
            };
        }
        try {
            await store.dispatch(loadUser(req, session.user._id));
            await store.dispatch(getExpertisePosts(req, undefined, undefined, session.user._id));
            await store.dispatch(getBookings(req, 1, undefined, undefined, session.user._id));
            return { props: { session } };
        } catch (e) {
            return { props: { session } };
        }
    });
export default ExpertDashboardHomePage;
