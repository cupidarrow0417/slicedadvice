import Link from "next/link";
import React from "react";
import Image from "next/future/image"

interface PageHeaderInterface {
    heroPhrase: string;
    supportingText: string;
    children: any;
}

const PageHeader = ({
    heroPhrase,
    supportingText,
    children,
}: PageHeaderInterface) => {
    return (
        <header className="relative overflow-hidden">
            {/* Hero section */}
            <div className="-mt-14 pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
                    <div className="sm:max-w-lg">
                        <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                            {heroPhrase}
                        </h1>
                        <p className="mt-4 text-xl font-base text-gray-500">
                            {supportingText}
                        </p>
                    </div>
                    <div>
                        <div className="mt-10">
                            {/* Decorative image grid */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
                            >
                                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                    <div className="flex items-center space-x-6 lg:space-x-8">
                                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2882&q=80"
                                                    alt=""
                                                    className="w-full h-full object-center object-cover"
                                                    width={2882}
                                                    height={2882}
                                                    priority={true}
                                                />
                                            </div>
                                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1573496799515-eebbb63814f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
                                                    alt=""
                                                    className="w-full h-full object-center object-cover"
                                                    width={1469}
                                                    height={1469}
                                                    priority={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                                    alt=""
                                                    className="w-full h-full object-center object-cover"
                                                    width={1470}
                                                    height={1470}
                                                    priority={true}
                                                />
                                            </div>
                                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1639747277258-28312ae9505b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                                    alt=""
                                                    className="w-full h-full object-center object-cover"
                                                    width={687}
                                                    height={687}
                                                    priority={true}
                                                />
                                            </div>
                                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                                    alt=""
                                                    className="w-full h-full object-center object-cover"
                                                    width={1470}
                                                    height={1470}
                                                    priority={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                                                    alt=""
                                                    className="w-full h-full object-center object-cover"
                                                    width={687}
                                                    height={687}
                                                    priority={true}
                                                />
                                            </div>
                                            <div className="w-44 h-64 rounded-lg overflow-hidden">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1589386417686-0d34b5903d23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                                    alt=""
                                                    className="w-full h-full object-center object-cover"
                                                    width={1470}
                                                    height={1470}
                                                    priority={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-fit flex flex-col md:flex-row gap-2">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PageHeader;
