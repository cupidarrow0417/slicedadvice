import { GetServerSideProps } from "next";

import { getExpertisePostDetails } from "../../../../redux/actions/expertisePostActions";
import { wrapper } from "../../../../redux/store";

import Layout from "../../../../components/layout/Layout";
import BookSingleTextResponse from "../../../../components/expertisePost/book/BookSingleTextResponse";
import { getSession } from "next-auth/react";

export default function BookSingleTextResponsePage() {
    return (
        <Layout>
            <BookSingleTextResponse />
        </Layout>
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
            return { props: {} };
        } catch (e) {
            return { props: {} };
        }
    });
