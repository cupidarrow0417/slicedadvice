import { GetServerSideProps } from "next";
import CollegeApplication from "../../components/categories/CollegeApplication";
import Layout from "../../components/layout/Layout";
import { getExpertisePosts } from "../../redux/actionCreators/expertisePostActions";
import { wrapper } from "../../redux/store";

export default function CollegeApplicationPage() {
    return (
        <Layout
            title="Get guidance on your application from experienced applicants | SlicedAdvice"
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
