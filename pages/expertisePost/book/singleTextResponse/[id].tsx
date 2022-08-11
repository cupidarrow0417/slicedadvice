import { GetServerSideProps } from "next";

import { getExpertisePostDetails } from "../../../../redux/actionCreators/expertisePostActions";
import { wrapper } from "../../../../redux/store";

import Layout from "../../../../components/layout/Layout";
import BookSingleTextResponse from "../../../../components/expertisePost/book/BookSingleTextResponse";
import { getSession } from "next-auth/react";
import { loadUser } from "../../../../redux/actionCreators/userActions";
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function BookSingleTextResponsePage() {
    return (
        <Elements stripe={stripePromise} >
            <Layout>
                <BookSingleTextResponse />
            </Layout>
        </Elements>
    );
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req, params }) => {
        try {
            const session: any = await getSession({ req });

            if (!session) {
                return {
                    redirect: {
                        destination: `/login?returnUrl=/expertisePost/book/singleTextResponse/${params?.id}&returnContext=booking%20page`,
                        permanent: false,
                    },
                };
            }

            await store.dispatch(getExpertisePostDetails(req, params?.id));
            await store.dispatch(loadUser(req, session.user._id));
            return { props: {} };
        } catch (e) {
            return { props: {} };
        }
    });
