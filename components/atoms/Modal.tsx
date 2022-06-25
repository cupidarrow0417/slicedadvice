/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import Router from "next/router";

// Currently, the modal is a semi-reusable component that
// represents a popup modal that covers the screen.
// I say semi-reusable because a lot of it is built specifically
// for the dashboard and the local state of the dashboard.
// Will think about whether it is flexible for other situations soon.
// Regardless, to open the modal, simply change the state of the open
// local state, which currently is only possible by changing the
// prop openLocalState from the parent container that this component
// is housed in. To close it, click the first or last button in this
// component (built into every modal), or click outside of the modal div.
export default function Modal({
    children,
    openLocalState,
    buttonText,
    closeButtonText,
}: {
    children: any;
    openLocalState: boolean;
    buttonText: string;
    closeButtonText: string;
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
        Router.push("/dashboard/expert/bookings", undefined, {shallow: true});
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
