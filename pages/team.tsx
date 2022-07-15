import { GetServerSideProps } from "next";
import Team from "../components/Team";
import Layout from "../components/layout/Layout";

export default function TeamPage() {
    return (
        <Layout title="Meet the Team | SlicedAdvice">
            <Team />
        </Layout>
    );
}

// export const getServerSideProps: GetServerSideProps =
//     wrapper.getServerSideProps((store) => async ({ req }) => {
//         try {
//             await store.dispatch(
//                 getExpertisePosts(req, 1, "Career Growth")
//             )
//             await store.dispatch(
//                 getExpertisePosts(req, 1, "College Application")
//             )
//             await store.dispatch(
//                 getExpertisePosts(req, 1, "Personal Development")
//             )
//             return { props: {} };
//         } catch (e) {
//             return { props: {} };
//         }
//     });