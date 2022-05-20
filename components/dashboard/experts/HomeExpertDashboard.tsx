import { ChevronDownIcon } from "@heroicons/react/solid";
import { CashIcon } from "@heroicons/react/outline";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import ButtonLoader from "../../layout/ButtonLoader";
import SetupPayoutsAlert from "./SetupPayoutsAlert";
import Loader from "../../layout/Loader";
import { useRouter } from "next/router";
import DashboardHeader from "../DashboardHeader";

const HomeExpertDashboard = () => {
    const router = useRouter();
    const { user, loading: authLoading } = useAppSelector(
        (state) => state.auth
    );
    const {
        accountField: chargesEnabled,
        loading: checkStripeAccountFieldLoading,
    } = useAppSelector((state) => {
        return state.checkStripeAccountField;
    });

    return (authLoading) ? (
        <div className="flex flex-col">
            <div className="bg-white px-4 py-4 flex items-center justify-between sm:px-6 rounded-t-xl lg:rounded-tl-none lg:px-8 border-b-[1px] border-black/10">
                <Loader />
            </div>
        </div>
    ) : (
        <div className="flex flex-col">
            {/* Page title & actions */}
            <div className="bg-white px-4 py-4 flex items-center justify-between sm:px-6 rounded-t-xl lg:rounded-tl-none lg:px-8 border-b-[1px] border-black/10">
                <DashboardHeader dashboardType="Expert" dashboardPage="Home" />
                <div className="">
                    {/* <button
            type="button"
            className="order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
        >
            Share
        </button> */}
                    {!chargesEnabled ? (
                        ""
                    ) : (
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary-light hover:bg-brand-primary-light/90"
                            disabled={authLoading ? true : false}
                            onClick={() => router.push('/expertisePost/create')}
                        >
                            {authLoading ? <ButtonLoader /> : "New Post"}
                        </button>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-center sm:p-4 border-b-[1px] border-black/10">
                {!chargesEnabled ? (
                    <SetupPayoutsAlert />
                ) : (
                    <div className="flex justify-center items-center rounded-xl border-y-[1px] sm:border-x-[1px] border-black/10 bg-white w-full p-9">
                        <h1>{`Charges have been enabled! Woohoo! Click the "New Post" button to create your first expertise posting. `}</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeExpertDashboard;
