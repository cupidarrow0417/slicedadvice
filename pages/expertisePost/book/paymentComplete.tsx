import { GetServerSideProps } from 'next'
import { wrapper } from '../../../redux/store'

import Layout from '../../../components/layout/Layout'
import { getSession } from 'next-auth/react'
import PaymentComplete from '../../../components/expertisePost/book/PaymentComplete'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);


export default function PaymentCompletePage() {
    return (
        <Elements stripe={stripePromise} >
            <Layout title="Payment Complete | SlicedAdvice">
                <PaymentComplete />
            </Layout>
        </Elements>
    )
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req, params }) => {
        try {
            const session: any = await getSession({ req });

            if (!session) {
                return {
                    redirect: {
                        destination: `/`,
                        permanent: false,
                    },
                };
            }

            // await store.dispatch(getExpertisePostDetails(req, params?.id));
            return { props: {} };
        } catch (e) {
            return { props: {} };
        }
    });