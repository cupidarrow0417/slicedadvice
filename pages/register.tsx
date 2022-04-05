import { getSession } from "next-auth/react"
import Register from "../components/auth/Register"
import Layout from "../components/layout/Layout"



export default function RegisterPage() {
  return (
    <Layout title='Register a new SlicedAdvice account'>
      <Register />
    </Layout>
  )
}

export async function getServerSideProps<GetServerSideProps>(context: any) {
  const session = await getSession({ req: context.req })

  if (session) {
      return {
          redirect: {
              destination: '/',
              permanent: false
          }
      }
  }

  return {
      props: { session }
  }
}