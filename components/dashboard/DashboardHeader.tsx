import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import dbConnect from "../../config/dbConnect";
import { useAppSelector } from "../../redux/hooks";
import Dropdown from "../atoms/Dropdown";

interface DashboardHeaderProps {
    dashboardType: string;
    dashboardPage: string;
}

let navigationDropdownContents = [
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

    // Once the chargesEnabled state is loaded, check if it is false.
    // If it is, then the user has not enabled charges on their Stripe account.
    // Don't render the Posts and Bookings links in the navigation dropdown.
    useEffect(() => {
        if (chargesEnabled !== null || chargesEnabled !== undefined) {
            if (chargesEnabled === false) {
                navigationDropdownContents = [
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
    return (
        <div className="flex gap-2 items-center w-min sm:w-fit">
            <h1 className="text-2xl sm:text-3xl font-semibold leading-6 text-gray-900">
                <span className="text-brand-primary font-bold">
                    {dashboardType}
                </span>
                {" " + dashboardPage}
            </h1>
            <Dropdown
                label="Dashboard Navigation Dropdown"
                contents={navigationDropdownContents}
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
