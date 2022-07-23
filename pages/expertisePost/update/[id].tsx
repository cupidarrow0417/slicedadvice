import { GetServerSideProps } from 'next'
import { wrapper } from '../../../redux/store'

import Layout from '../../../components/layout/Layout'
import UpdateExpertisePost from '../../../components/expertisePost/UpdateExpertisePost'
import { getSession } from 'next-auth/react'
import checkStripeField from '../../../utils/checkStripeField'
import { getExpertisePostDetails } from '../../../redux/actionCreators/expertisePostActions'
import { getReviews } from '../../../redux/actionCreators/reviewActionCreator'
import { loadUser } from '../../../redux/actionCreators/userActions'


export default function ExpertisePostCreationPage() {
    return (
        <Layout title="Update Expertise Post | SlicedAdvice">
            <UpdateExpertisePost />
        </Layout>
    )
}


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }) => {
    try {
        const session: any = await getSession({ req })

        if (!session) {
            return {
                redirect: {
                    destination: `/login?returnUrl=/expertisePost/create&returnContext=expertise%20post%20creation%20page`,
                    permanent: false
                }
            }
        }

        const isOnboarded = await checkStripeField(session.user._id, "charges_enabled", undefined)

        if (!isOnboarded) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false
                }
            }
        }

        await store.dispatch(getExpertisePostDetails(req, params?.id))
        await store.dispatch(loadUser(req, session.user._id));
        return { props: { session } }
    } catch (e) {
        return { props: {} }
    }
})


// --- JUST FOR REFERENCE ---
// export async function getServerSideProps<GetServerSideProps>(context: any) {
//     const session: any = await getSession({ req: context.req })
//     if (!session) {
//         return {
//             redirect: {
//                 destination: `/login?returnUrl=/expertisePost/create&returnContext=expertise%20post%20creation%20page`,
//                 permanent: false
//             }
//         }
//     }

//     const isOnboarded = await checkStripeField(session.user.email, "charges_enabled", undefined)

//     if (!isOnboarded) {
//         return {
//             redirect: {
//                 destination: "/",
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: { session }
//     }
// }

