/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import Router from "next/router";

// Edit: Oops nvm this isn't really reusable haha.
// I will refactor this sometime :)
// The modal is a reusable component that
// represents a popup modal that covers the screen.=
// Follow these steps to use it properly:
// 1) Wrap the modal around whatever content you want to display when
//  the modal opens.
// 2) Define a button outside of the modal that when clicked, 
//    sets the openLocalState prop to true. This will trigger the modal to open.
//    Inside the modal, there are close buttons that when clicked,
//    set the openLocalState prop to false. This will trigger the modal to close.
// 3) Optional: Define the dashboardType prop to be "Advice Seeker" or "Expert",
//    so that the modal on close will shallow push the proper route back to the user,
//    (simply because the booking expert dashboard maintains state via the url)
export default function Modal({
    children,
    openLocalState,
    closeButtonText,
    dashboardType,
}: {
    children: any;
    openLocalState: boolean;
    closeButtonText: string;
    dashboardType?: "Advice Seeker" | "Expert" | undefined;
}) {
    const [open, setOpen] = useState(false);

    // Literally just to allow the transition to play
    // properly when the prop.openLocalState changes.
    // We totally could just put openLocalState in the initial
    // useState(), but that would make the modal default open,
    // thus not giving us a transition.
    useEffect(() => {
        if (openLocalState === true) {
            setOpen(true);
        } else if (openLocalState === false) {
            setOpen(false);
        }
    }, [openLocalState]);

    const handleClose = () => {
        setOpen(false);

        // Quick fix to allow use in bookings dashboard. 
        // But if you don't define dashboardType, you can use the modal for 
        // anything you want to have popped out and focused. Just make sure
        // to follow my directions above.
        if (dashboardType === "Advice Seeker") {
            Router.push("/dashboard/adviceSeeker/bookings", undefined, {shallow: true});
        } else if (dashboardType === "Expert") {
            Router.push("/dashboard/expert/bookings", undefined, {shallow: true});
        }
    }
    return (
        <>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => handleClose()}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-2 sm:p-4 mt-8 text-center">
                            <Transition.Child
                                as={"div"}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                className="flex flex-col items-end gap-2"
                            >
                                <button
                                    type="button"
                                    className="flex justify-center items-center w-12 h-12 bg-black text-white rounded-md"
                                    onClick={() => setOpen(false)}
                                >
                                    <XIcon className="w-full h-full" />
                                </button>
                                <Dialog.Panel className="flex flex-col gap-2 items-end relative h-fit w-full rounded-lg text-left overflow-auto transform transition-all">
                                    {children}
                                </Dialog.Panel>
                                <button
                                    type="button"
                                    className="inline-flex justify-center w-fit rounded-md mb-4 border border-transparent shadow-sm px-4 py-2 bg-black focus:outline-none text-base font-medium text-white hover:bg-black/90 sm:text-sm"
                                    onClick={() => setOpen(false)}
                                >
                                    {closeButtonText}
                                </button>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
