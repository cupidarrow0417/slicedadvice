import { GetServerSideProps } from "next";
import Home from "../components/Home";
import Layout from "../components/layout/Layout";
import dbConnect from "../config/dbConnect";
import ExpertisePost from "../models/expertisePost";

import { loadStripe } from "@stripe/stripe-js";

export default function Index({
    engineeringExpertisePosts,
    businessExpertisePosts,
    healthcareExpertisePosts,
}: any) {

    const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

    return (
        <Layout>
            <Home
                engineeringExpertisePosts={engineeringExpertisePosts}
                businessExpertisePosts={
                    businessExpertisePosts
                }
                healthcareExpertisePosts={
                    healthcareExpertisePosts
                }
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
