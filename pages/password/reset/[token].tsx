import { GetServerSideProps } from 'next'

import { resetPassword } from '../../../redux/actions/userActions'
import { wrapper } from '../../../redux/store'

import Layout from '../../../components/layout/Layout'
import ResetPassword from '../../../components/user/ResetPassword'



export default function ResetPasswordPage() {
  return (
    <Layout title="Reset Password | SlicedAdvice">
        <ResetPassword />
    </Layout>
  )
}