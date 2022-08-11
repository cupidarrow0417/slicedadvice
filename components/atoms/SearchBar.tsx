import { useState, Fragment } from "react";
import { CheckIcon, SearchIcon, SelectorIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Link from "next/link";
import Image from "next/future/image";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [hidePsuedoSearchBar, setHidePsuedoSearchBar] = useState(false);

    function closeModal() {
        setOpenModal(false);
        setHidePsuedoSearchBar(false);
    }

    // For some reason, for my inital search to be there, I need to call search() twice
    // (here and the modal's onFocus event), as the first axios.get ALWAYS fails.
    function openModalHandler() {
        search("advice");
        setHidePsuedoSearchBar(true);
        setOpenModal(true);
    }

    const categories = [
        {
            name: "Engineering",
            href: "/categories/engineering",
            description:
                "Build your dream engineering career with advice from experienced engineers.",
        },
        {
            name: "Business",
            href: "/categories/business",
            description:
                "Grow your business career or your own business with guidance from experienced business professionals.",
        },
        {
            name: "Healthcare",
            href: "/categories/healthcare",
            description:
                "Cultivate your ideal healthcare career with advice from experienced healthcare professionals.",
        },
    ];

    var getResults = async () => {
        try {
            const origin = window.location.origin;
            const { data } = await axios.get(
                `${origin}/api/search/${searchQuery}`
            );
            setSearchResults(data);
        } catch (err) {}
    };

    function search(target: string) {
        setSearchQuery(target);
        getResults();
    }

    return (
        <div className="relative">
            <Combobox as="div" value={""} onChange={() => setSearchResults}>
                    {!hidePsuedoSearchBar && (
                        <div className="relative mt-1 mr-1 lg:mr-3">
                            <Combobox.Input
                                className="z-0 hidden lg:text-sm lg:block lg:w-full lg:max-w-80 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary mr-20"
                                onChange={(event) => search(event.target.value)}
                                onClick={() => openModalHandler()}
                                onFocus={(e: any) => e.target.blur()}
                                placeholder="Search for advice..."
                            />
                            <Combobox.Button className="absolute inset-y-0 -right-1 lg:right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                <SearchIcon
                                    className="h-7 w-7 lg:h-5 lg:w-5 text-gray-400"
                                    aria-hidden="true"
                                    onClick={() => openModalHandler()}
                                />
                            </Combobox.Button>
                        </div>
                    )}
            </Combobox>

            <Transition appear show={openModal} as={Fragment}>
                <Dialog as="div" className="relative z-0" onClose={closeModal}>
                    {/* Transition for background */}
                    <Transition.Child
                        as="div"
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="fixed inset-0 bg-black bg-opacity-25 "
                    ></Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        {/* Entire popout div containing the actual search bar and the instant
                            search results  */}
                        <div className="flex absolute lg:right-24 lg:top-7 xl:right-32 2xl:right-[calc(15vw)] h-fit items-start lg:justify-end text-center">
                            {/* Transition for Dialog.Panel  */}
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="">
                                    {/* Actual search bar  */}
                                    <Combobox
                                        as="div"
                                        value={""}
                                        onChange={() => setSearchResults}
                                    >
                                        <div className="relative top-12 md:top-20 lg:top-0 h-0 lg:mt-[1px] w-screen lg:w-fit">
                                            {/* <Combobox.Button className="lg:hidden rounded-r-md px-2 focus:outline-none">
                                                <ArrowLeftIcon
                                                    className="h-6 w-6 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </Combobox.Button> */}
                                            <Combobox.Input
                                                id="real"
                                                className="z-0 w-11/12 m-2 lg:m-0 lg:text-sm lg:block lg:w-80 rounded-md border shadow-sm focus:border-brand-primary-light focus:outline-none focus:ring-1 focus:ring-brand-primary-light"
                                                onChange={(event) =>
                                                    search(event.target.value)
                                                }
                                                onFocus={(e: any) => {
                                                    search("advice");
                                                    e.target.nextSibling.click();
                                                }}
                                                displayValue={(post: any) =>
                                                    post?.title
                                                }
                                                placeholder="Search for advice..."
                                            />
                                            <Combobox.Button className="absolute inset-y-0 h-fit right-4 top-5 lg:top-2 sm:right-8 md:right-12 lg:right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                                <SearchIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </Combobox.Button>

                                            {searchResults.length > 0 && (
                                                <Fragment>
                                                    <Combobox.Options className="flex flex-col mt-2 lg:absolute z-10 lg:max-h-160 w-11/12 lg:w-full m-auto overflow-auto rounded-md bg-white py-1 text-base lg:shadow-lg lg:ring-1 ring-black ring-opacity-5 focus:outline-none lg:text-sm">
                                                        <Combobox.Label className="font-bold tracking-tight text-xl ml-3 py-2 pr-40 self-start border-b">
                                                            Expertise Posts
                                                        </Combobox.Label>
                                                        {searchResults.map(
                                                            (result: any) => (
                                                                <Combobox.Option
                                                                    key={
                                                                        result._id
                                                                    }
                                                                    value={
                                                                        result.title
                                                                    }
                                                                    className={({
                                                                        active,
                                                                    }) =>
                                                                        classNames(
                                                                            "relative cursor-default select-none py-2 pl-3 pr-2",
                                                                            active
                                                                                ? "bg-brand-primary-light text-white"
                                                                                : "text-gray-900"
                                                                        )
                                                                    }
                                                                >
                                                                    {({
                                                                        active,
                                                                        selected,
                                                                    }) => (
                                                                        <>
                                                                            <Link
                                                                                href={
                                                                                    window
                                                                                        .location
                                                                                        .origin +
                                                                                    "/expertisePost/" +
                                                                                    result._id
                                                                                }
                                                                            >
                                                                                <a>
                                                                                    <div className="flex items-center">
                                                                                        <Image
                                                                                            src={
                                                                                                result
                                                                                                    .images[0]
                                                                                                    .url
                                                                                            }
                                                                                            alt=""
                                                                                            className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                                                                                            width={40}
                                                                                            height={40}
                                                                                        />
                                                                                        <div className="flex flex-col items-start overflow-hidden">
                                                                                            <span
                                                                                                className={classNames(
                                                                                                    "ml-2 truncate",
                                                                                                    selected
                                                                                                        ? "font-bold"
                                                                                                        : "font-semibold"
                                                                                                )}
                                                                                            >
                                                                                                {
                                                                                                    result.title
                                                                                                }
                                                                                            </span>
                                                                                            <p
                                                                                                className={classNames(
                                                                                                    "mt-1 text-sm ml-3 truncate",
                                                                                                    active
                                                                                                        ? "text-white"
                                                                                                        : "text-gray-500"
                                                                                                )}
                                                                                            >
                                                                                                {
                                                                                                    result.description
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    </div>
                                                                                </a>
                                                                            </Link>

                                                                            {selected && (
                                                                                <span
                                                                                    className={classNames(
                                                                                        "absolute inset-y-0 right-0 flex items-center pr-4",
                                                                                        active
                                                                                            ? "text-white"
                                                                                            : "text-brand-primary-light"
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon
                                                                                        className="h-5 w-5"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </Combobox.Option>
                                                            )
                                                        )}
                                                        <Combobox.Label className="font-bold tracking-tight text-xl p-2 ml-2 pr-52 mb-1 self-start border-b">
                                                            Categories
                                                        </Combobox.Label>
                                                        {categories.map(
                                                            (category: any) => (
                                                                <Combobox.Option
                                                                    key={
                                                                        category.name
                                                                    }
                                                                    value={
                                                                        category.name
                                                                    }
                                                                    className={({
                                                                        active,
                                                                    }) =>
                                                                        classNames(
                                                                            "relative cursor-default select-none py-2 pl-3 pr-9",
                                                                            active
                                                                                ? "bg-brand-primary-light text-white"
                                                                                : "text-gray-900"
                                                                        )
                                                                    }
                                                                >
                                                                    {({
                                                                        active,
                                                                        selected,
                                                                    }) => (
                                                                        <>
                                                                            <Link
                                                                                href={
                                                                                    category.href
                                                                                }
                                                                            >
                                                                                <a>
                                                                                    <div className="flex items-center">
                                                                                        {/* <img src={category.images[0].url} alt="" className="h-10 w-10 flex-shrink-0 rounded-full" /> */}
                                                                                        <div className="flex flex-col overflow-hidden">
                                                                                            <span
                                                                                                className={classNames(
                                                                                                    "ml-3 truncate text-lg font-light opacity-80",
                                                                                                    selected
                                                                                                        ? "font-bold"
                                                                                                        : "font-semibold"
                                                                                                )}
                                                                                            >
                                                                                                {
                                                                                                    category.name
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </a>
                                                                            </Link>

                                                                            {selected && (
                                                                                <span
                                                                                    className={classNames(
                                                                                        "absolute inset-y-0 right-0 flex items-center pr-4",
                                                                                        active
                                                                                            ? "text-white"
                                                                                            : "text-brand-primary-light"
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon
                                                                                        className="h-5 w-5"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </Combobox.Option>
                                                            )
                                                        )}
                                                    </Combobox.Options>
                                                </Fragment>
                                            )}
                                        </div>
                                    </Combobox>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
