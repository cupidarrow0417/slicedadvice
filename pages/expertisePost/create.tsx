import { GetServerSideProps } from 'next'
import { wrapper } from '../../redux/store'

import Layout from '../../components/layout/Layout'
import CreateExpertisePost from '../../components/expertisePost/CreateExpertisePost'
import { getSession } from 'next-auth/react'
import checkStripeField from '../../utils/checkStripeField'


export default function ExpertisePostCreationPage() {
  return (
    <Layout title="Create Expertise Post | SlicedAdvice">
        <CreateExpertisePost />
    </Layout>
  )
}

export async function getServerSideProps<GetServerSideProps>(context: any) {
    const session: any = await getSession({ req: context.req })

    if (!session) {
        return {
            redirect: {
                destination: `/login?returnUrl=/expertisePost/create&returnContext=expertise%20post%20creation%20page`,
                permanent: false
            }
        }
    }

    // const isOnboarded = await checkStripeField(session.user.email, "charges_enabled", undefined)

    // if (!isOnboarded) {
    //     return {
    //         redirect: {
    //             destination: "/",
    //             permanent: false
    //         }
    //     }
    // }

    return {
        props: { session }
    }

}