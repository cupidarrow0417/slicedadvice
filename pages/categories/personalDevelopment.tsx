import { GetServerSideProps } from "next";
import PersonalDevelopment from "../../components/categories/PersonalDevelopment";
import Layout from "../../components/layout/Layout";
import { getExpertisePosts } from "../../redux/actions/expertisePostActions";
import { wrapper } from "../../redux/store";

export default function PersonalDevelopmentPage() {
    return (
        <Layout
            title="Cultivate your ideal life with personal development experts | SlicedAdvice"
        >
            <PersonalDevelopment />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        try {
            await store.dispatch(
                getExpertisePosts(req, 1, "Personal Development")
            )
            return { props: { } };
        } catch (e) {
            return { props: {} };
        }
    });
