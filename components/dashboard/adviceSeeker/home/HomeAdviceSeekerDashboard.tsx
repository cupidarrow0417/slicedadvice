import { ChevronDownIcon } from "@heroicons/react/solid";
import { CashIcon } from "@heroicons/react/outline";
import React from "react";
import { useAppSelector } from "../../../../redux/hooks";
import ButtonLoader from "../../../layout/ButtonLoader";
import Loader from "../../../layout/Loader";
import { useRouter } from "next/router";
import DashboardHeader from "../../DashboardHeader";
import { useSession } from "next-auth/react";

const HomeAdviceSeekerDashboard = () => {
    // Get Session via useSession hook
    const { data: session }: any = useSession();

    return (!session) ? (
        <div className="flex flex-col">
            <div className="bg-white px-4 py-4 flex items-center justify-between sm:px-6 rounded-t-xl lg:rounded-tl-none lg:px-8 border-b-[1px] border-black/10">
                <Loader />
            </div>
        </div>
    ) : (
        <div className="flex flex-col gap-4">
            {/* Page title & actions */}
            <div className="bg-white pt-6 pb-4 flex items-center justify-between rounded-t-xl lg:rounded-tl-none border-black/10 border-b-[1px]">
                <DashboardHeader dashboardType="Advice Seeker" dashboardPage="Home" />
                <div className="">
                        {/* <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary-light hover:bg-brand-primary-light/90"
                            disabled={authLoading ? true : false}
                            // onClick={() => router.push('/expertisePost/create')}
                        >
                            {authLoading ? <ButtonLoader /> : ""}
                        </button> */}
                </div>
            </div>
            <div className="flex items-center justify-center sm:p-4 border-black/10">
                Welcome to the home page of the advice seeker dashboard!
            </div>
        </div>
    );
};

export default HomeAdviceSeekerDashboard;