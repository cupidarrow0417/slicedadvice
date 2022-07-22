import React from "react";
import UniversalFadeAnimation from "./atoms/UniversalFadeAnimation";
// import HomePageHeroSectionScreenshot from '../public/images/appScreenshots/HomePageHeroSectionScreenshot.png';
import BookingsPageScreenshot from "../public/images/appScreenshots/BookingsPageScreenshot.png";
import ExpertisePostPageScreenshot from "../public/images/appScreenshots/ExpertisePostPageScreenshot.png";
import BookingsPageMobileScreenshot from "../public/images/appScreenshots/BookingsPageMobileScreenshot.png";
import StripeExpressPageScreenshot from "../public/images/appScreenshots/StripeExpressPageScreenshot.png";
import {
    AnnotationIcon,
    GlobeAltIcon,
    InboxIcon,
    LightningBoltIcon,
    ScaleIcon,
    SparklesIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/future/image";

const features = [
    {
        name: "Bite-sized advice format",
        description:
            "In our marketplace, advice seekers only ask short, focused, and important questions, and experts only answer with concise, relevant, and personalized advice.",
        icon: ScaleIcon,
    },
    {
        name: "Showcase your expertise",
        description:
            "Create easily discoverable expertise posts that showcase your knowledge to the entire world. In a few seconds, advice seekers can book paid advice from you.",
        icon: GlobeAltIcon,
    },
    {
        name: "Handling bookings",
        description:
            "Offering advice for pay is as easy as answering an email. We handle the bookings and payments for you, so you can focus on your advice.",
        icon: AnnotationIcon,
    },
    {
        name: "Secure payments",
        description:
            "We use Stripe to process and route payments to your bank account securely and safely.",
        icon: LightningBoltIcon,
    },
];

export default function Experts() {
    return (
        <div className="flex flex-col gap-24">
            <UniversalFadeAnimation>
                <section className="lg:relative">
                    <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
                        <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                                <span className="block xl:inline">
                                    Give advice, help others,
                                </span>{" "}
                                <span className="block text-brand-primary-light xl:inline">
                                    get paid.
                                </span>
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                                Join our thriving advice marketplace and
                                leverage our full suite of tools to conveniently
                                make money online.
                            </p>
                            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                                <div className="">
                                    <Link href="/dashboard/expert/home">
                                        <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-primary-light hover:bg-brand-primary-light/90 md:text-lg md:px-10 shadow">
                                            Get started
                                        </a>
                                    </Link>
                                </div>
                                {/* <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <a
                                        href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-primary-light bg-white hover:bg-gray-50 md:text-lg md:px-10 shadow"
                                    >
                                        Live demo
                                    </a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
                        <Image
                            className="absolute inset-0 w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
                            alt=""
                            width="2102"
                            height="1300"
                            priority={true}
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
                            We believe that monetizing your expertise should be
                            as simple as answering a single question. We created
                            a focused marketplace and a full suite of tools to
                            make that a reality.
                        </p>
                    </div>

                    <div className="mt-10">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-brand-primary-light text-white">
                                            <feature.icon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                            {feature.name}
                                        </p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">
                                        {feature.description}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>
                <section className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
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
                                    Bite-sized advice format
                                </h2>
                                <p className="mt-4 text-lg text-gray-500">
                                    Making money online is difficult,
                                    time-consuming, and stressful.{" "}
                                    <span className="line-through">
                                        Building and teaching an entire course.
                                        Creating and running a viral social
                                        media page. Long consulting meetings.
                                        Tedious freelance projects.
                                    </span>{" "}
                                    It should be as easy as concisely answering
                                    a single important, impactful question using
                                    your unique experience and knowledge.
                                </p>
                                <div className="mt-6">
                                    <Link href="/dashboard/expert/home">
                                        <a className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary-light hover:bg-brand-primary-light/90">
                                            Get started
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <blockquote>
                                <div>
                                    <p className="text-base text-gray-500">
                                        &ldquo;The world&apos;s most valuable,
                                        important knowledge is trapped within
                                        the minds of the world&apos;s busiest
                                        people. SlicedAdvice is here to help you
                                        slice and serve that knowledge to
                                        everyone, so you can conveniently earn
                                        money through your knowledge.&rdquo;
                                    </p>
                                </div>
                                <footer className="mt-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <Image
                                                className="h-6 w-6 rounded-full"
                                                src="/images/team/AlanHeadshot.jpg"
                                                alt=""
                                                width={24}
                                                height={24}
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
                            <Image
                                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                src={BookingsPageScreenshot.src}
                                alt="Screenshot of Bookings Page"
                                width={BookingsPageScreenshot.width}
                                height={BookingsPageScreenshot.height}
                            />
                        </div>
                    </div>
                </section>
                <section className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
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
                                    Showcase your expertise
                                </h2>
                                <p className="mt-4 text-lg text-gray-500">
                                    An expertise post is a beautiful, convenient
                                    way to offer your valuable experience and
                                    knowledge to the world. You set your own
                                    prices. Create multiple posts for all of the
                                    different areas of your expertise.
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
                            <Image
                                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                                src={ExpertisePostPageScreenshot.src}
                                alt="Expertise Post Screenshot"
                                width={ExpertisePostPageScreenshot.width}
                                height={ExpertisePostPageScreenshot.height}
                            />
                        </div>
                    </div>
                </section>
                <section className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-10">
                    <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                        <div>
                            <div>
                                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-brand-primary-light">
                                    <AnnotationIcon
                                        className="h-6 w-6 text-white"
                                        aria-hidden="true"
                                    />
                                </span>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                                    Handling bookings
                                </h2>
                                <p className="mt-4 text-lg text-gray-500">
                                    Once you set up your posts, we handle it
                                    all. The moment an advice seeker books you
                                    for advice, you receive a notification to
                                    answer their question. All you need to do is
                                    bring your experience and knowledge.
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
                        {/* <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full"> */}
                        <Image
                            className="w-auto sm:w-1/2 mx-auto rounded-xl lg:left-20 lg:-top-32 lg:w-[80%] lg:max-w-none xl:left-32 lg:pl-4 lg:-mr-48 lg:px-0 lg:m-0 lg:relative"
                            src={BookingsPageMobileScreenshot.src}
                            alt="Mobile Bookings Page"
                            width={BookingsPageMobileScreenshot.width}
                            height={BookingsPageMobileScreenshot.height}
                        />
                        {/* </div> */}
                    </div>
                </section>
                <section className="lg:-mt-52 lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                    <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
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
                                    Fast and secure payments
                                </h2>
                                <p className="mt-4 text-lg text-gray-500">
                                    SlicedAdvice partners with Stripe to offer
                                    fast, secure payments to your bank account.
                                    You can be rest assured that payouts will be
                                    securely routed the moment you complete an
                                    advice booking.
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
                            <Image
                                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                                src={StripeExpressPageScreenshot.src}
                                alt="Stripe Express Page Screenshot"
                                width={StripeExpressPageScreenshot.width}
                                height={StripeExpressPageScreenshot.height}
                            />
                        </div>
                    </div>
                </section>
                <div className="bg-brand-primary-light/5">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                            <span className="block">Ready to dive in?</span>
                            <span className="block text-brand-primary-light">
                                Become an expert today.
                            </span>
                        </h2>
                        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                            <div className="inline-flex rounded-md shadow">
                                <Link href="/dashboard/expert/home">
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
