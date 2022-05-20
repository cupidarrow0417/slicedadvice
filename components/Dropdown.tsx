/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import Link from "next/link";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface DropdownInterface {
    children: any;
    label: string;
    contents: {
        title: string;
        href: string;
    }[];
}

// The Dropdown is a reusable, flexible component that represents a
// button that when clicked, shows a dropdown containing links to other pages.
// Most notably, it takes in a child (clickable), so you'll want to use it like
// <Dropdown props...> CHILDREN HERE </Dropdown>.
// It is first used in the dashboard, for quick navigation on tablet and mobile.
export default function Dropdown({
    children,
    label,
    contents,
}: DropdownInterface) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="bg-gray-100 rounded-full flex justify-center items-center hover:bg-brand-primary-light hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-brand-primary-light">
                    <span className="sr-only">
                        {"Open " + label + " Dropdown"}
                    </span>
                    {/* <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" /> */}
                    {children}
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 sm:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {contents.map((content, index) => (
                            <Menu.Item key={index}>
                                {({ active }) => (
                                    <Link href={content.href}>
                                        <a
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                "block px-4 py-2 text-sm hover:bg-brand-primary-light hover:text-white"
                                            )}
                                        >
                                            {content.title}
                                        </a>
                                    </Link>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
