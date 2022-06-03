import { ChevronDownIcon } from "@heroicons/react/solid";
import React from "react";
import Dropdown from "../Dropdown";

interface DashboardHeaderProps {
    dashboardType: string;
    dashboardPage: string;
}

const navigationDropdownContents = [
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
