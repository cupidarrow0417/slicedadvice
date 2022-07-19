import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface FormOptionsInterface {
    title: string;
    description: string;
    current: boolean;
}

interface FormSelectMenuInterface {
    inputTypeString: string;
    options: FormOptionsInterface[];
    required: boolean;
    currentIndex: number
}


// The FormSelectMenu component is a reusable custom component 
// that represents an informative form input dropdown, similar to 
// an HTML Select menu. Use it in a form, where you want the user to 
// select an option. Pass an inputTypeString and boolean "required", 
// which notably are used in the hidden input element that captures
// the selection and passes it to the parent component via the ref.

// And finally, pass in an options array that contains the options
// for selection, which each have a title, description, and "current" 
// boolean (used in the HeadlessUI Listbox component). 
const FormSelectMenu = React.forwardRef(
    (
        {
            inputTypeString,
            options,
            required,
            currentIndex
        }: FormSelectMenuInterface,
        ref: React.Ref<HTMLInputElement>
    ) => {
        const [selected, setSelected] = useState(options[currentIndex]);

        return (
            <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="sr-only">
                            {"Change " + inputTypeString.toLowerCase()}
                        </Listbox.Label>
                        <div className="relative">
                            <div className="inline-flex shadow-sm rounded-md divide-x divide-brand-primary/60">
                                <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-brand-primary/60">
                                    <div className="relative inline-flex items-center bg-brand-primary-light py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                                        <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                        <p className="ml-2.5 text-sm font-medium">
                                            {selected.title}
                                        </p>
                                    </div>

                                    {/* Hidden Input here, with the forwarded ref that you may use
                                    within the parent component to this FormSelectMenu */}
                                    <input
                                        type="hidden"
                                        id={inputTypeString}
                                        name={inputTypeString}
                                        value={selected.title}
                                        required={required}
                                        onChange={() => null}
                                        ref={ref}
                                    />

                                    <Listbox.Button className="relative inline-flex items-center bg-brand-primary-light p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-brand-primary/90 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-brand-primary-light">
                                        <span className="sr-only">
                                            {"Change " +
                                                inputTypeString.toLowerCase()}
                                        </span>
                                        <ChevronDownIcon
                                            className="h-5 w-5 text-white"
                                            aria-hidden="true"
                                        />
                                    </Listbox.Button>
                                </div>
                            </div>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="origin-top-right absolute z-10 left-0 mt-2 w-72 max-w-[70vw] rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {options.map((option: any) => (
                                        <Listbox.Option
                                            key={option.title}
                                            className={({ active }) =>
                                                classNames(
                                                    active
                                                        ? "text-white bg-brand-primary-light"
                                                        : "text-gray-900",
                                                    "cursor-default select-none relative p-4 text-sm"
                                                )
                                            }
                                            value={option}
                                        >
                                            {({ selected, active }) => (
                                                <div className="flex flex-col">
                                                    <div className="flex justify-between">
                                                        <p
                                                            className={
                                                                selected
                                                                    ? "font-semibold"
                                                                    : "font-normal"
                                                            }
                                                        >
                                                            {option.title}
                                                        </p>
                                                        {selected ? (
                                                            <span
                                                                className={
                                                                    active
                                                                        ? "text-white"
                                                                        : "text-brand-primary-light"
                                                                }
                                                            >
                                                                <CheckIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                    <p
                                                        className={classNames(
                                                            active
                                                                ? "text-white"
                                                                : "text-gray-500",
                                                            "mt-2"
                                                        )}
                                                    >
                                                        {option.description}
                                                    </p>
                                                </div>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        );
    }
);

export default FormSelectMenu
