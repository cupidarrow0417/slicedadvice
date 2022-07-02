import { ChevronDownIcon } from "@heroicons/react/solid";
import Router, { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { clearBookingsErrors } from "../../redux/actionCreators/bookingActionCreators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Modal from "../atoms/Modal";
import DashboardHeader from "./DashboardHeader";
import DetailsSingleTextResponseBooking from "./DetailsSingleTextResponseBooking";
import PreviewSingleTextResponseBooking from "./PreviewSingleTextResponseBooking";

const BookingsDashboard = ({dashboardType}: {dashboardType: "Advice Seeker" | "Expert"}) => {
    const dispatch = useAppDispatch();
    const {
        bookings,
        metadata: bookingsMetadata,
    } = useAppSelector((state) => state.bookings);
    const { query: queryParams } = useRouter();

    // Local state to handle which booking is currently selected. Note:
    // this is determined by the "booking" query param in the url, which
    // represents the id of the booking. The default booking (only for desktop,
    // since on mobile the detail view is initially hidden) is the first booking returned.
    const [currentBookingSelected, setCurrentBookingSelected] = useState(
        bookings ? bookings[0] : null
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
        } else {
            setModalOpen(true);
        }
    }, [window.innerWidth]);

    /* Main useEffect for BookingsExpertDashboard that sets local state the moment
        allBookings is retrieved from the global state.*/
    useEffect(() => {
        if (bookingsMetadata.error) {
            toast.error(bookingsMetadata.error);
            dispatch(clearBookingsErrors());
        }

        // If bookings are loaded, and if a booking id already exists, set the
        // currentBookingSelected state to the booking with the matching id in allBookings.
        // On mobile and desktop, currentBookingSelected is ALWAYS set to be the one
        // in the url. So, that means we can easily control which booking is focused from
        // anywhere in the component tree, by doing a shallow routed Router.push(). Woohoo!
        if (bookings) {
            if (queryParams.booking) {
                const booking = bookings.find(
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
    }, [bookingsMetadata.error, bookings, queryParams.booking]);

    return (
        <>
            <div className="bg-white w-full h-[4.5rem] pt-6 pb-4 flex items-center justify-between rounded-t-xl border-b-[1px] lg:rounded-tl-none border-black/10">
                <DashboardHeader
                    dashboardType={dashboardType}
                    dashboardPage="Bookings"
                />
            </div>
            {/* Main content */}
            <div className="flex w-full h-[calc(100%-4.5rem)]">
                {/* Preview always visible on all screen sizes  */}
                <div className="flex flex-col gap-2 overflow-auto h-full w-full md:w-2/5">
                    {bookings !== null &&
                        bookings !== undefined &&
                        bookings.length > 0 &&
                        bookings.map((booking: any) => (
                            <PreviewSingleTextResponseBooking
                                key={booking._id}
                                booking={booking}
                                dashboardType={dashboardType}
                            />
                        ))}
                </div>
                {/* Desktop view of the booking details.  */}
                {currentBookingSelected && window.innerWidth >= 768 && (
                    <div className="hidden md:flex h-full w-3/5 p-2 overflow-auto">
                        <div className="hidden md:flex w-full h-full my-2">
                            <DetailsSingleTextResponseBooking
                                key={currentBookingSelected._id}
                                booking={currentBookingSelected}
                                dashboardType={dashboardType}
                            />
                        </div>
                    </div>
                )}

                {/* Mobile Modal containing booking details. */}
                {window.innerWidth < 768 && (
                    <div className="block md:hidden">
                        <Modal
                            openLocalState={modalOpen}
                            closeButtonText="Return to Dashboard"
                            key={currentBookingSelected._id}
                            dashboardType={dashboardType}
                        >
                            <DetailsSingleTextResponseBooking
                                key={currentBookingSelected._id}
                                booking={currentBookingSelected}
                                dashboardType={dashboardType}
                            />
                        </Modal>
                    </div>
                )}
            </div>
        </>
    );
};

export default BookingsDashboard;