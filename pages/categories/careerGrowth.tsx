import { GetServerSideProps } from "next";
import CareerGrowth from "../../components/categories/CareerGrowth";
import Layout from "../../components/layout/Layout";
import { getExpertisePosts } from "../../redux/actions/expertisePostActions";
import { wrapper } from "../../redux/store";

export default function CareerGrowthPage() {
    return (
        <Layout
            title="Browse our categories for advice ranging from career growth
    to personal development | SlicedAdvice"
        >
            <CareerGrowth />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        try {
            await store.dispatch(
                getExpertisePosts(req, 1, "Career Growth")
            )
            return { props: { } };
        } catch (e) {
            return { props: {} };
        }
    });
