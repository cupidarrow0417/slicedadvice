/* This example requires Tailwind CSS v2.0+ */
import {
    NewspaperIcon,
    PhoneIcon,
    SupportIcon,
} from "@heroicons/react/outline";
import UniversalFadeAnimation from "./atoms/UniversalFadeAnimation";
import Image from "next/future/image"

const supportLinks = [
    {
        name: "Instant Support",
        id: "instantSupport",
        description:
            "Our team is available 24/7 via our chat system for any inquiries. Access it anywhere via the widget in the bottom right corner of the page.",
        icon: SupportIcon,
    },
    {
        name: "Email Support",
        id: "emailSupport",
        description:
            "To contact us via email about business inquiries, support, or just to reach out, click the button below to email hello@slicedadvice.com.",
        icon: NewspaperIcon,
    },
    {
        name: "Talk to the founder",
        id: "talkToFounder",
        description:
            "If you have a question about the product or the company, you can reach out to the founder directly via his email, alan@slicedadvice.com.",
        icon: PhoneIcon,
    },
];

export default function Support() {
    return (
        <div className="bg-white">
            <UniversalFadeAnimation>
                {/* Header */}
                <div className="relative pb-32 bg-gray-800">
                    <div className="absolute inset-0">
                        <Image
                            className="w-full h-full object-cover"
                            src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
                            alt=""
                            width={1920}
                            height={1080}
                        />
                        <div
                            className="absolute inset-0 bg-gray-800 mix-blend-multiply"
                            aria-hidden="true"
                        />
                    </div>
                    <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                            Support
                        </h1>
                        <p className="mt-6 max-w-3xl text-xl text-gray-300">
                            Our team is here to help you at any time! Whether
                            it&apos;s personally helping you set up your account,
                            troubleshooting a problem, or just getting in touch,
                            we&apos;re here at any time.
                        </p>
                    </div>
                </div>

                {/* Overlapping cards */}
                <section
                    className="-mt-32 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
                    aria-labelledby="contact-heading"
                >
                    <h2 className="sr-only" id="contact-heading">
                        Contact us
                    </h2>
                    <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
                        {supportLinks.map((link) => (
                            <div
                                key={link.name}
                                className="flex flex-col bg-white rounded-2xl shadow-xl"
                            >
                                <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                                    <div className="absolute top-0 p-5 inline-block bg-brand-primary-light rounded-xl shadow-lg transform -translate-y-1/2">
                                        <link.icon
                                            className="h-6 w-6 text-white"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-900">
                                        {link.name}
                                    </h3>
                                    <p className="mt-4 text-base text-gray-500">
                                        {link.description}
                                    </p>
                                </div>
                                {link.id === "emailSupport" && (
                                    <div className="p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
                                        <a
                                            href="mailto: hello@slicedadvice.com"
                                            className="text-base font-medium text-brand-primary-light hover:text-brand-primary-light/90"
                                        >
                                            Email us
                                            <span aria-hidden="true">
                                                {" "}
                                                &rarr;
                                            </span>
                                        </a>
                                    </div>
                                )}
                                {link.id === "talkToFounder" && (
                                    <div className="p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
                                        <a
                                            href="mailto: alan@slicedadvice.com"
                                            className="text-base font-medium text-brand-primary-light hover:text-brand-primary-light/90"
                                        >
                                            Contact Founder
                                            <span aria-hidden="true">
                                                {" "}
                                                &rarr;
                                            </span>
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </UniversalFadeAnimation>
        </div>
    );
}
