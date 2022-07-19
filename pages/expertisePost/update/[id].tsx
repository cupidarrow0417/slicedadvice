import { GetServerSideProps } from 'next'
import { wrapper } from '../../../redux/store'

import Layout from '../../../components/layout/Layout'
import UpdateExpertisePost from '../../../components/expertisePost/UpdateExpertiesPost'
import { getSession } from 'next-auth/react'
import checkStripeField from '../../../utils/checkStripeField'
import { getExpertisePostDetails } from '../../../redux/actionCreators/expertisePostActions'
import { getReviews } from '../../../redux/actionCreators/reviewActionCreator'


export default function ExpertisePostCreationPage() {
    return (
        <Layout title="Update Expertise Post | SlicedAdvice">
            <UpdateExpertisePost />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }) => {
    try {
        await store.dispatch(getExpertisePostDetails(req, params?.id))
        await store.dispatch(getReviews(req, params?.id))
        return { props: {} }
    } catch (e) {
        return { props: {} }
    }
})

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