import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Head from "next/head";
import { toast } from "react-toastify";
import { StarIcon } from "@heroicons/react/solid";
import { clearErrors } from "../../redux/actions/expertisePostActions";

import Breadcrumbs from "../Breadcrumbs";
import Image from "next/image";
import RatingsWidget from "../RatingsWidget";

const ExpertisePostDetails = () => {
    const dispatch = useAppDispatch();
    const { expertisePost, error } = useAppSelector(
        (state) => state.expertisePostDetails
    );

    const getCategoryHref = (categoryName: string) => {
        switch (categoryName) {
            case "Career Growth":
                return "/categories/careerGrowth";
            case "College Application":
                return "/categories/collegeApplication";
            case "Personal Development":
                return "/categories/personalDevelopment";
            case "Other":
                return "/categories/other";
            default:
                return "#";
        }
    };

    // Used for the Breadcrumbs component
    const pages = [
        {
            name: expertisePost?.category,
            href: getCategoryHref(expertisePost?.category),
            current: false,
        },
    ];

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [error]);
    return (
        <div className="">
            <Head>
                <title>{expertisePost?.title} | SlicedAdvice</title>
            </Head>
            <div className="flex flex-col items-start gap-5 px-4 py-4 max-w-2xl lg:max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Breadcrumbs pages={pages} />
                <h1 className="text-2xl font-semibold">
                    {expertisePost["title"]}
                </h1>
                <RatingsWidget expertisePost={expertisePost} />

                <div className="flex flex-col lg:flex-row justify-start lg:justify-around items-start w-full gap-7 lg:-mt-2">
                    <div className="expertisePostDetailImageWrapper w-4/5 max-w-lg self-center">
                        {expertisePost["images"][0] && (
                            <Image
                                src={expertisePost["images"][0]["url"]}
                                layout="responsive"
                                width={1.5}
                                height={1}
                                alt="Picture for expertise posting"
                            />
                        )}
                    </div>
                    <div className="flex flex-col gap-5 self-start w-full h-full md:max-w-2xl mx-auto">
                        <h1 className="text-xl font-medium">Description</h1>
                        <p className="font-light opacity-60 -mt-2">
                            {expertisePost["description"]}
                        </p>
                        {/* Line Break */}
                        <div className="w-full m-auto h-[1px] bg-black/10"></div>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="flex flex-col justify-center items-center gap-4 p-8 w-full sm:w-1/2 sm:h-60 rounded-xl border-[1px] border-black/10">
                                <p className="text-sm font-light">
                                    Bite-sized submissions might include:
                                </p>
                                <ul className="list-disc">
                                    {expertisePost["submissionTypes"].map(
                                        (type: string, index: number) => (
                                            <li
                                                className="text-xl font-semibold"
                                                key={index}
                                            >
                                                {type}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-4 p-8 w-full sm:w-1/2 sm:h-60 bg-white rounded-xl border-[1px] border-black/10 shadow-md">
                                {/* Pricing Statement Header Grouping */}
                                <div className="flex items-center gap-1">
                                    <h1 className="text-2xl font-semibold self-start ">
                                        ${expertisePost["pricePerSubmission"]}{" "}
                                    </h1>
                                    <span className="text-md mt-[2px] font-light opacity-60">
                                        / submission
                                    </span>
                                </div>
                                <p className="text-sm font-light text-center opacity-60">
                                    You'll get a response within 7 days, or
                                    you'll never be charged.
                                </p>
                                <button className="bg-brand-primary-light rounded-lg text-white w-full py-3 text-lg flex justify-center items-center">
                                    Send Submission
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Section */}
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:py-32 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
                <div className="lg:col-span-4">
                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                        Customer Reviews
                    </h2>

                    <div className="mt-3 flex items-center">
                        <div>
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                        key={rating}
                                        className={classNames(
                                            reviews.average > rating
                                                ? "text-yellow-400"
                                                : "text-gray-300",
                                            "flex-shrink-0 h-5 w-5"
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <p className="sr-only">
                                {reviews.average} out of 5 stars
                            </p>
                        </div>
                        <p className="ml-2 text-sm text-gray-900">
                            Based on {reviews.totalCount} reviews
                        </p>
                    </div>

                    <div className="mt-6">
                        <h3 className="sr-only">Review data</h3>

                        <dl className="space-y-3">
                            {reviews.counts.map((count) => (
                                <div
                                    key={count.rating}
                                    className="flex items-center text-sm"
                                >
                                    <dt className="flex-1 flex items-center">
                                        <p className="w-3 font-medium text-gray-900">
                                            {count.rating}
                                            <span className="sr-only">
                                                {" "}
                                                star reviews
                                            </span>
                                        </p>
                                        <div
                                            aria-hidden="true"
                                            className="ml-1 flex-1 flex items-center"
                                        >
                                            <StarIcon
                                                className={classNames(
                                                    count.count > 0
                                                        ? "text-yellow-400"
                                                        : "text-gray-300",
                                                    "flex-shrink-0 h-5 w-5"
                                                )}
                                                aria-hidden="true"
                                            />

                                            <div className="ml-3 relative flex-1">
                                                <div className="h-3 bg-gray-100 border border-gray-200 rounded-full" />
                                                {count.count > 0 ? (
                                                    <div
                                                        className="absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full"
                                                        style={{
                                                            width: `calc(${count.count} / ${reviews.totalCount} * 100%)`,
                                                        }}
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    </dt>
                                    <dd className="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">
                                        {Math.round(
                                            (count.count / reviews.totalCount) *
                                                100
                                        )}
                                        %
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-lg font-medium text-gray-900">
                            Share your thoughts
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                            If you’ve been helped by this expert, share your
                            thoughts with other customers
                        </p>

                        <a
                            href="#"
                            className="mt-6 inline-flex w-full bg-white border border-gray-300 rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                        >
                            Write a review
                        </a>
                    </div>
                </div>

                <div className="mt-16 lg:mt-0 lg:col-start-6 lg:col-span-7">
                    <h3 className="sr-only">Recent reviews</h3>

                    <div className="flow-root">
                        <div className="-my-12 divide-y divide-gray-200">
                            {reviews.featured.map((review) => (
                                <div key={review.id} className="py-12">
                                    <div className="flex items-center">
                                        <img
                                            src={review.avatarSrc}
                                            alt={`${review.author}.`}
                                            className="h-12 w-12 rounded-full"
                                        />
                                        <div className="ml-4">
                                            <h4 className="text-sm font-bold text-gray-900">
                                                {review.author}
                                            </h4>
                                            <div className="mt-1 flex items-center">
                                                {[0, 1, 2, 3, 4].map(
                                                    (rating) => (
                                                        <StarIcon
                                                            key={rating}
                                                            className={classNames(
                                                                review.rating >
                                                                    rating
                                                                    ? "text-yellow-400"
                                                                    : "text-gray-300",
                                                                "h-5 w-5 flex-shrink-0"
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <p className="sr-only">
                                                {review.rating} out of 5 stars
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className="mt-4 space-y-6 text-base italic text-gray-600"
                                        dangerouslySetInnerHTML={{
                                            __html: review.content,
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Given an array of classes, return a string of space-separated classes
 * @param {any[]} classes - An array of class names to be added to the class list.
 * @returns A string of all the classes that were passed in.
 */
function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

const reviews = {
    average: 4,
    totalCount: 1624,
    counts: [
        { rating: 5, count: 1019 },
        { rating: 4, count: 162 },
        { rating: 3, count: 97 },
        { rating: 2, count: 199 },
        { rating: 1, count: 147 },
    ],
    featured: [
        {
            id: 1,
            rating: 5,
            content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
            author: "Emily Selman",
            avatarSrc:
                "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
        },
        {
            id: 2,
            rating: 4,
            content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
            author: "Emily Selman",
            avatarSrc:
                "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
        },
        {
            id: 3,
            rating: 5,
            content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
            author: "Emily Selman",
            avatarSrc:
                "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
        },
        // More reviews...
    ],
};

export default ExpertisePostDetails;
