import { GetServerSideProps } from "next";
import Categories from "../../components/categories/Categories";
import Layout from "../../components/layout/Layout";
import { getExpertisePosts } from "../../redux/actions/expertisePostActions";
import { wrapper } from "../../redux/store";

export default function Index() {
    return (
        <Layout
            title="Browse our categories for advice ranging from career growth
    to personal development | SlicedAdvice"
        >
            <Categories />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        try {
            await store.dispatch(
                getExpertisePosts(req, 1, "Career Growth")
            )
            await store.dispatch(
                getExpertisePosts(req, 1, "College Application")
            )
            await store.dispatch(
                getExpertisePosts(req, 1, "Personal Development")
            )
            return { props: { } };
        } catch (e) {
            return { props: {} };
        }
    });
