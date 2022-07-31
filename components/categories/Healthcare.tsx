import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actionCreators/expertisePostActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpertisePostCard from "../expertisePost/ExpertisePostCard";
import PageHeader from "../atoms/PageHeader";
import { ArrowDownIcon } from "@heroicons/react/outline";
import VerticalCardArray from "../atoms/MultiShelf";
import UniversalFadeAnimation from "../atoms/UniversalFadeAnimation";

const Healthcare = ({ healthcareExpertisePosts }: any) => {
    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <UniversalFadeAnimation>
                <PageHeader
                    heroPhrase="Cultivate your ideal healthcare career."
                    supportingText="Browse our healthcare career advice, ranging from testing and interview guidance to insider healthcare experience."
                >
                    <button
                        onClick={() =>
                            document
                                .getElementById("scrollHere")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="rounded-full bg-brand-primary-light hover:bg-brand-primary-light/90 text-white animate-bounce"
                    >
                        <ArrowDownIcon className="w-10 h-10 m-2" />
                    </button>
                </PageHeader>

                <div id="scrollHere"></div>
                <VerticalCardArray
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
                </VerticalCardArray>
            </UniversalFadeAnimation>
        </div>
    );
};

export default Healthcare;
