import React from "react";
import UniversalFadeAnimation from "./atoms/UniversalFadeAnimation";
import AlanHeadshot from "../public/images/team/AlanHeadshot.jpg";
import {
    AnnotationIcon,
    GlobeAltIcon,
    InboxIcon,
    LightningBoltIcon,
    ScaleIcon,
    SparklesIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

export default function AdviceSeekers() {
    return (
        <div className="flex flex-col gap-20 ">
            <UniversalFadeAnimation>
                <section className="lg:relative">
                    <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
                        <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                                <span className="block xl:inline">
                                    Get affordable,
                                </span>{" "}
                                <span className="block text-brand-primary-light xl:inline">
                                    personalized advice.
                                </span>
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl"></p>
                            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                                <div className="">
                                    <Link href="/categories">
                                        <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary-light hover:bg-brand-primary-light/90 md:text-lg md:px-10 shadow">
                                            Get started
                                        </a>
                                    </Link>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <a
                                        href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-primary-light bg-white hover:bg-gray-50 md:text-lg md:px-10 shadow"
                                    >
                                        Live demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
                        <img
                            className="absolute inset-0 w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                            alt=""
                        />
                    </div>
                </section>
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-brand-primary-light font-semibold tracking-wide uppercase">
                            Product
                        </h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            A marketplace of bite-sized life advice.
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            We believe that changing your life begins
                            with asking single, impactful question to the right
                            expert. We created a focused marketplace to make
                            that a reality. It's as easy as 1-2-3!
                        </p>
                    </div>
                </section>

                <section className="relative">
                    <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                        <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                            <div>
                                <div>
                                    <span className="h-12 w-12 rounded-md flex items-center justify-center bg-brand-primary-light">
                                        <ScaleIcon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                        Browse the feed of advice
                                    </h2>
                                    <p className="mt-4 text-lg text-gray-500">
                                        Whether it's career growth advice,
                                        personal development tips, and more, our
                                        vetted, experienced experts are here to
                                        help you in any way you need.
                                    </p>
                                    <div className="mt-6">
                                        <a
                                            href="/categories"
                                            className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary-light hover:bg-indigo-700"
                                        >
                                            Browse Advice
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 border-t border-gray-200 pt-6">
                                <blockquote>
                                    <div>
                                        <p className="text-base text-gray-500">
                                            &ldquo;The world's most valuable,
                                            important knowledge is trapped within
                                            the minds of the world's busiest
                                            people. SlicedAdvice is here to
                                            slice and serve that knowledge to
                                            you. &rdquo;
                                        </p>
                                    </div>
                                    <footer className="mt-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-6 w-6 rounded-full"
                                                    src={AlanHeadshot.src}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="text-base font-medium text-gray-700">
                                                Alan Duong, Founder and CEO
                                            </div>
                                        </div>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                        <div className="mt-12 sm:mt-16 lg:mt-0">
                            <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                                <img
                                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                    src="https://tailwindui.com/img/component-images/inbox-app-screenshot-1.jpg"
                                    alt="Inbox user interface"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-12">
                    <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                        <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                            <div>
                                <div>
                                    <span className="h-12 w-12 rounded-md flex items-center justify-center bg-brand-primary-light">
                                        <GlobeAltIcon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                        Ask your important question
                                    </h2>
                                    <p className="mt-4 text-lg text-gray-500">
                                        When you find the right expert for you,
                                        tap into their knowledge in the most
                                        accessible, affordable way possible: by
                                        asking an important, personal question.
                                    </p>
                                    {/* <div className="mt-6">
                                        <a
                                            href="#"
                                            className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary-light hover:bg-indigo-700"
                                        >
                                            Get started
                                        </a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                            <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                                <img
                                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                                    src="https://tailwindui.com/img/component-images/inbox-app-screenshot-2.jpg"
                                    alt="Customer profile user interface"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative">
                    <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                        <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                            <div>
                                <div>
                                    <span className="h-12 w-12 rounded-md flex items-center justify-center bg-brand-primary-light">
                                        <LightningBoltIcon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                        Get personalized advice quickly
                                    </h2>
                                    <p className="mt-4 text-lg text-gray-500">
                                        Your expert will answer within 7 days,
                                        or you'll never even be charged. Your
                                        advice will be personalized to your
                                        specific situation.
                                    </p>
                                    {/* <div className="mt-6">
                                        <a
                                            href="#"
                                            className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary-light hover:bg-indigo-700"
                                        >
                                            Get started
                                        </a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 sm:mt-16 lg:mt-0">
                            <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                                <img
                                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                    src="https://tailwindui.com/img/component-images/inbox-app-screenshot-1.jpg"
                                    alt="Inbox user interface"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="bg-brand-primary-light/5">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                            <span className="block">Ready to dive in?</span>
                            <span className="block text-brand-primary-light">
                                Book personalized advice today.
                            </span>
                        </h2>
                        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                            <div className="inline-flex rounded-md shadow">
                                <Link href="/categories">
                                    <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary-light hover:bg-brand-primary-light/90">
                                        Get started
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </UniversalFadeAnimation>
        </div>
    );
}
