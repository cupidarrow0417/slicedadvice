import { PencilAltIcon } from "@heroicons/react/outline";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    clearErrors,
    getBookings,
    updateBooking,
} from "../../../../../../redux/actions/bookingActions";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import Badge from "../../../../../Badge";
import ButtonLoader from "../../../../../layout/ButtonLoader";

const DetailsSingleTextResponseBooking = ({ booking }: any) => {
    console.log("booking", booking);
    const dispatch = useAppDispatch();
    // Holds text that user types in
    const [textResponse, setTextResponse] = useState("");

    // Saves current booking for this detail component.
    // Updated whenever this specific booking is updated
    // (e.g. when an expert sends a response).
    const [localBookingState, setLocalBookingState] = useState(booking);

    const {
        booking: updatedBooking,
        success,
        loading,
        error,
    } = useAppSelector((state) => {
        return state.updateBooking;
    });

    const [sentToastAlready, setSentToastAlready] = useState(
        updatedBooking && updatedBooking._id === booking._id ? true : false
    );

    // Handle the send response button click, updating the booking's
    // expert response and status to "Completed"
    useEffect(() => {
        // only update this specific components state
        // if it's booking was updated.
        if (
            updatedBooking !== null &&
            updatedBooking !== undefined &&
            updatedBooking._id === booking._id
        ) {
            if (!sentToastAlready) {
                toast.success("Booking completed successfully!");
            }
            setSentToastAlready(true);
            setLocalBookingState(updatedBooking);
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [success, error, updatedBooking]);

    // Handle the send response button click, updating the booking
    // if the current booking's status is "Not Completed"
    const handleSendResponseClick = () => {
        if (localBookingState.status !== "Completed") {
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

    return (
        <div className="flex flex-col gap-4 p-6 py-8 bg-white shadow-lg rounded-lg w-full max-w-xl h-fit border border-black/10">
            <div className="flex justify-between items-start gap-4">
                <div className="flex items-center justify-center">
                    {/* <div className="flex items-center w-14 h-14 rounded-full bg-black/10">
                        <PencilAltIcon className="w-3/5 m-auto" />
                    </div> */}
                    <h1 className="text-2xl font-bold tracking-tight text-brand-primary-light">
                        {localBookingState?.bookingType} Booking
                    </h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 ">
                    {localBookingState.status === "Not Completed" && (
                        <Badge color="red" text={localBookingState.status} />
                    )}
                    {localBookingState.status === "Completed" && (
                        <Badge color="green" text={localBookingState.status} />
                    )}
                    <p className="text-xs opacity-50 whitespace-nowrap">
                        {moment(localBookingState.createdAt).format(
                            "MMM Do, YYYY"
                        )}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-4">
                    <h1 className="text-md">
                        From: {localBookingState?.customer?.name}
                    </h1>
                    <Link
                        href={`/expertisePost/${localBookingState?.expertisePost?._id}`}
                        passHref={true}
                    >
                        <a
                            target="_blank"
                            className="text-xs max-w-[10rem] sm:max-w-[13rem] opacity-60 hover:opacity-100 overflow-scroll whitespace-nowrap"
                        >
                            Expertise Post:{" "}
                            {localBookingState?.expertisePost?.title}
                        </a>
                    </Link>
                </div>
                <div className="w-full h-72 min-h-[18rem] border border-black/10 font-light leading-relaxed p-4 rounded-lg">
                    {localBookingState?.singleTextResponse?.customerSubmission}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {localBookingState?.status === "Not Completed" && (
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
                                loading ||
                                localBookingState?.status === "Completed"
                            }
                            onChange={(e) => setTextResponse(e.target.value)}
                        />
                    </div>
                )}
                <button
                    className={classNames(
                        localBookingState?.status === "Completed" ||
                            loading ||
                            textResponse.length < 30
                            ? "opacity-40"
                            : "opacity-100",
                        `flex justify-center items-center rounded-xl bg-brand-primary-light hover:bg-brand-primary-light/80 text-white p-3 font-semibold text-md md:text-lg`
                    )}
                    onClick={handleSendResponseClick}
                    disabled={
                        loading ||
                        textResponse.length < 30 ||
                        localBookingState?.status === "Completed"
                            ? true
                            : false
                    }
                >
                    {loading ? (
                        <ButtonLoader />
                    ) : localBookingState?.status === "Completed" ? (
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
