import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import DashboardHeader from "../../DashboardHeader";
import axios from "axios";
import ButtonLoader from "../../../layout/ButtonLoader";
import Loader from "../../../layout/Loader";
import { CashIcon } from "@heroicons/react/outline";

// No need to check Stripe status, since they'll never even get here unless they're good to go!
// It's coded into the Expert Dashboard, and also the getServerSideProps.
const PaymentsAdviceSeekerDashboard = () => {
    // const [loadingStripeLoginLink, setLoadingStripeLoginLink] = useState(false);

    // // On Click, Make a POST request with axios to the /api/stripe/expertLoginLink endpoint, which will return a link to the Stripe dashboard.
    // // Then, redirect the user to that link.
    // const handleContinueToStripeClick = async () => {
    //     setLoadingStripeLoginLink(true);
    //     const { data } = await axios.post("/api/stripe/expertLoginLink");
    //     setLoadingStripeLoginLink(false);
    //     window.location.href = data.loginLink.url;
    // };
    return (
        <>
            {/* Page title & actions */}
            <section className="bg-white py-4 flex items-center justify-between rounded-t-xl lg:rounded-tl-none border-b-[1px] border-black/10">
                <DashboardHeader
                    dashboardType="Advice Seeker"
                    dashboardPage="Payments"
                />
            </section>
            {/* Page content */}
            <div className="flex justify-center items-center rounded-xl bg-white w-full p-9">
                <div className="flex flex-col gap-5 justify-center items-center max-w-md">
                    <CashIcon className=" w-16 h-16 text-brand-primary-light" />
                    <h1 className="text-3xl text-center -mt-4">
                        Continue to Stripe to manage your payments
                    </h1>
                    <p className="text-sm opacity-60 text-center ">
                        SlicedAdvice partners with Stripe process your payments securely.
                    </p>
                    <button
                        // onClick={handleContinueToStripeClick}
                        className="bg-brand-primary-light rounded-lg text-white w-full py-3 text-lg flex justify-center items-center"
                        // disabled={loadingStripeLoginLink}
                    >
                        {/* {loadingStripeLoginLink ? (
                            <ButtonLoader />
                        ) : (
                            "Continue to Stripe"
                        )} */}
                    </button>
                    <p className="text-xs opacity-60 text-center ">
                        You'll be redirected to Stripe to manage your payments.
                    </p>
                </div>
            </div>
        </>
    );
};

export default PaymentsAdviceSeekerDashboard;
