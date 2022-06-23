import { Fragment, useEffect } from "react";
import Image from "next/image";
import { Disclosure, Menu, Transition, Popover } from "@headlessui/react";
import {
    BellIcon,
    MenuIcon,
    XIcon,
    GlobeIcon,
    ViewGridIcon,
    TemplateIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { ChevronDownIcon } from "@heroicons/react/solid";
import logoTransparent from "../../public/images/SlicedAdviceLogoTransparent.svg";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loadUser } from "../../redux/actionCreators/userActions";
import { signOut } from "next-auth/react";
import Flyout from "../Flyout";
import { toast } from "react-toastify";

const navigation = [
    { name: "Explore", href: "/", icon: <GlobeIcon className="text-brand-primary-light"/>, flyout: false },
    {
        name: "Categories",
        href: "/categories",
        flyout: true,
        icon: <ViewGridIcon className="text-brand-primary-light"/>,
        children: [
            {
                name: "Career Growth",
                href: "/categories/careerGrowth",
                description:
                    "Boost your trajectory with expertise from accomplished professionals.",
            },
            {
                name: "College Application",
                href: "/categories/collegeApplication",
                description:
                    "Get guidance on your application from experienced applicants.",
            },
            {
                name: "Personal Development",
                href: "/categories/personalDevelopment",
                description:
                    "Cultivate your ideal life with personal development experts.",
            },
        ],
        headerText: "See all categories",
    },
    {
        name: "Dashboard",
        href: "#",
        flyout: true,
        icon: <TemplateIcon className="text-brand-primary-light"/>,
        children: [
            {
                name: "For Experts",
                href: "/dashboard/expert/home",
                description:
                    "Complete bookings, setup payments, and manage the monetization of your expertise.",
            },
            {
                name: "For Advice Seekers",
                href: "#",
                description: "Review and manage your bookings for expertise.",
            },
        ],
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function TopNav() {
    const dispatch = useAppDispatch();

    const { user, loading, error } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            dispatch(loadUser());
        }
    }, [dispatch, user]);

    const logoutHandler = () => {
        signOut();
    };

    useEffect(() => {
        if (error) {
            // Don't think we actually wanna throw an error
            // anytime the user isn't logged in haha.
            // toast.error(error);
        }
        // if (user) {
        //     console.log("User is: ", user)
        // }
    }, [error, user]);
    return (
        <Disclosure
            as="nav"
            className="bg-brand-bg-light shadow-md sticky top-0 z-10"
        >
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 brand">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary/40">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <MenuIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:justify-start">
                                <div className="flex-shrink-0 flex justify-center items-center mt-1">
                                    <Link href="/">
                                        <a>
                                            <Image
                                                src={logoTransparent}
                                                width={152}
                                                height={36}
                                                alt="SlicedAdvice"
                                            />
                                        </a>
                                    </Link>
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item, index) =>
                                            item.flyout ? (
                                                <Flyout
                                                    name={item.name}
                                                    href={item.href}
                                                    key={item.name}
                                                    children={item.children}
                                                    headerText={item.headerText}
                                                />
                                            ) : (
                                                <Link
                                                    href={item.href}
                                                    key={item.name}
                                                >
                                                    <a className="text-gray-800 hover:bg-brand-primary-light hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="z-0 hidden md:block sm:w-28 md:w-32 lg:w-80">
                                <label htmlFor="search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <SearchIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <input
                                        id="search"
                                        name="search"
                                        className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                                        placeholder="Search for advice..."
                                        type="search"
                                    />
                                </div>
                            </div>
                            {!user ? (
                                <Link href="/login">
                                    <a className="text-gray-800 hover:bg-brand-primary-light hover:text-white sm:ml-2 px-3 py-2 rounded-md text-sm font-medium">
                                        Login
                                    </a>
                                </Link>
                            ) : (
                                <div className="inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {/* <button
                                            type="button"
                                            className="bg-brand-bg-dark p-1 rounded-full text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-primary focus:ring-white"
                                            >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button> */}

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                <span className="sr-only">
                                                    Open user menu
                                                </span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={user.avatar.url}
                                                    alt={`User Profile Pic for ${user.name}`}
                                                />
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
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {/* <Menu.Item>
                                                    {({ active }) => (
                                                        <Link href="/api/me">
                                                            <a
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                )}
                                                            >
                                                                Your Profile
                                                            </a>
                                                        </Link>
                                                    )}
                                                </Menu.Item> */}
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link href="/me/settings/">
                                                            <a
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-gray-100"
                                                                        : "",
                                                                    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                )}
                                                            >
                                                                Account Settings
                                                            </a>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            className={classNames(
                                                                active
                                                                    ? "bg-gray-100"
                                                                    : "",
                                                                "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            )}
                                                            onClick={
                                                                logoutHandler
                                                            }
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            )}
                        </div>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Disclosure.Panel className="sm:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map((item) =>
                                    item.flyout ? (
                                        // NAV ITEMS WITH CHILDREN HERE. GO BELOW FOR NON CHILDREN ITEMS.
                                        <div key={item.name}>
                                            <Link href={item.href}>
                                                <a
                                                    className="flex justify-start align-center gap-2 text-black hover:bg-brand-primary-light hover:text-white focus:bg-brand-primary-light focus:text-white
                                            px-3 py-2 rounded-md text-base font-medium"
                                                >
                                                    <div className="w-7 h-7">
                                                        {item.icon}
                                                    </div>
                                                    <div className="mt-[1px]">
                                                        {item.name}
                                                    </div>
                                                </a>
                                            </Link>

                                            {/* Refactor this someday :) 
                                            This is the children category sections. */}
                                            <Link
                                                href={
                                                    item.children?.at(0)?.href!
                                                        ? item.children?.at(0)
                                                              ?.href!
                                                        : ""
                                                }
                                                key={item.children?.at(0)?.name}
                                            >
                                                <a
                                                    className="text-black hover:bg-brand-primary-light hover:text-white focus:bg-brand-primary-light focus:text-white
                                        block px-3 py-2 rounded-md text-base font-medium ml-12"
                                                >
                                                    {item.children?.at(0)?.name}
                                                </a>
                                            </Link>
                                            <Link
                                                href={
                                                    item.children?.at(1)?.href!
                                                        ? item.children?.at(1)
                                                              ?.href!
                                                        : ""
                                                }
                                                key={item.children?.at(1)?.name}
                                            >
                                                <a
                                                    className="text-black hover:bg-brand-primary-light hover:text-white focus:bg-brand-primary-light focus:text-white
                                    block px-3 py-2 rounded-md text-base font-medium ml-12"
                                                >
                                                    {item.children?.at(1)?.name}
                                                </a>
                                            </Link>
                                            <Link
                                                href={
                                                    item.children?.at(2)?.href!
                                                        ? item.children?.at(2)
                                                              ?.href!
                                                        : ""
                                                }
                                                key={item.children?.at(2)?.name}
                                            >
                                                <a
                                                    className="text-black hover:bg-brand-primary-light hover:text-white focus:bg-brand-primary-light focus:text-white
                                            block px-3 py-2 rounded-md text-base font-medium ml-12"
                                                >
                                                    {item.children?.at(2)?.name}
                                                </a>
                                            </Link>
                                        </div>
                                    ) : (
                                        // ITEMS WITH NO CHILDREN HERE :)
                                        <Link href={item.href} key={item.name}>
                                            <a
                                                className="flex justify-start align-center gap-2 text-black hover:bg-brand-primary-light hover:text-white focus:bg-brand-primary-light focus:text-white
                                            px-3 py-2 rounded-md text-base font-medium"
                                            >
                                                <div className="w-7 h-7">
                                                    {item.icon}
                                                </div>
                                                <div className="mt-[1px]">
                                                    {item.name}
                                                </div>
                                            </a>
                                        </Link>
                                    )
                                )}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    );
}
