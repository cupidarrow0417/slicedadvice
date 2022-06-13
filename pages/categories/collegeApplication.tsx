import { GetServerSideProps } from "next";
import CollegeApplication from "../../components/categories/CollegeApplication";
import Layout from "../../components/layout/Layout";
import { getExpertisePosts } from "../../redux/actions/expertisePostActions";
import { wrapper } from "../../redux/store";

export default function CollegeApplicationPage() {
    return (
        <Layout
            title="Browse our categories for advice ranging from career growth
    to personal development | SlicedAdvice"
        >
            <CollegeApplication />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        try {
            await store.dispatch(
                getExpertisePosts(req, 1, "College Application")
            )
            return { props: { } };
        } catch (e) {
            return { props: {} };
        }
    });
