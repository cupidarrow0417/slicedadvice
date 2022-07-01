import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Dashboard from "../../../components/dashboard/Dashboard";
import HomeAdviceSeekerDashboard from "../../../components/dashboard/adviceSeeker/home/HomeAdviceSeekerDashboard";
import Layout from "../../../components/layout/Layout";
import { getBookings } from "../../../redux/actionCreators/bookingActionCreators";
import { wrapper } from "../../../redux/store";
const AdviceSeekerDashboardHomePage = () => {
    return (
        <Layout title="Home | Advice Seeker Dashboard | SlicedAdvice">
            <Dashboard dashboardType="Advice Seeker">
                <HomeAdviceSeekerDashboard />
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
        const session = await getSession({ req });

        if (!session) {
            return {
                redirect: {
                    destination: `/login?returnUrl=/dashboard/adviceSeeker/home&returnContext=advice%20seeker%20dashboard%20home%20page`,
                    permanent: false,
                },
            };
        }
        try {
            // await store.dispatch(getBookings(req));
            return { props: { session } };
        } catch (e) {
            return { props: { session } };
        }
    });
export default AdviceSeekerDashboardHomePage;
