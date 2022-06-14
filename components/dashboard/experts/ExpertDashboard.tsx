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
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
    checkStripeAccountField,
    loadUser,
} from "../../../redux/actions/userActions";
import YourPostsExpertDashboard from "./PostsExpertDashboard";
import Router from "next/router";

const navigation = [
    {
        name: "Home",
        href: "/dashboard/expert/home",
        icon: HomeIcon,
        current: false,
    },
    {
        name: "Posts",
        href: "/dashboard/expert/posts",
        icon: ViewListIcon,
        current: false,
    },
    {
        name: "Bookings",
        href: "/dashboard/expert/bookings",
        icon: InboxInIcon,
        current: false,
    },
    {
        name: "Payments",
        href: "/dashboard/expert/payments",
        icon: CashIcon,
        current: false,
    },
];

interface ExpertDashboardInterface {
    currentPage: string;
}

export default function ExpertDashboard({
    currentPage,
}: ExpertDashboardInterface) {
    const dispatch = useAppDispatch();

    const { user, loading: authLoading } = useAppSelector((state) => {
        return state.auth;
    });

    // Initial useEffect that checks for stripe id and dispatches
    // redux action to check whether charges are enabled. Important
    // for the SetupPayoutsAlert, and DashboardSidebar component,
    //  as we want to display different messages based on those Stripe account fields.
    useEffect(() => {
        // Check if the user has charges enabled on their Stripe
        // Connect account
        if (user) {
            if (user?.stripeId) {
                const field: any = {
                    field: "charges_enabled",
                };
                dispatch(checkStripeAccountField(field));
            }
        }
    }, [user]);

    // Check the global state that has info on whether
    // the user has charges enabled on their Stripe.
    // This process is first dispatched above.
    const {
        accountField: chargesEnabled,
        loading: checkStripeAccountFieldLoading,
    } = useAppSelector((state) => {
        return state.checkStripeAccountField;
    });

    return (
        <>
            <div className="h-screen flex rounded-xl shadow-md">
                {/* Static sidebar for desktop */}
                <div className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r-0 lg:border-black/10 lg:border-[1px] lg:pt-5 lg:pb-4 lg:bg-white rounded-tl-xl rounded-bl-xl">
                    <div className="flex items-center flex-shrink-0 px-6"></div>
                    <DashboardSidebar
                        navigation={navigation}
                        chargesEnabled={chargesEnabled}
                    />
                </div>
                {/* Main column */}
                <div className="flex flex-col w-full">
                    <main className="flex-1 border-[1px] rounded-xl lg:rounded-r-xl lg:rounded-l-none">
                        {currentPage === "Home" && <HomeExpertDashboard />}
                        {currentPage === "Posts" && chargesEnabled && (
                            <YourPostsExpertDashboard />
                        )}
                        {currentPage === "Bookings" && chargesEnabled && (
                            <BookingsExpertDashboard />
                        )}
                        {currentPage === "Payments" && (
                            <PaymentsExpertDashboard />
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}
