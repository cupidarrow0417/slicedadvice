import { GetServerSideProps } from "next";
import Categories from "../../components/categories/Categories";
import Layout from "../../components/layout/Layout";
import ExpertisePost from "../../models/expertisePost";
import dbConnect from "../../config/dbConnect";

export default function Index({
    engineeringExpertisePosts,
    businessExpertisePosts,
    healthcareExpertisePosts,
}: any) {
    return (
        <Layout
            title="Browse our categories for career advice, including engineering, business, healthcare, and more | SlicedAdvice"
        >
            <Categories 
                engineeringExpertisePosts={engineeringExpertisePosts}
                businessExpertisePosts={businessExpertisePosts}
                healthcareExpertisePosts={healthcareExpertisePosts}
            />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    dbConnect();
    // Load 20 expertise posts from database
    const engineeringExpertisePosts = await ExpertisePost.find({
        category: "Engineering",
    }).limit(20);
    const businessExpertisePosts = await ExpertisePost.find({
        category: "Business",
    }).limit(20);
    const healthcareExpertisePosts = await ExpertisePost.find({
        category: "Healthcare",
    }).limit(20);

    return {
        props: {
            engineeringExpertisePosts: JSON.parse(JSON.stringify(engineeringExpertisePosts)),
            businessExpertisePosts: JSON.parse(JSON.stringify(businessExpertisePosts)),
            healthcareExpertisePosts: JSON.parse(JSON.stringify(healthcareExpertisePosts)),
        },
    };
};
