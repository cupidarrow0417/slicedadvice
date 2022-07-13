import { getSession } from "next-auth/react"
import EmailVerification from "../components/auth/EmailVerification"
import Layout from "../components/layout/Layout"



export default function RegisterPage() {
  return (
    <Layout title='Verify Email | SlicedAdvice'>
      <EmailVerification />
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