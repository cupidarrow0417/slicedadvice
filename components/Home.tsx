import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
    MenuIcon,
    SearchIcon,
    ShoppingBagIcon,
    XIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import PageHeader from "./atoms/PageHeader";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { clearErrors } from "../redux/actionCreators/expertisePostActions";
import SingleShelf from "./atoms/SingleShelf";
import ExpertisePostCard from "./expertisePost/ExpertisePostCard";
import Image from "next/future/image";
import UniversalFadeAnimation from "./atoms/UniversalFadeAnimation";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function Home({
    engineeringExpertisePosts,
    businessExpertisePosts,
    healthcareExpertisePosts,
}: any) {

    return (
        <div className="bg-white">
            <UniversalFadeAnimation>
                <PageHeader
                    heroPhrase={"Life changing career advice, by the slice."}
                    supportingText={
                        "Join our marketplace of bite-sized career advice, one that's affordable for advice seekers and convenient for busy experts."
                    }
                >
                    <Link href="/categories">
                        <a className="inline-block text-center bg-brand-primary-light border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-brand-primary-light/90">
                            Browse Advice
                        </a>
                    </Link>
                    <Link href="/experts">
                        <a className="w-fit inline-block text-center bg-black border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-black/80">
                            Give Advice
                        </a>
                    </Link>
                </PageHeader>

                {/* Category section */}
                <section
                    aria-labelledby="category-heading"
                    className="bg-gray-50"
                >
                    <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-baseline sm:justify-between">
                            <h2
                                id="category-heading"
                                className="text-2xl font-extrabold tracking-tight text-gray-900"
                            >
                                Browse by Category
                            </h2>
                            <Link href="/categories">
                                <a className="hidden text-sm font-semibold text-brand-primary-light hover:text-brand-primary-light/90 sm:block">
                                    Browse all categories
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </Link>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                            <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
                                <Image
                                    src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=20"
                                    alt="A group of engineers working on their project in a lab."
                                    className="object-center object-cover group-hover:opacity-75"
                                    width={500}
                                    height={500}
                                    sizes="(max-width: 767px) 250px, 700px"
                                />
                                <div
                                    aria-hidden="true"
                                    className="bg-gradient-to-b from-transparent to-black opacity-50"
                                />
                                <div className="p-6 flex items-end">
                                    <div>
                                        <h3 className="font-semibold text-white">
                                            <Link href="/categories/engineering">
                                                <a>
                                                    <span className="absolute inset-0" />
                                                    Engineering
                                                </a>
                                            </Link>
                                        </h3>
                                        <p
                                            aria-hidden="true"
                                            className="mt-1 text-sm text-white"
                                        >
                                            Ask now
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
                                <Image
                                    src="https://images.unsplash.com/photo-1573497701240-345a300b8d36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=20"
                                    alt="A group of business professionals talking at a table."
                                    className="object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"
                                    width={700}
                                    height={700}
                                    sizes="(max-width: 767px) 250px, 700px"
                                />
                                <div
                                    aria-hidden="true"
                                    className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                                />
                                <div className="p-6 flex items-end sm:absolute sm:inset-0">
                                    <div>
                                        <h3 className="font-semibold text-white">
                                            <Link href="/categories/business">
                                                <a>
                                                    <span className="absolute inset-0" />
                                                    Business
                                                </a>
                                            </Link>
                                        </h3>
                                        <p
                                            aria-hidden="true"
                                            className="mt-1 text-sm text-white"
                                        >
                                            Ask now
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="group aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full">
                                <Image
                                    src="https://images.unsplash.com/photo-1631558556874-1d127211f574?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=20"
                                    alt="A doctor talking to a patient in a hospital."
                                    className="object-center object-cover group-hover:opacity-75 sm:absolute sm:inset-0 sm:w-full sm:h-full"
                                    width={700}
                                    height={700}
                                    sizes="(max-width: 767px) 250px, 700px"
                                />
                                <div
                                    aria-hidden="true"
                                    className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                                />
                                <div className="p-6 flex items-end sm:absolute sm:inset-0">
                                    <div>
                                        <h3 className="font-semibold text-white">
                                            <Link href="/categories/healthcare">
                                                <a>
                                                    <span className="absolute inset-0" />
                                                    Healthcare
                                                </a>
                                            </Link>
                                        </h3>
                                        <p
                                            aria-hidden="true"
                                            className="mt-1 text-sm text-white"
                                        >
                                            Ask now
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 sm:hidden">
                            <Link href="/categories">
                                <a className="block text-sm font-semibold text-brand-primary-light hover:text-brand-primary-light/90">
                                    Browse all categories
                                    <span aria-hidden="true"> &rarr;</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Featured section */}
                <section className="flex flex-col gap-10 my-20">
                    <SingleShelf
                        title="Engineering"
                        link="/categories/engineering"
                    >
                        {engineeringExpertisePosts &&
                            engineeringExpertisePosts.map(
                                (expertisePost: any) => (
                                    <ExpertisePostCard
                                        key={expertisePost._id}
                                        expertisePost={expertisePost}
                                    />
                                )
                            )}
                    </SingleShelf>
                    <SingleShelf
                        title="Business"
                        link="/categories/business"
                    >
                        {businessExpertisePosts &&
                            businessExpertisePosts.map(
                                (expertisePost: any) => (
                                    <ExpertisePostCard
                                        key={expertisePost._id}
                                        expertisePost={expertisePost}
                                    />
                                )
                            )}
                    </SingleShelf>
                    <SingleShelf
                        title="Healthcare"
                        link="/categories/healthcare"
                    >
                        {healthcareExpertisePosts &&
                            healthcareExpertisePosts.map(
                                (expertisePost: any) => (
                                    <ExpertisePostCard
                                        key={expertisePost._id}
                                        expertisePost={expertisePost}
                                    />
                                )
                            )}
                    </SingleShelf>
                </section>
                <section aria-labelledby="cause-heading">
                    <div className="relative bg-gray-800 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
                        <div className="absolute inset-0 overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1535227798054-e4373ef3795a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1462&q=20"
                                alt=""
                                className="w-full h-full object-center object-cover"
                                width={500}
                                height={500}
                            />
                        </div>
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gray-900 bg-opacity-50"
                        />
                        <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
                            <h2
                                id="cause-heading"
                                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                            >
                                Our Mission
                            </h2>
                            <p className="mt-3 text-xl text-white">
                                We&apos;re on a mission to slice and serve the
                                world&apos;s most important, inaccessible
                                knowledge to everyone. We envision a world where
                                everyone can get personalized advice from anyone
                                for a fair price.
                            </p>
                            <Link href="/team">
                                <a className="mt-8 w-full block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto">
                                    Meet the team
                                </a>
                            </Link>
                        </div>
                    </div>
                </section>
                {/* Favorites section */}
                {/* <section aria-labelledby="favorites-heading">
                    <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-baseline sm:justify-between">
                            <h2
                                id="favorites-heading"
                                className="text-2xl font-extrabold tracking-tight text-gray-900"
                            >
                                Our Favorites
                            </h2>
                            <a
                                href="#"
                                className="hidden text-sm font-semibold text-brand-primary-light hover:text-brand-primary-light/90 sm:block"
                            >
                                Browse all favorites
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
                            {favorites.map((favorite) => (
                                <div
                                    key={favorite.id}
                                    className="group relative"
                                >
                                    <div className="w-full h-96 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
                                        <img
                                            src={favorite.imageSrc}
                                            alt={favorite.imageAlt}
                                            className="w-full h-full object-center object-cover"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-base font-semibold text-gray-900">
                                        <a href={favorite.href}>
                                            <span className="absolute inset-0" />
                                            {favorite.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {favorite.price}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 sm:hidden">
                            <a
                                href="#"
                                className="block text-sm font-semibold text-brand-primary-light hover:text-brand-primary-light/90"
                            >
                                Browse all favorites
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </div>
                    </div>
                </section> */}

                {/* CTA section */}
                <section aria-labelledby="sale-heading">
                    <div className="mt-14 pt-32 overflow-hidden sm:pt-14">
                        <div className="bg-gray-800">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="relative pt-48 pb-16 sm:pb-24">
                                    <div className="max-w-sm sm:max-w-xs lg:max-w-lg">
                                        <h2
                                            id="sale-heading"
                                            className="text-4xl font-extrabold tracking-tight text-white md:text-5xl"
                                        >
                                            Your knowledge is valuable.
                                            <br />
                                            Join us as an expert.
                                        </h2>
                                        <div className="mt-6 text-base">
                                            <Link href="/experts">
                                                <a className="font-semibold text-white">
                                                    Learn more
                                                    <span aria-hidden="true">
                                                        {" "}
                                                        &rarr;
                                                    </span>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="ml-8 md:ml-0 absolute -top-32 left-1/2 transform -translate-x-1/2 sm:top-6 sm:translate-x-0">
                                        <div className="ml-24 flex space-x-6 min-w-max sm:ml-3 lg:space-x-8">
                                            <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                                <div className="flex-shrink-0">
                                                    <Image
                                                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                        src="https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2882&q=20"
                                                        alt=""
                                                        height={256}
                                                        width={256}
                                                    />
                                                </div>

                                                <div className="mt-6 flex-shrink-0 sm:mt-0">
                                                    <Image
                                                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=10"
                                                        alt=""
                                                        height={256}
                                                        width={256}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                                <div className="flex-shrink-0">
                                                    <Image
                                                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                        src="https://images.unsplash.com/photo-1639747277258-28312ae9505b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=10"
                                                        alt=""
                                                        height={256}
                                                        width={256}
                                                    />
                                                </div>

                                                <div className="mt-6 flex-shrink-0 sm:mt-0">
                                                    <Image
                                                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                        src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=10"
                                                        alt=""
                                                        height={256}
                                                        width={256}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                                                <div className="flex-shrink-0">
                                                    <Image
                                                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                        src="https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=10"
                                                        alt=""
                                                        height={256}
                                                        width={256}
                                                    />
                                                </div>

                                                <div className="mt-6 flex-shrink-0 sm:mt-0">
                                                    <Image
                                                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                                                        src="https://images.unsplash.com/photo-1589386417686-0d34b5903d23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=10"
                                                        alt=""
                                                        height={256}
                                                        width={256}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </UniversalFadeAnimation>
        </div>
    );
}
