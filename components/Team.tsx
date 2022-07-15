import React from "react";
import UniversalFadeAnimation from "./atoms/UniversalFadeAnimation";
import AlanProfessionalHeadshot from "../public/images/team/AlanProfessionalHeadshot.jpeg";
import AlecHeadshot from "../public/images/team/AlecHeadshot.png";
import WesleyPicture from "../public/images/team/WesleyPicture.jpg";
import FernandoHeadshot from "../public/images/team/FernandoHeadshot.jpeg";
import Image from "next/image";

const people = [
    {
        name: "Alan Duong",
        role: "Founder and CEO, Engineer, Designer",
        image: AlanProfessionalHeadshot,
        bio: "Hey! I'm Alan, the founder of SlicedAdvice. I bootstrapped this company from the ground up and currently lead the team on all fronts: engineering, marketing, and design.",
        twitterUrl: "#",
        linkedinUrl: "https://www.linkedin.com/in/alan-duong-547095199/",
    },
    {
        name: "Alec Reiss",
        role: "Chief Operating Officer",
        image: AlecHeadshot,
        bio: "Hello! I'm Alec, the COO of SlicedAdvice. I lead the company's marketing strategy, work on growth initiatives, and on product design.",
        twitterUrl: "#",
        linkedinUrl: "https://www.linkedin.com/in/alec-reiss-7b844a194/",
    },
    {
        name: "Fernando Cuello-Garcia",
        role: "Full Stack Engineer",
        image: FernandoHeadshot,
        bio: "Hey! I'm Fernando! I'm a full stack engineer for SlicedAdvice, developing the product's backend and frontend. ",
        twitterUrl: "#",
        linkedinUrl: "https://www.linkedin.com/in/fernando-cuello-garcia/",
    },
    {
        name: "Wesley Le",
        role: "Marketing Intern",
        image: WesleyPicture,
        bio: "Hi! I'm Wesley, rising junior at Texas A&M and marketing intern for SlicedAdvice. I help with outreach, social media, and marketing ideation.",
        twitterUrl: "#",
        linkedinUrl: "#",
    },
    // More people...
];
export default function Team() {
    return (
        <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
            <UniversalFadeAnimation>
                <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
                    <div className="space-y-5 sm:space-y-4">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Our Team
                        </h2>
                        <p className="text-xl text-gray-500">
                            We're a small team on a big mission to slice and
                            serve the world's most important, inaccessible
                            knowledge to everyone.
                        </p>
                    </div>
                    <div className="lg:col-span-2">
                        <ul
                            role="list"
                            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
                        >
                            {people.map((person) => (
                                <li key={person.name}>
                                    <div className="space-y-4">
                                        <div className="aspect-w-3 aspect-h-2">
                                            {person.image && (
                                                <Image
                                                    className="object-cover shadow-lg rounded-lg"
                                                    layout="fill"
                                                    src={person?.image?.src!}
                                                    alt=""
                                                />
                                            )}
                                        </div>
                                        <div className="text-lg leading-6 font-medium space-y-1">
                                            <h3>{person.name}</h3>
                                            <p className="text-brand-primary-light">
                                                {person.role}
                                            </p>
                                        </div>
                                        <div className="text-lg">
                                            <p className="text-gray-500">
                                                {person.bio}
                                            </p>
                                        </div>

                                        <ul
                                            role="list"
                                            className="flex space-x-5"
                                        >
                                            {/* <li>
                                            <a
                                                href={person.twitterUrl}
                                                className="text-gray-400 hover:text-gray-500"
                                            >
                                                <span className="sr-only">
                                                    Twitter
                                                </span>
                                                <svg
                                                    className="w-5 h-5"
                                                    aria-hidden="true"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                                </svg>
                                            </a>
                                        </li> */}
                                            <li>
                                                <a
                                                    href={person.linkedinUrl}
                                                    target="_blank"
                                                    className="text-gray-400 hover:text-gray-500"
                                                >
                                                    <span className="sr-only">
                                                        LinkedIn
                                                    </span>
                                                    <svg
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </UniversalFadeAnimation>
        </div>
    );
}
