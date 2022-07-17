import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Crisp from "../components/atoms/Crisp";
import { SessionProvider } from "next-auth/react";
import MicrosoftClarity from "../components/atoms/MicrosoftClarity";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Where everything starts! 
// Notes: SessionProvider is used to provide the login session to the entire app (NextAuth stuff)
//       PersistGate is used to persist specific parts of the redux store even on page refresh.
//       Elements is used to render the Stripe elements.
//       Crisp is used to render the Crisp chat widget.
//       The rest of the app is rendered in the Component prop.
//       The weird isBrowser check has to do with a strange fix i did with redux persist. Not too 
//       familiar, to be honest. In general, just add anything new to both conditionals.
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const store: any = useStore();
    const isBrowser = typeof window !== "undefined";
    return isBrowser ? (
        <SessionProvider session={session}>
            <PersistGate loading={null} persistor={store.__persistor}>
                <Elements stripe={stripePromise}>
                    <MicrosoftClarity />
                    <Crisp />
                    <Component {...pageProps} />
                </Elements>
            </PersistGate>
        </SessionProvider>
    ) : (
        <SessionProvider session={session}>
            <PersistGate persistor={store}>
                <Elements stripe={stripePromise}>
                    <MicrosoftClarity />
                    <Crisp />
                    <Component {...pageProps} />
                </Elements>
            </PersistGate>
        </SessionProvider>
    );
}

export default wrapper.withRedux(MyApp);
