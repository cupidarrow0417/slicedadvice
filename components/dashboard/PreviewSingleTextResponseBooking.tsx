import React, { useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import Router from "next/router";

interface PreviewSingleTextResponseBookingInterface {
    booking: any;
    dashboardType: "Advice Seeker" | "Expert";
    shallowPush: boolean;
}

{
    /* Example booking as of June 16, 2022 {
      singleTextResponse: [Object],
      _id: '6287e2137f99ba689399a56a',
      expertisePost: [Object],
      bookingType: 'Single Text Response',
      customer: [Object],
      status: 'Pending Acceptance',
      stripePaymentIntentId: 'pi_3L1aqJBEcP4VNna21rraFw5x',
      createdAt: '2022-05-20T18:46:43.050Z',
      __v: 0
    }, */
}

// The PreviewSingleTextResponseBooking is a reusable component that shows a
// preview of a booking. It is compact and displays
// a few key details about the booking. It is flexible to both the advice seeker's
// dashboard as well as the expert dashboard.
const PreviewSingleTextResponseBooking = ({
    booking,
    dashboardType,
    shallowPush,
}: PreviewSingleTextResponseBookingInterface) => {
    /* Parsing the date into a more readable format. */
    let parsedDate: any = moment(booking.createdAt).format("MMM Do, YYYY");

    let buttonLink: string;

    if (booking) {
        buttonLink =
            dashboardType === "Advice Seeker"
                ? `/dashboard/adviceSeeker/bookings?booking=${booking._id}`
                : `/dashboard/expert/bookings?booking=${booking._id}`;
    }

    return (
        booking && (
            <div className="flex flex-col justify-between gap-3 w-full h-fit py-5 bg-white border-b min-w-[20rem]">
                <div className="flex justify-between items-center">
                    {/* Customer and date */}
                    <div className="text-brand-primary-light">
                        {/* Display different text depending on dashboard type  */}
                        {dashboardType === "Expert"
                            ? `From: ${booking?.customer?.name}`
                            : `Booking for ${booking?.expertisePost?.user?.name}`}
                    </div>
                    <p className="text-xs opacity-50">{parsedDate}</p>
                </div>
                <div>
                    {/* Customer submission */}
                    <div className="p-2 w-full rounded-md border border-black/10 ">
                        {booking.singleTextResponse.customerSubmission.slice(
                            0,
                            75
                        )}
                        {booking.singleTextResponse.customerSubmission.length >
                            75 && "..."}
                    </div>
                </div>
                <div className="flex justify-between items-center gap-2">
                    {/* Booking Type */}
                    <p className="text-sm opacity-50">
                        {booking.bookingType} Booking
                    </p>
                    <div className="flex gap-1">
                        {/* Button that when clicked, pushes the specific booking associated
                        with this preview, into the URL. This is detected by the parent booking
                        dashboard, which sets this booking to be the current selected booking.
                        On mobile, this triggers the opening of the modal which contains the 
                        popup modal containing the DetailsSingleTextResponseBooking */}
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary-light hover:bg-brand-primary-light/90"
                            // disabled={}
                            onClick={() =>
                                Router.push(buttonLink, undefined, {
                                    shallow: shallowPush,
                                })
                            }
                        >
                            Open
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default PreviewSingleTextResponseBooking;
