import { GetServerSideProps } from "next";

import { getExpertisePostDetails } from "../../redux/actionCreators/expertisePostActions";
import { wrapper } from "../../redux/store";

import Layout from "../../components/layout/Layout";
import ExpertisePostDetails from "../../components/expertisePost/ExpertisePostDetails";
import { getReviews } from "../../redux/actionCreators/reviewActionCreator";
import { loadUser } from "../../redux/actionCreators/userActions";
import { getSession } from "next-auth/react";
import dbConnect from "../../config/dbConnect";
import User from "../../models/user";
import Review from "../../models/review";
import ExpertisePost from "../../models/expertisePost";

export default function ExpertisePostDetailsPage({
    expertisePost,
    reviews,
    user,
}: any) {
    return (
        <Layout>
            <ExpertisePostDetails 
                expertisePost={expertisePost}
                reviews={reviews}
                user={user}
            />
        </Layout>
    );
}

// export const getServerSideProps: GetServerSideProps =
//     wrapper.getServerSideProps((store) => async ({ req, params }) => {
//         try {
//             const session: any = await getSession({ req });
//             if (session) {
//                 await store.dispatch(loadUser(req, session.user._id));
//             }

//             await store.dispatch(getExpertisePostDetails(req, params?.id));
//             await store.dispatch(getReviews(req, params?.id));
//             return { props: {} };
//         } catch (e) {
//             return { props: {} };
//         }
//     });
export const getServerSideProps: GetServerSideProps = async (context) => {
    dbConnect();
    const session: any = await getSession({ req: context.req });

    let user;
    if (session) {
        user = await User.findById(session.user._id).lean();
    }
    const expertisePost = await ExpertisePost.findById(
        context?.params?.id
    ).lean();
    const reviews = await Review.find({
        expertisePost: context?.params?.id,
    });

    if (user) {
        return {
            props: {
                user: JSON.parse(JSON.stringify(user)),
                expertisePost: JSON.parse(JSON.stringify(expertisePost)),
                reviews: JSON.parse(JSON.stringify(reviews)),
            },
        };
    } else {
        return {
            props: {
                user: null,
                expertisePost: JSON.parse(JSON.stringify(expertisePost)),
                reviews: JSON.parse(JSON.stringify(reviews)),
            },
        };
    }
};
