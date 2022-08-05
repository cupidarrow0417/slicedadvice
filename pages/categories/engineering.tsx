import { GetServerSideProps } from "next";
import Engineering from "../../components/categories/Engineering";
import Layout from "../../components/layout/Layout";
import dbConnect from "../../config/dbConnect";
import ExpertisePost from "../../models/expertisePost";

export default function EngineeringPage({ engineeringExpertisePosts }: any) {
    return (
        <Layout title="Build your dream engineering career with advice from experienced engineers. | SlicedAdvice">
            <Engineering
                engineeringExpertisePosts={engineeringExpertisePosts}
            />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    dbConnect();
    // Load 20 expertise posts from database
    const engineeringExpertisePosts = await ExpertisePost.find({
        category: "Engineering",
    }).lean();

    return {
        props: {
            engineeringExpertisePosts: JSON.parse(
                JSON.stringify(engineeringExpertisePosts)
            ),
        },
    };
};
