import { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    checkStripeAccountField,
    loadUser,
} from "../../redux/actionCreators/userActions";
import UniversalFadeAnimation from "../atoms/UniversalFadeAnimation";
import ExpertDashboardSidebar from "./expert/ExpertDashboardSidebar";
import AdviceSeekerDashboardSidebar from "./adviceSeeker/AdviceSeekerDashboardSidebar";
import { useSession } from "next-auth/react";


interface DashboardInterface {
    children: any;
    dashboardType: "Advice Seeker" | "Expert";
}

export default function Dashboard({ children, dashboardType }: DashboardInterface) {
    // Get Session via useSession hook 
    const { data: session }: any = useSession();
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
        if (session) {
            if (dashboardType === "Expert" && user?.stripeConnectId) {
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
            <UniversalFadeAnimation animationType="appear">
                <div className="h-screen flex rounded-xl shadow-md">
                    {/* Static sidebar for desktop */}
                    <div className="hidden lg:flex lg:flex-col lg:w-56 lg:border-r-0 lg:border-black/10 lg:border-[1px] lg:pt-5 lg:pb-4 lg:bg-white rounded-tl-xl rounded-bl-xl">
                        <div className="flex items-center flex-shrink-0 px-6"></div>
                        {dashboardType === "Expert" && (
                            <ExpertDashboardSidebar
                                chargesEnabled={chargesEnabled}
                            />
                        )}
                        {dashboardType === "Advice Seeker" && (
                            <AdviceSeekerDashboardSidebar />
                        )}
                    </div>
                    {/* Main column */}
                    <div className="flex flex-col w-full">
                        <main className="px-4 sm:px-6 lg:px-8 flex-1 relative border-[1px] rounded-xl lg:rounded-r-xl lg:rounded-l-none overflow-auto">
                            {children}
                        </main>
                    </div>
                </div>
            </UniversalFadeAnimation>
        </>
    );
}
