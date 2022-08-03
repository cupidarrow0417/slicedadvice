import { ChevronDownIcon } from "@heroicons/react/solid";
import { CashIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import ButtonLoader from "../../../layout/ButtonLoader";
import SetupPayoutsAlert from "../SetupPayoutsAlert";
import Loader from "../../../layout/Loader";
import { useRouter } from "next/router";
import DashboardHeader from "../../DashboardHeader";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SingleShelf from "../../../atoms/SingleShelf";
import MultiShelf from "../../../atoms/MultiShelf";
import ExpertisePostCard from "../../../expertisePost/ExpertisePostCard";
import PreviewSingleTextResponseBooking from "../../PreviewSingleTextResponseBooking";
import booking from "../../../../models/booking";

const HomeExpertDashboard = ({ user, expertisePosts, bookings }: any) => {
    // Get Session via useSession hook
    const { data: session }: any = useSession();
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
            <div className="flex items-center justify-between bg-white px-4 pt-6 pb-4 sm:px-6 rounded-t-xl lg:rounded-tl-none border-b-[1px] lg:px-8 border-black/10">
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
            <div className="w-full flex items-center justify-center sm:p-4 border-black/10">
                {!chargesEnabled ? (
                    <SetupPayoutsAlert user={user} />
                ) : expertisePosts.length === 0 ? (
                    <div className="flex items-center rounded-xl bg-white w-full p-9">
                        <h1>{`Charges have been enabled! Woohoo! Click the "New Post" button to create your first expertise posting.`}</h1>
                    </div>
                ) : (
                    <div className="block overflow-hidden">
                        {expertisePosts && (
                            <section className="w-full mx-0 my-10 overflow-x-auto">
                                <SingleShelf
                                    title="Your Latest Posts"
                                    link="/dashboard/expert/posts"
                                >
                                    {expertisePosts.map(
                                        (expertisePost: any) =>
                                            expertisePost && (
                                                <ExpertisePostCard
                                                    key={expertisePost._id}
                                                    expertisePost={
                                                        expertisePost
                                                    }
                                                />
                                            )
                                    )}
                                </SingleShelf>
                            </section>
                        )}
                        {bookings && (
                            <section className="w-full mx-0 my-20 overflow-x-auto">
                                <SingleShelf
                                    title="Your Latest Bookings"
                                    link="/dashboard/expert/bookings"
                                >
                                    {bookings.map(
                                        (booking: any) =>
                                            booking && (
                                                <PreviewSingleTextResponseBooking
                                                    key={booking._id}
                                                    booking={booking}
                                                    dashboardType={"Expert"}
                                                    shallowPush={false}
                                                />
                                            )
                                    )}
                                </SingleShelf>
                            </section>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeExpertDashboard;
