import { GetServerSideProps } from "next";
import { wrapper } from "../../redux/store";

import Layout from "../../components/layout/Layout";
import CreateExpertisePost from "../../components/expertisePost/CreateExpertisePost";
import { getSession } from "next-auth/react";
import checkStripeField from "../../utils/checkStripeField";
import { loadUser } from "../../redux/actionCreators/userActions";

export default function ExpertisePostCreationPage() {
    return (
        <Layout title="Create Expertise Post | SlicedAdvice">
            <CreateExpertisePost />
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        const session: any = await getSession({ req });

        if (!session) {
            return {
                redirect: {
                    destination: `/login?returnUrl=/expertisePost/create&returnContext=expertise%20post%20creation%20page`,
                    permanent: false,
                },
            };
        }

        const isOnboarded = await checkStripeField(
            session.user._id,
            "charges_enabled",
            undefined
        );

        if (!isOnboarded) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }

        await store.dispatch(loadUser(req, session.user._id));
        return {
            props: { session },
        };
    });
