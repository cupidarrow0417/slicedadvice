import { GetServerSideProps } from "next";
import Business from "../../components/categories/Business";
import Layout from "../../components/layout/Layout";
import dbConnect from "../../config/dbConnect";
import ExpertisePost from "../../models/expertisePost";

export default function BusinessPage({ businessExpertisePosts }: any) {
    return (
        <Layout
            title="Grow your business career or your own business with guidance from accomplished business experts | SlicedAdvice"
        >
            <Business 
                businessExpertisePosts={businessExpertisePosts}
            />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    dbConnect();
    // Load 20 expertise posts from database
    const businessExpertisePosts = await ExpertisePost.find({
        category: "Business",
    }).lean();

    return {
        props: {
            businessExpertisePosts: JSON.parse(
                JSON.stringify(businessExpertisePosts)
            ),
        },
    };
};
