import { PencilAltIcon } from "@heroicons/react/outline";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    clearBookingsErrors,
    clearBookingsSuccess,
    getBookings,
    updateBooking,
} from "../../../../../../redux/actionCreators/bookingActionCreators";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import Badge from "../../../../../Badge";
import ButtonLoader from "../../../../../layout/ButtonLoader";

const DetailsSingleTextResponseBooking = ({ booking }: any) => {
    const dispatch = useAppDispatch();

    const { metadata: bookingsMetadata, bookings } = useAppSelector(
        (state) => state.bookings
    );

    // Holds text that user types in
    const [textResponse, setTextResponse] = useState("");

    // Handle the send response button click, updating the booking
    // if the current booking's status is "Not Completed"
    const handleSendResponseClick = () => {
        if (booking.status !== "Completed") {
            dispatch(
                updateBooking(booking._id, {
                    ...booking,
                    singleTextResponse: {
                        customerSubmission:
                            booking.singleTextResponse.customerSubmission,
                        expertResponse: textResponse,
                    },
                    status: "Completed",
                })
            );
        }
    };

    /* Checking if there is an error or success message in the bookingsMetadata object. If there is, it
    will display a toast message. */
    useEffect(() => {
        if (bookingsMetadata.error) {
            toast.error(bookingsMetadata.error);
            dispatch(clearBookingsErrors());
        }

        if (bookingsMetadata.success) {
            toast.success("Responded to booking successfully!");
            dispatch(clearBookingsSuccess());
        }
    }, [bookingsMetadata]);
    return (
        <div className="flex flex-col gap-4 p-6 py-8 bg-white shadow-lg rounded-lg w-full max-w-xl h-fit border border-black/10">
            <div className="flex justify-between items-start gap-4">
                <div className="flex items-center justify-center">
                    {/* <div className="flex items-center w-14 h-14 rounded-full bg-black/10">
                        <PencilAltIcon className="w-3/5 m-auto" />
                    </div> */}
                    <h1 className="text-2xl font-bold tracking-tight text-brand-primary-light">
                        {booking?.bookingType} Booking
                    </h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 ">
                    {booking?.status === "Not Completed" && (
                        <Badge color="red" text={booking?.status} />
                    )}
                    {booking?.status === "Completed" && (
                        <Badge color="green" text={booking?.status} />
                    )}
                    <p className="text-xs opacity-50 whitespace-nowrap">
                        {moment(booking?.createdAt).format("MMM Do, YYYY")}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-4">
                    <h1 className="text-md">From: {booking?.customer?.name}</h1>
                    <Link
                        href={`/expertisePost/${booking?.expertisePost?._id}`}
                        passHref={true}
                    >
                        <a
                            target="_blank"
                            className="text-xs max-w-[10rem] sm:max-w-[13rem] opacity-60 hover:opacity-100 overflow-scroll whitespace-nowrap"
                        >
                            Expertise Post: {booking?.expertisePost?.title}
                        </a>
                    </Link>
                </div>
                <div className="w-full h-72 min-h-[18rem] border border-black/10 font-light leading-relaxed p-4 rounded-lg">
                    {booking?.singleTextResponse?.customerSubmission}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {booking?.status === "Not Completed" && (
                    <div className="w-full h-28 border border-black/10 p-2 rounded-lg">
                        <textarea
                            id="textareaInput"
                            name="textareaInput"
                            autoComplete="none"
                            required
                            // maxLength={maxDescriptionLength}
                            className="block px-3 py-2 h-full w-full rounded-md placeholder-gray-400 resize-none focus:ring-0 border-transparent focus:border-transparent sm:text-md"
                            placeholder={
                                "Hey! I'm happy to help. My best advice would be..."
                            }
                            value={textResponse}
                            disabled={
                                bookingsMetadata.loading ||
                                booking?.status === "Completed"
                            }
                            onChange={(e) => setTextResponse(e.target.value)}
                        />
                    </div>
                )}
                <button
                    className={classNames(
                        booking?.status === "Completed" ||
                            bookingsMetadata.loading ||
                            textResponse.length < 30
                            ? "opacity-40"
                            : "opacity-100",
                        `flex justify-center items-center rounded-xl bg-brand-primary-light hover:bg-brand-primary-light/80 text-white p-3 font-semibold text-md md:text-lg`
                    )}
                    onClick={handleSendResponseClick}
                    disabled={
                        bookingsMetadata.loading ||
                        textResponse.length < 30 ||
                        booking?.status === "Completed"
                            ? true
                            : false
                    }
                >
                    {bookingsMetadata.loading ? (
                        <ButtonLoader />
                    ) : booking?.status === "Completed" ? (
                        "Booking Completed"
                    ) : textResponse.length < 30 ? (
                        "Type a Response First!"
                    ) : (
                        "Send Response"
                    )}
                </button>
            </div>
        </div>
    );
};

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export default DetailsSingleTextResponseBooking;
