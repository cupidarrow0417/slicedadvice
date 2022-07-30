import { GetServerSideProps } from "next";
import Categories from "../../components/categories/Categories";
import Layout from "../../components/layout/Layout";
import { getExpertisePosts } from "../../redux/actionCreators/expertisePostActions";
import { wrapper } from "../../redux/store";
import ExpertisePost from "../../models/expertisePost";
import dbConnect from "../../config/dbConnect";

export default function Index({
    careerGrowthExpertisePosts,
    collegeApplicationExpertisePosts,
    personalDevelopmentExpertisePosts,
}: any) {
    return (
        <Layout
            title="Browse our categories for advice ranging from career growth
    to personal development | SlicedAdvice"
        >
            <Categories 
                careerGrowthExpertisePosts={careerGrowthExpertisePosts}
                collegeApplicationExpertisePosts={collegeApplicationExpertisePosts}
                personalDevelopmentExpertisePosts={personalDevelopmentExpertisePosts}
            />
        </Layout>
    );
}

// export const getServerSideProps: GetServerSideProps =
//     wrapper.getServerSideProps((store) => async ({ req }) => {
//         try {
//             await store.dispatch(
//                 getExpertisePosts(req, 1, "Career Growth")
//             )
//             await store.dispatch(
//                 getExpertisePosts(req, 1, "College Application")
//             )
//             await store.dispatch(
//                 getExpertisePosts(req, 1, "Personal Development")
//             )
//             return { props: { } };
//         } catch (e) {
//             return { props: {} };
//         }
//     });
export const getServerSideProps: GetServerSideProps = async (context) => {
    dbConnect();
    // Load 20 expertise posts from database
    const careerGrowthExpertisePosts = await ExpertisePost.find({
        category: "Career Growth",
    }).limit(20);
    const collegeApplicationExpertisePosts = await ExpertisePost.find({
        category: "College Application",
    }).limit(20);
    const personalDevelopmentExpertisePosts = await ExpertisePost.find({
        category: "Personal Development",
    }).limit(20);

    return {
        props: {
            careerGrowthExpertisePosts: JSON.parse(JSON.stringify(careerGrowthExpertisePosts)),
            collegeApplicationExpertisePosts: JSON.parse(JSON.stringify(collegeApplicationExpertisePosts)),
            personalDevelopmentExpertisePosts: JSON.parse(JSON.stringify(personalDevelopmentExpertisePosts)),
        },
    };
};
