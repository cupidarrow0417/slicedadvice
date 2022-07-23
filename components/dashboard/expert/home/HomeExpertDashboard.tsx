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

const HomeExpertDashboard = () => {
    // Get Session via useSession hook
    const { data: session }: any = useSession();
    const router = useRouter();
    const {
        accountField: chargesEnabled,
        loading: checkStripeAccountFieldLoading,
    } = useAppSelector((state) => {
        return state.checkStripeAccountField;
    });

    // Retrieve this specific expert's posts from the store after retrieving it from the DB.
    const { allExpertisePosts, error: allExpertisePostsError } = useAppSelector(
        (state) => state.allExpertisePosts
    );

    // Retrieve this specific expert's bookings from the store after retrieving it from the DB.
    const { bookings, metadata: bookingsMetadata } = useAppSelector(
        (state) => state.bookings
    );


    const [lastFivePosts, setLastFivePosts] = useState<any>([]);
    const [lastFiveBookings, setLastFiveBookings] = useState<any>([]);

    // Sorting allExpertisePosts by Date Newest to oldest
    // Then storing five most recent in lastFivePosts
    useEffect(() => {
        if (allExpertisePosts) {

            // Converting String format date to JS Date Object
            for (let i = 0; i < allExpertisePosts.length; i++) {
                // console.log(Date.parse(allExpertisePosts[i].createdAt));
                const newDate = new Date(allExpertisePosts[i].createdAt);
                allExpertisePosts[i].createdAt = newDate;
            }
            // console.log(allExpertisePosts); For Debugging Purposes

            // Sorting the bookings array by date (Newest to oldest)
            allExpertisePosts.sort((a: any, b: any) => {
                return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
            })

            // console.log("\nSorted Array") For Debugging Purposes
            // console.log(allExpertisePosts) For Debugging Purposes

            // Pushing five most recent bookings into lastFivePosts array
            for (let i = 0; i < 5; i++) {
                lastFivePosts.push(allExpertisePosts[i])
            }
        }
    }, [])

    // Sorting all bookings by Date Newest to oldest
    // Then storing five most recent in lastFiveBookings
    useEffect(() => {
        if (bookings) {

            // Converting String format date to JS Date Object
            for (let i = 0; i < bookings.length; i++) {
                // console.log(Date.parse(allExpertisePosts[i].createdAt));
                const newDate = new Date(bookings[i].createdAt);
                bookings[i].createdAt = newDate;
            }
            // console.log(bookings); For Debugging Purposes

            // Sorting the bookings array by date (Newest to oldest)
            bookings.sort((a: any, b: any) => {
                return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
            })

            // console.log("\nSorted Array") For Debugging Purposes
            // console.log(bookings)  For Debugging Purposes

            // Pushing five most recent bookings into lastFiveBookings array
            for (let i = 0; i < 5; i++) {
                lastFiveBookings.push(bookings[i])
            }
        }
    }, [])



    const [dashboardType, setDashboardType] = useState<"Advice Seeker" | "Expert">()

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
                    <SetupPayoutsAlert />
                ) : !allExpertisePosts ? (
                    <div className="flex items-center rounded-xl border-y-[1px] sm:border-x-[1px] border-black/10 bg-white w-full p-9">
                        <h1>{`Charges have been enabled! Woohoo! Click the "New Post" button to create your first expertise posting.`}</h1>
                    </div>
                ) : (
                    <div className="block overflow-hidden">
                        <section className="w-full mx-0 my-10 overflow-x-auto">
                            <SingleShelf
                                title="Latest Posts"
                                link="/dashboard/expert/posts"
                            >
                                {lastFivePosts &&
                                    lastFivePosts.map(
                                        (expertisePost: any) => (
                                            <ExpertisePostCard
                                                key={expertisePost._id}
                                                expertisePost={expertisePost}
                                            />
                                        )
                                    )}
                            </SingleShelf>
                        </section>

                        <section className="w-full mx-0 my-20 overflow-x-auto">
                            <SingleShelf
                                title="Latest Bookings"
                                link="/dashboard/expert/bookings"
                            >
                                {lastFiveBookings &&
                                    lastFiveBookings.map(
                                        (booking: any) => (
                                            <PreviewSingleTextResponseBooking
                                                key={booking._id}
                                                booking={booking}
                                                dashboardType={dashboardType}
                                                shallowPush={false}
                                            />
                                        )
                                    )}
                            </SingleShelf>
                        </section>
                    </div>
                )}
            </div>
        </div >
    );
};

export default HomeExpertDashboard;
