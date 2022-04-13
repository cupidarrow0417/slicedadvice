import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";
import router from "next/router";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface ChildrenInterface {
    name: string;
    href: string;
    description: string;
}

interface FlyoutInterface {
    name: string;
    href: string;
    children: Array<ChildrenInterface> | undefined;
    headerText: string | null | undefined;
}

// A Flyout is a resuable component that represents a button that can either
// be clicked to navigate directly to the page or hovered over to peek into
// the contents of the page. It is first used on the top nav bar on desktop +
// tablets, for the Categories button.
export default function Flyout({
    name,
    href,
    children,
    headerText,
}: FlyoutInterface) {
    // Adds hover capability to flyout instead of default onClick
    const [isShowing, setIsShowing] = useState(false);
    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button
                        className="flex hover:bg-brand-primary-light hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-default"
                        onClick={() => router.push("/categories")}
                        onMouseEnter={() => setIsShowing(true)}
                        onMouseLeave={() => setIsShowing(false)}
                    >
                        <span>{name}</span>
                        <ChevronDownIcon
                            className="ml-2 mt-[1px] h-5 w-5 group-hover:text-white"
                            aria-hidden="true"
                        />
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-250"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                        show={isShowing}
                    >
                        <Popover.Panel
                            onMouseEnter={() => setIsShowing(true)}
                            onMouseLeave={() => setIsShowing(false)}
                            className="absolute z-10 left-1/2 transform -translate-x-1/2 px-2 w-screen max-w-xs sm:px-0"
                        >
                            <div className="bg-transparent w-full h-2"></div>
                            <div className="rounded-xl shadow-md overflow-hidden border-[1px] border-black/10">
                                <div className="relative grid gap-3 bg-white px-5 py-6">
                                    {headerText && (
                                        <>
                                            {/* Only render headerText if it exists */}
                                            <Link href={href}>
                                                <a
                                                    key={name}
                                                    className="p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                                                >
                                                    <p className="text-xl font-medium text-brand-primary">
                                                        {headerText} &rarr;
                                                    </p>
                                                </a>
                                            </Link>
                                            {/* Line Break */}
                                            <div className=" w-11/12 m-auto h-[1px] bg-black/10"></div>
                                        </>
                                    )}
                                    {children?.map((item: any) => (
                                        <Link href={item.href}>
                                            <a
                                                key={item.name}
                                                className="p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                                            >
                                                <p className="text-base font-medium text-gray-900">
                                                    {item.name}
                                                </p>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {item.description}
                                                </p>
                                            </a>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
