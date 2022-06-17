import React, { useEffect } from "react";
import moment from "moment";
import Link from "next/link";
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
// preview of a booking to help the expert determine whether
// it is acceptable to accept the booking. It is compact and displays
// a few key details about the booking.
const PreviewSingleTextResponseBooking = ({ booking }: any) => {
    //From the ExpertisePostCard component. Updated as of June 16, 2022.
    //These calculations allow us to slice the title at the right place so that
    //the title is always only two lines. Still a work in progress.
    let numSpacesInTitle: Number =
        booking.expertisePost["title"].slice(0, 35).split(" ").length - 1;
    let slicePoint: Number = numSpacesInTitle > 3 ? 40 : 30;

    let parsedDate: any = moment(booking.createdAt).format("MMM Do, YYYY");
    return (
        <div className="flex flex-col justify-between gap-4 border rounded-md w-full h-fit p-4 shadow-sm bg-white">
            <div className="flex justify-between">
                {/* Expertise Post and date */}
                <Link
                    href={`/expertisePost/${booking.expertisePost._id}`}
                    passHref={true}
                >
                    <a
                        target="_blank"
                        className="text-xs max-w-[10rem] text-brand-primary-light hover:opacity-70"
                    >
                        {booking.expertisePost.title.slice(0, slicePoint)}
                        {booking.expertisePost["title"].length > slicePoint &&
                            "..."}
                    </a>
                </Link>
                <p className="text-xs opacity-50">{parsedDate}</p>
            </div>
            <div>
                From: {booking.customer.name}
                <div className="italic p-2 w-full rounded-md border border-black/10 ">
                    {booking.singleTextResponse.customerSubmission.slice(0, 75)}
                    {booking.singleTextResponse.customerSubmission.length > 75 &&
                            "..."}
                </div>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-xs opacity-50">{booking.bookingType}</p>
                <div className="flex gap-1">
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary-light hover:bg-brand-primary-light/90"
                        // disabled={}
                        // onClick={() => }
                    >
                        Accept
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-black/10 text-sm font-medium rounded-md text-black bg-white hover:opacity-70"
                        // disabled={}
                        // onClick={() => }
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreviewSingleTextResponseBooking;
