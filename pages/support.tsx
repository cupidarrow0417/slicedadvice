import { GetServerSideProps } from "next";
import Support from "../components/Support";
import Layout from "../components/layout/Layout";

export default function SupportPage() {
    return (
        <Layout title="Support | SlicedAdvice">
            <Support />
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