import React from "react";

interface PageHeaderInterface {
    pageName: string,
    heroPhrase: string,
    supportingText: string,
}

const PageHeader = ({ pageName, heroPhrase, supportingText }: PageHeaderInterface) => {
    return (
        <div className="text-center flex flex-col py-10 px-7 gap-5 bg-white rounded-3xl border-[1px] border-black/10">
            <p className="text-base font-semibold text-brand-primary-light tracking-wide uppercase">
                {pageName}
            </p>
            <h1 className=" text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl -mt-2">
                {heroPhrase}
            </h1>
            <p className="max-w-xl mx-auto text-xl text-center text-gray-500">
                {supportingText}
            </p>
        </div>
    );
};

export default PageHeader;
