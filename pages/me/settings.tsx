import { GetServerSideProps } from "next"
import { getSession } from 'next-auth/react'
import Settings from "../../components/user/Settings"
import Layout from "../../components/layout/Layout"
const UserSettingsPage = () => {
  return (
    <Layout>
        <Settings />
    </Layout>
  )
}

export async function getServerSideProps<GetServerSideProps>(context: any) {
    const session = await getSession({ req: context.req })

    if (!session) {
        return {
            redirect: {
                destination: `/login?returnUrl=/me/settings&returnContext=user%20settings%20page`,
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }

}



export default UserSettingsPage

