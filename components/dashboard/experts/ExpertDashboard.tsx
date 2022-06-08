import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
    ClockIcon,
    HomeIcon,
    InboxInIcon,
    ViewListIcon,
    CashIcon,
} from "@heroicons/react/outline";
import {
    ChevronDownIcon,
    ChevronRightIcon,
    DotsVerticalIcon,
    SearchIcon,
    SelectorIcon,
} from "@heroicons/react/solid";
import DashboardSidebar from "../DashboardSidebar";
import HomeExpertDashboard from "./HomeExpertDashboard";
import BookingsExpertDashboard from "./BookingsExpertDashboard";
import PaymentsExpertDashboard from "./PaymentsExpertDashboard";
import { useAppDispatch } from "../../../redux/hooks";
import { loadUser } from "../../../redux/actions/userActions";
import YourPostsExpertDashboard from "./PostsExpertDashboard";

const navigation = [
    { name: "Home", href: "/dashboard/expert/home", icon: HomeIcon, current: false },
    { name: "Posts", href: "/dashboard/expert/posts", icon: ViewListIcon, current: false},
    { name: "Bookings", href: "/dashboard/expert/bookings", icon: InboxInIcon, current: false },
    { name: "Payments", href: "/dashboard/expert/payments", icon: CashIcon, current: false },
];

interface ExpertDashboardInterface {
    currentPage: string;
}

export default function ExpertDashboard({
    currentPage,
}: ExpertDashboardInterface) {
    const dispatch = useAppDispatch();

    return (
        <>
            <div className="h-screen flex rounded-xl shadow-md">
                {/* Static sidebar for desktop */}
                <div className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r-0 lg:border-black/10 lg:border-[1px] lg:pt-5 lg:pb-4 lg:bg-white rounded-tl-xl rounded-bl-xl">
                    <div className="flex items-center flex-shrink-0 px-6"></div>
                    <DashboardSidebar navigation={navigation} />
                </div>
                {/* Main column */}
                <div className="flex flex-col w-full">
                    <main className="flex-1 border-[1px] rounded-xl lg:rounded-r-xl lg:rounded-l-none">
                        {currentPage === "Home" && <HomeExpertDashboard />}
                        {currentPage === "Posts" && <YourPostsExpertDashboard />}
                        {currentPage === "Bookings" && <BookingsExpertDashboard />}
                        {currentPage === "Payments" && <PaymentsExpertDashboard />}
                    </main>
                </div>
            </div>
        </>
    );
}

const teams = [
    { name: "Engineering", href: "#", bgColorClass: "bg-indigo-500" },
    { name: "Human Resources", href: "#", bgColorClass: "bg-green-500" },
    { name: "Customer Success", href: "#", bgColorClass: "bg-yellow-500" },
];
const projects = [
    {
        id: 1,
        title: "GraphQL API",
        initials: "GA",
        team: "Engineering",
        members: [
            {
                name: "Dries Vincent",
                handle: "driesvincent",
                imageUrl:
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            {
                name: "Lindsay Walton",
                handle: "lindsaywalton",
                imageUrl:
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            {
                name: "Courtney Henry",
                handle: "courtneyhenry",
                imageUrl:
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            {
                name: "Tom Cook",
                handle: "tomcook",
                imageUrl:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
        ],
        totalMembers: 12,
        lastUpdated: "March 17, 2020",
        pinned: true,
        bgColorClass: "bg-pink-600",
    },
    // More projects...
];
const pinnedProjects = projects.filter((project) => project.pinned);
