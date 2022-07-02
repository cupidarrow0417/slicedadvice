import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import dbConnect from "../../config/dbConnect";
import { useAppSelector } from "../../redux/hooks";
import Dropdown from "../atoms/Dropdown";

interface DashboardHeaderProps {
    dashboardType: "Advice Seeker" | "Expert";
    dashboardPage: string;
}

// LEFT OFF FIXING THE DASHBOARD DROPDOWN FOR ADVICE SEEKER DASHBOARD.
// CURRENTLY NOT WORKING, THERE IS STILL THE POSTS PAGE.
let expertNavigationDropdownContents = [
    {
        title: "Home",
        href: "/dashboard/expert/home",
    },
    {
        title: "Posts",
        href: "/dashboard/expert/posts",
    },
    {
        title: "Bookings",
        href: "/dashboard/expert/bookings",
    },
    {
        title: "Payments",
        href: "/dashboard/expert/payments",
    },
];

let adviceSeekerNavigationDropdownContents = [
    {
        title: "Home",
        href: "/dashboard/adviceSeeker/home",
    },
    {
        title: "Bookings",
        href: "/dashboard/adviceSeeker/bookings",
    },
    {
        title: "Payments",
        href: "/dashboard/adviceSeeker/payments",
    },
];

const DashboardHeader = ({
    dashboardType,
    dashboardPage,
}: DashboardHeaderProps) => {
    // Check the global state that has info on whether
    // the user has charges enabled on their Stripe.
    // This process is first dispatched above.
    const {
        accountField: chargesEnabled,
        loading: checkStripeAccountFieldLoading,
    } = useAppSelector((state) => {
        return state.checkStripeAccountField;
    });


    // Assign finalNavigationDropdownContents based on dashboardType, 
    // and the chargesEnabled prop (for experts only)
    let finalNavigationDropdownContents = expertNavigationDropdownContents;
    useEffect(() => {
        if (chargesEnabled !== null || chargesEnabled !== undefined) {
            if (chargesEnabled === false) {
                // Once the chargesEnabled state is loaded, check if it is false.
                // If it is, then the user has not enabled charges on their Stripe account.
                // Don't render the Posts and Bookings links in the navigation dropdown.
                finalNavigationDropdownContents = [
                    {
                        title: "Home",
                        href: "/dashboard/expert/home",
                    },
                    {
                        title: "Payments",
                        href: "/dashboard/expert/payments",
                    },
                ];
            }
        }
    }, [chargesEnabled]);

    // Assign nav contents for advice seeker. This one is simple since there isn't
    // any stripe stuff we need to check for advice seekers.
    if (dashboardType === "Advice Seeker") {
        finalNavigationDropdownContents = adviceSeekerNavigationDropdownContents;
    }
    return (
        <div className="flex gap-2 items-center sm:w-fit">
            <h1 className="tracking-tight text-2xl sm:text-3xl font-semibold leading-6 text-gray-900">
                <span className="text-brand-primary font-bold">
                    {dashboardType}
                </span>
                {" " + dashboardPage}
            </h1>
            <Dropdown
                label="Dashboard Navigation Dropdown"
                contents={finalNavigationDropdownContents}
            >
                <ChevronDownIcon
                    className="h-8 w-8 group-hover:text-white "
                    aria-hidden="true"
                />
            </Dropdown>
        </div>
    );
};

export default DashboardHeader;
