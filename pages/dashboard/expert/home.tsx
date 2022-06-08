import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import ExpertDashboard from "../../../components/dashboard/experts/ExpertDashboard";
import Layout from "../../../components/layout/Layout";
import { getBookings } from "../../../redux/actions/bookingActions";
import { wrapper } from "../../../redux/store";
const ExpertDashboardHomePage = () => {
    return (
        <Layout title="Home | Expert Dashboard | SlicedAdvice">
            <ExpertDashboard currentPage="Home" />
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
                    destination: `/login?returnUrl=/dashboard/expert/home&returnContext=expert%20dashboard%20home%20page`,
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
export default ExpertDashboardHomePage;
