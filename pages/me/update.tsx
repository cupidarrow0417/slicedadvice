import { GetServerSideProps } from "next"
import { getSession } from 'next-auth/react'

const UpdateProfilePage = () => {
  return (
    <div>User Profile</div>
  )
}

export async function getServerSideProps<GetServerSideProps>(context: any) {
    const session = await getSession({ req: context.req })

    if (!session) {
        return {
            redirect: {
                destination: `/login?returnUrl=/me/update&returnContext=profile%20update%20page`,
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }

}



export default UpdateProfilePage

