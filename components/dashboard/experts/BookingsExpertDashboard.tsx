import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { getBookings } from "../../../redux/actions/bookingActions";
import { loadUser } from "../../../redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import DashboardHeader from "../DashboardHeader";

const BookingsExpertDashboard = () => {
    const dispatch = useAppDispatch();

    const {
        allBookingsCount,
        filteredAllBookingsCount,
        allBookings,
        error: allBookingsError,
    } = useAppSelector((state) => state.allBookings);

    useEffect(() => {
        if (allBookingsError) {
            toast.error(allBookingsError);
        }

        if (allBookings) {
            console.log(
                `Successfully retrieved ${allBookingsCount} total bookings, ${filteredAllBookingsCount} after filtered. Bookings:`,
                allBookings
            );
        }
    }, [allBookingsError, allBookings]);
    return (
        <>
            {/* Page title & actions */}
            <div className="bg-white px-4 py-4 flex items-center justify-between sm:px-6 rounded-t-xl lg:rounded-tl-none lg:px-8 border-b-[1px] border-black/10">
                <DashboardHeader
                    dashboardType="Expert"
                    dashboardPage="Bookings"
                />

                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-xs md:text-sm font-medium rounded-md text-white bg-brand-primary-light hover:bg-brand-primary-light/90"
                >
                    New Post
                </button>
            </div>
            <div>
                {/* <p>{allBookings}</p> */}
            </div>
        </>
    );
};

export default BookingsExpertDashboard;
