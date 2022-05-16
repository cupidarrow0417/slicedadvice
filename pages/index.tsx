import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { GetServerSideProps } from "next";
import Home from "../components/Home";
import Layout from "../components/layout/Layout";
import { getExpertisePosts } from "../redux/actions/expertisePostActions";
import { wrapper } from "../redux/store";

export default function Index() {
    return (
        <Layout>
            <Home />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        try {
            store.dispatch(getExpertisePosts(req));
            return { props: {} };
        } catch (e) {
            return { props: {} };
        }
    });
