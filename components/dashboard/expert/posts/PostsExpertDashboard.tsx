import { ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../../redux/hooks";
import MultiShelf from "../../../atoms/MultiShelf";
import ExpertisePostCard from "../../../expertisePost/ExpertisePostCard";
import ButtonLoader from "../../../layout/ButtonLoader";
import DashboardHeader from "../../DashboardHeader";
import SetupPayoutsAlert from "../SetupPayoutsAlert";

const PostsExpertDashboard = () => {
    const router = useRouter();
    const { user, loading: authLoading } = useAppSelector(
        (state) => state.auth
    );
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

    // Toast errors
    useEffect(() => {
        if (allExpertisePostsError) {
            toast.error(allExpertisePostsError);
        }
    }, [allExpertisePostsError]);

    return (
        <div className="flex flex-col gap-4 ">
            {/* Page title & actions */}
            <div className="bg-white px-4 pt-6 pb-4 flex items-center justify-between sm:px-6 rounded-t-xl lg:rounded-tl-none border-b-[1px] lg:px-8 border-black/10">
                <DashboardHeader dashboardType="Expert" dashboardPage="Posts" />
                <div className="">
                    {/* <button
            type="button"
            className="order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
        >
            Share
        </button> */}
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary-light hover:bg-brand-primary-light/90"
                        disabled={authLoading ? true : false}
                        onClick={() => router.push("/expertisePost/create")}
                    >
                        {authLoading ? <ButtonLoader /> : "New Post"}
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-center sm:p-4 border-black/10">
                {!chargesEnabled ? (
                    <SetupPayoutsAlert />
                ) : !allExpertisePosts ? (
                    <div className="flex justify-center items-center rounded-xl border-y-[1px] sm:border-x-[1px] border-black/10 bg-white w-full p-9">
                        <h1>{`Charges have been enabled! Woohoo! Click the "New Post" button to create your first expertise posting.`}</h1>
                    </div>
                ) : (
                    <MultiShelf title="Your Posts" link="">
                        {allExpertisePosts.map((post: any) => (
                            <ExpertisePostCard
                                key={post._id}
                                expertisePost={post}
                            />
                        ))}
                    </MultiShelf>
                )}
            </div>
        </div>
    );
};

export default PostsExpertDashboard;
