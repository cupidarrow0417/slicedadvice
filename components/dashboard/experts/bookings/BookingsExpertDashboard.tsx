import { ChevronDownIcon } from "@heroicons/react/solid";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
    const { query: queryParams } = useRouter();

    // Local state to handle which booking is currently selected. Note:
    // this is determined by the "booking" query param in the url, which 
    // represents the id of the booking. The default booking (only for desktop)
    // is the first booking returned.
    const [currentBookingSelected, setCurrentBookingSelected] = useState(allBookings[0]);
    
    useEffect(() => {
        if (allBookingsError) {
            toast.error(allBookingsError);
        }

        // If bookings are loaded, and no booking is specified, just load in the 
        // first booking by pushing the first booking id into the url.
        if (allBookings) {
            if (!queryParams.booking) {
                Router.push(`/dashboard/expert/bookings?booking=${currentBookingSelected._id}`, undefined, { shallow: true })
            }
            // console.log(
            //     `Successfully retrieved ${allBookingsCount} total bookings, ${filteredAllBookingsCount} after filtered. Bookings:`,
            //     allBookings
            // );
        }
    }, [allBookingsError, allBookings]);

    useEffect(() => {
        // If a booking id already exists, set the current booking selected
        // state to the booking with the matching id.
        if (queryParams.booking) {
            const booking = allBookings.find((booking: any) => booking._id === queryParams.booking);
            if (booking) {
                setCurrentBookingSelected(booking);
            }
        }
    }, [allBookings, queryParams]);
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
                            key={currentBookingSelected._id}
                            booking={currentBookingSelected}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingsExpertDashboard;
