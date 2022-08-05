import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actionCreators/expertisePostActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpertisePostCard from "../expertisePost/ExpertisePostCard";
import PageHeader from "../atoms/PageHeader";
import SingleShelf from "../atoms/SingleShelf";
import { ArrowDownIcon } from "@heroicons/react/outline";
import UniversalFadeAnimation from "../atoms/UniversalFadeAnimation";

const Categories = ({
    engineeringExpertisePosts,
    businessExpertisePosts,
    healthcareExpertisePosts,
}: any) => {

    return (
        <div className="max-w-7xl mx-auto  flex flex-col gap-6">
            <UniversalFadeAnimation>
                <PageHeader
                    heroPhrase="Career advice that makes a difference."
                    supportingText="Browse our categories ranging from engineering to healthcare."
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
                <SingleShelf
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
            </UniversalFadeAnimation>
        </div>
    );
};

export default Categories;
