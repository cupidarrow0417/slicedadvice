import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Settings from "../../components/user/Settings";
import Layout from "../../components/layout/Layout";
import { loadUser } from "../../redux/actionCreators/userActions";
import { wrapper } from "../../redux/store";
const UserSettingsPage = () => {
    return (
        <Layout title="Account Settings | SlicedAdvice">
            <Settings />
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        try {
            const session: any = await getSession({ req });

            if (!session) {
                return {
                    redirect: {
                        destination: `/login?returnUrl=/me/settings&returnContext=user%20settings%20page`,
                        permanent: false,
                    },
                };
            }

            await store.dispatch(loadUser(req, session.user._id));
            return { props: {} };
        } catch (e) {
            return { props: {} };
        }
    });

export default UserSettingsPage;
