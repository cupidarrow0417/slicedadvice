import { ChevronDownIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { getBookings } from "../../../../redux/actions/bookingActions";
import { loadUser } from "../../../../redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import DashboardHeader from "../../DashboardHeader";
import DetailsSingleTextResponseBooking from "./bookingTypes/singleTextResponse/DetailsSingleTextResponseBooking";
import PreviewSingleTextResponseBooking from "./bookingTypes/singleTextResponse/PreviewSingleTextResponseBooking";

const BookingsExpertDashboard = () => {
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
            <div className="bg-white w-full h-[4.5rem] px-4 py-4 flex items-center justify-between sm:px-6 rounded-t-xl lg:rounded-tl-none lg:px-8 border-b-[1px] border-black/10">
                <DashboardHeader
                    dashboardType="Expert"
                    dashboardPage="Bookings"
                />
            </div>
            {/* Main content */}
            <div className="flex w-full h-[calc(100%-4.5rem)]">
                <div className="flex flex-col gap-2 overflow-auto h-full w-full md:w-2/5 p-2 px-0 md:p-2 md:border-r border-black/10">
                    {allBookings !== null &&
                        allBookings !== undefined &&
                        allBookings.length > 0 &&
                        allBookings.map((booking: any) => (
                            <PreviewSingleTextResponseBooking
                                key={booking._id}
                                booking={booking}
                            />
                        ))}
                </div>
                <div className="hidden md:flex h-full w-3/5 p-2 overflow-auto">
                    <div className="w-full h-full">
                        <DetailsSingleTextResponseBooking
                            booking={allBookings[1]}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingsExpertDashboard;
