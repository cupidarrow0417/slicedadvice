import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";

// import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { SessionProvider } from "next-auth/react";
import MicrosoftClarity from "../components/atoms/MicrosoftClarity";
import { loadStripe } from "@stripe/stripe-js";
import Script from "next/script";
import HubSpot from "../components/atoms/HubSpot";
import Loader from "../components/layout/Loader";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

// const DynamicHeader = dynamic(() => import('@stripe/stripe-js').then((mod) => mod.loadStripe), {
//     ssr: false,
//     suspense: true
// });
// const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

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
                <MicrosoftClarity />
                <HubSpot />
                <Component {...pageProps} />
                <Script
                    src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
                    integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
                    crossOrigin="anonymous"
                ></Script>
            </PersistGate>
        </SessionProvider>
    ) : (
        <SessionProvider session={session}>
            <PersistGate persistor={store}>
                <MicrosoftClarity />
                <HubSpot />
                <Component {...pageProps} />
                <Script
                    src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
                    integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
                    crossOrigin="anonymous"
                    defer
                ></Script>
            </PersistGate>
        </SessionProvider>
    );
}

export default wrapper.withRedux(MyApp);

// --- Normal Code ---
// const store: any = useStore();
//     const isBrowser = typeof window !== "undefined";
//     return isBrowser ? (
//         <SessionProvider session={session}>
//             <PersistGate loading={null} persistor={store.__persistor}>
//                 <Elements stripe={stripePromise}>
//                     <MicrosoftClarity />
//                     <HubSpot />
//                     <Component {...pageProps} />
//                     <Script
//                         src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
//                         integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
//                         crossOrigin="anonymous"
//                     ></Script>
//                 </Elements>
//             </PersistGate>
//         </SessionProvider>
//     ) : (
//         <SessionProvider session={session}>
//             <PersistGate persistor={store}>
//                 <Elements stripe={stripePromise}>
//                     <MicrosoftClarity />
//                     <HubSpot />
//                     <Component {...pageProps} />
//                     <Script
//                         src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
//                         integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
//                         crossOrigin="anonymous"
//                     ></Script>
//                 </Elements>
//             </PersistGate>
//         </SessionProvider>
//     );

// --- New Code ---
// const store: any = useStore();
//     const isBrowser = typeof window !== "undefined";
//     return isBrowser ? (
//         <SessionProvider session={session}>
//             <PersistGate loading={null} persistor={store.__persistor}>
//                 <MicrosoftClarity />
//                 <HubSpot />
//                 <Component {...pageProps} />
//                 <Script
//                     src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
//                     integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
//                     crossOrigin="anonymous"
//                 ></Script>
//             </PersistGate>
//         </SessionProvider>
//     ) : (
//         <SessionProvider session={session}>
//             <PersistGate persistor={store}>
//                 <MicrosoftClarity />
//                 <HubSpot />
//                 <Component {...pageProps} />
//                 <Script
//                     src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
//                     integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
//                     crossOrigin="anonymous"
//                 ></Script>
//             </PersistGate>
//         </SessionProvider>
//     );