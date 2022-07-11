import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { GetServerSideProps } from "next";
import Experts from "../components/Experts";
import Home from "../components/Home";
import Layout from "../components/layout/Layout";
import { getExpertisePosts } from "../redux/actionCreators/expertisePostActions";
import { wrapper } from "../redux/store";

export default function ForExpertsPage() {
    return (
        <Layout title="For Experts | SlicedAdvice">
            <Experts />
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