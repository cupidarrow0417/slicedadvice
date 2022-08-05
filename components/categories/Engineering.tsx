import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actionCreators/expertisePostActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpertisePostCard from "../expertisePost/ExpertisePostCard";
import PageHeader from "../atoms/PageHeader";
import VerticalCardArray from "../atoms/MultiShelf";
import { ArrowDownIcon } from "@heroicons/react/outline";
import UniversalFadeAnimation from "../atoms/UniversalFadeAnimation";

const Engineering = ({ engineeringExpertisePosts }: any) => {

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <UniversalFadeAnimation>
                <PageHeader
                    heroPhrase="Build your dream engineering career."
                    supportingText="Browse advice from accomplished engineers ranging from insider industry knowledge to interview guidance."
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
                    title="Engineering"
                    link="/categories/engineering"
                >
                    {engineeringExpertisePosts &&
                        engineeringExpertisePosts.map((expertisePost: any) => (
                            <ExpertisePostCard
                                key={expertisePost._id}
                                expertisePost={expertisePost}
                            />
                        ))}
                </VerticalCardArray>
            </UniversalFadeAnimation>
        </div>
    );
};

export default Engineering;
