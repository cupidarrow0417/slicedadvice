import moment from "moment";
import Link from "next/link";
import React from "react";

const DetailsSingleTextResponseBooking = ({ booking }: any) => {
    return (
        <div className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg w-full h-fit border border-black/10">
            <div className="flex justify-between items-center gap-4">
                <h1 className="text-xl font-medium text-brand-primary-light">
                    {booking.bookingType} Booking
                </h1>
                <p className="text-xs opacity-50 whitespace-nowrap">
                    {moment(booking.createdAt).format("MMM Do, YYYY")}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-2">
                    <h1 className="text-md">From: {booking.customer.name}</h1>
                </div>
                <div className="w-full h-80 min-h-[20rem] border border-black/10 font-light leading-relaxed p-4 rounded-lg">
                    {booking.singleTextResponse.customerSubmission}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {/* <h1 className="text-md">From: {booking.customer.name}</h1> */}
                <div className="w-full h-20 border border-black/10 p-4 rounded-lg"></div>
            </div>
        </div>
    );
};

export default DetailsSingleTextResponseBooking;
