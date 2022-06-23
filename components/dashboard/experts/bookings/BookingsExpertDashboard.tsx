import { ChevronDownIcon } from "@heroicons/react/solid";
import Router, { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { clearErrors } from "../../../../redux/actions/reviewActions";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import Modal from "../../../Modal";
import DashboardHeader from "../../DashboardHeader";
import DetailsSingleTextResponseBooking from "./bookingTypes/singleTextResponse/DetailsSingleTextResponseBooking";
import PreviewSingleTextResponseBooking from "./bookingTypes/singleTextResponse/PreviewSingleTextResponseBooking";

const BookingsExpertDashboard = () => {
    const dispatch = useAppDispatch();
    const {
        allBookingsCount,
        filteredAllBookingsCount,
        allBookings,
        error: allBookingsError,
    } = useAppSelector((state) => state.allBookings);
    const { query: queryParams } = useRouter();

    // Important to observe this global state change of updatedBooking
    // to update the local state localAllBookings. If we don't, then
    // the BookingsExpertDashboard won't ever know that a booking has been
    // updated, and thus will load stale data into the child components.
    const {
        booking: updatedBooking,
        success: updateBookingSuccess,
        loading: updateBookingLoading,
        error: updateBookingError,
    } = useAppSelector((state) => {
        return state.updateBooking;
    });

    const [localAllBookings, setLocalAllBookings] = useState(allBookings);

    // Local state to handle which booking is currently selected. Note:
    // this is determined by the "booking" query param in the url, which
    // represents the id of the booking. The default booking (only for desktop,
    // since on mobile the detail view is initially hidden) is the first booking returned.
    const [currentBookingSelected, setCurrentBookingSelected] = useState(
        allBookings[0]
    );

    /* This is a local state that is used to control the popup modal on mobile. If the 
    bookingId in the query string is already filled (maybe they came from an email), 
    and the user is on mobile, automatically open the modal with that booking 
    On desktop, the modal never opens. */
    const [modalOpen, setModalOpen] = useState(
        window.innerWidth < 768 && queryParams.booking ? true : false
    );
    useEffect(() => {
        if (window.innerWidth >= 768) {
            setModalOpen(false);
        }
    }, [window.innerWidth]);

    // As said before, this useEffect watches for the updatedBooking global state and
    // updates the localAllBookings state with this new single updatedBooking, so that 
    // the entire dashboard stays in sync with new data even with no full page refreshes.
    useEffect(() => {
        if (updatedBooking) {
            let newAllBookings = allBookings.map((booking: any) => {
                if (booking._id === updatedBooking._id) {
                    return updatedBooking
                } else {
                    return booking
                }
            });
            setLocalAllBookings(newAllBookings);
        }
    }, [updatedBooking]);

    /* Main useEffect for BookingsExpertDashboard that sets local state the moment
        allBookings is retrieved from the global state.*/
    useEffect(() => {
        if (allBookingsError) {
            toast.error(allBookingsError);
            dispatch(clearErrors());
        }

        // If bookings are loaded, and if a booking id already exists, set the
        // currentBookingSelected state to the booking with the matching id in allBookings.
        // On mobile and desktop, currentBookingSelected is ALWAYS set to be the one
        // in the url. So, that means we can easily control which booking is focused from
        // anywhere in the component tree, by doing a shallow routed Router.push(). Woohoo!
        if (allBookings) {
            if (queryParams.booking) {
                const booking = allBookings.find(
                    (booking: any) => booking._id === queryParams.booking
                );
                if (booking) {
                    setCurrentBookingSelected(booking);
                }
                // For mobile, open the modal.
                if (window.innerWidth < 768) {
                    setModalOpen(true);
                }
            } else {
                // If the booking query param is empty, close the modal.
                // Important and only for mobile; closing the popup modal deletes
                // the query param from the url, triggering this part of the code.
                if (window.innerWidth < 768) {
                    setModalOpen(false);
                }
            }
            // console.log(
            //     `Successfully retrieved ${allBookingsCount} total bookings, ${filteredAllBookingsCount} after filtered. Bookings:`,
            //     allBookings
            // );
        }
    }, [allBookingsError, allBookings, queryParams.booking]);

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
                {/* Preview always visible on all screen sizes  */}
                <div className="flex flex-col gap-2 overflow-auto h-full w-full md:w-2/5 p-2 px-0 md:p-2 md:border-r border-black/10">
                    {localAllBookings !== null &&
                        localAllBookings !== undefined &&
                        localAllBookings.length > 0 &&
                        localAllBookings.map((booking: any) => (
                            <PreviewSingleTextResponseBooking
                                key={booking._id}
                                booking={booking}
                            />
                        ))}
                </div>
                {/* Desktop view of the booking details.  */}
                <div className="hidden md:flex h-full w-3/5 p-2 overflow-auto">
                    <div className="hidden md:flex w-full h-full">
                        <DetailsSingleTextResponseBooking
                            key={currentBookingSelected._id}
                            booking={currentBookingSelected}
                        />
                    </div>
                </div>
                {/* Mobile Modal containing booking details. */}
                <div className="block md:hidden">
                    <Modal
                        openLocalState={modalOpen}
                        buttonText="Open"
                        closeButtonText="Return to Dashboard"
                        key={currentBookingSelected._id}
                    >
                        <DetailsSingleTextResponseBooking
                            key={currentBookingSelected._id}
                            booking={currentBookingSelected}
                        />
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default BookingsExpertDashboard;
