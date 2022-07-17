import { ChevronDownIcon } from "@heroicons/react/solid";
import { CashIcon } from "@heroicons/react/outline";
import React from "react";
import { useAppSelector } from "../../../../redux/hooks";
import ButtonLoader from "../../../layout/ButtonLoader";
import SetupPayoutsAlert from "../SetupPayoutsAlert";
import Loader from "../../../layout/Loader";
import { useRouter } from "next/router";
import DashboardHeader from "../../DashboardHeader";
import { useSession } from "next-auth/react";
import Link from "next/link";

const HomeExpertDashboard = () => {
    // Get Session via useSession hook
    const { data: session }: any = useSession();
    console.log("session", session);
    const router = useRouter();
    const {
        accountField: chargesEnabled,
        loading: checkStripeAccountFieldLoading,
    } = useAppSelector((state) => {
        return state.checkStripeAccountField;
    });

    return !session ? (
        <div className="flex flex-col">
            <div className="bg-white px-4 py-4 flex items-center justify-between sm:px-6 rounded-t-xl lg:rounded-tl-none lg:px-8 border-b-[1px] border-black/10">
                <Loader />
            </div>
        </div>
    ) : (
        <div className="flex flex-col">
            {/* Page title & actions */}
            <div className="bg-white px-4 pt-6 pb-4 flex items-center justify-between sm:px-6 rounded-t-xl lg:rounded-tl-none border-b-[1px] lg:px-8 border-black/10">
                <DashboardHeader dashboardType="Expert" dashboardPage="Home" />
                <div className="">
                    {!chargesEnabled || !session ? (
                        ""
                    ) : (
                        <Link href="/expertisePost/create">
                            <a className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary-light hover:bg-brand-primary-light/90">
                                New Post
                            </a>
                        </Link>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-center sm:p-4 ">
                {!chargesEnabled ? (
                    <SetupPayoutsAlert />
                ) : (
                    <div className="flex justify-center items-center rounded-xl bg-white w-full p-9">
                        <h1>{`Charges have been enabled! Woohoo! Click the "New Post" button to create your first expertise posting. `}</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeExpertDashboard;
