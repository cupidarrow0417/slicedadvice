import { GetServerSideProps } from "next";
import Healthcare from "../../components/categories/Healthcare";
import Layout from "../../components/layout/Layout";
import dbConnect from "../../config/dbConnect";
import { wrapper } from "../../redux/store";
import ExpertisePost from "../../models/expertisePost";

export default function HealthcarePage({ healthcareExpertisePosts }: any) {
    return (
        <Layout title="Cultivate your ideal healthcare career with advice from experienced healthcare professionals | SlicedAdvice">
            <Healthcare 
                healthcareExpertisePosts={healthcareExpertisePosts}
            />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    dbConnect();
    // Load 20 expertise posts from database
    const healthcareExpertisePosts = await ExpertisePost.find({
        category: "Healthcare",
    }).lean();

    return {
        props: {
            healthcareExpertisePosts: JSON.parse(
                JSON.stringify(healthcareExpertisePosts)
            ),
        },
    };
};
