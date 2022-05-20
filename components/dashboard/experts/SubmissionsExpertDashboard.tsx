import { ChevronDownIcon } from "@heroicons/react/solid";
import React from "react";
import DashboardHeader from "../DashboardHeader";

const SubmissionsExpertDashboard = () => {
    return (
        <>
            {/* Page title & actions */}
            <div className="bg-white px-4 py-4 flex items-center justify-between sm:px-6 rounded-t-xl lg:rounded-tl-none lg:px-8 border-b-[1px] border-black/10">
                <DashboardHeader
                    dashboardType="Expert"
                    dashboardPage="Submissions"
                />

                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-xs md:text-sm font-medium rounded-md text-white bg-brand-primary-light hover:bg-brand-primary-light/90"
                >
                    New Post
                </button>
            </div>
        </>
    );
};

export default SubmissionsExpertDashboard;
