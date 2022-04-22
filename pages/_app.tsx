import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Elements stripe={stripePromise}>
            <Component {...pageProps} />
        </Elements>
    );
}

export default wrapper.withRedux(MyApp);
