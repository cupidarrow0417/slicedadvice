import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actionCreators/expertisePostActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpertisePostCard from "../expertisePost/ExpertisePostCard";
import PageHeader from "../atoms/PageHeader";
import { ArrowDownIcon } from "@heroicons/react/outline";
import VerticalCardArray from "../atoms/MultiShelf";
import UniversalFadeAnimation from "../atoms/UniversalFadeAnimation";

const PersonalDevelopment = () => {
    const dispatch = useAppDispatch();

    // Select all categories from Redux store.
    const {
        personalDevelopmentExpertisePosts,
        error: personalDevelopmentError,
    } = useAppSelector((state) => state.allPersonalDevelopmentExpertisePosts);

    // Toast errors based on which category it came from.
    useEffect(() => {
        if (personalDevelopmentError) {
            console.log("personalDevelopment error!");
            toast.error(personalDevelopmentError);
            dispatch(clearErrors());
        }
    }, [personalDevelopmentError]);

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <UniversalFadeAnimation>
                <PageHeader
                    heroPhrase="Cultivate your ideal life."
                    supportingText="Browse our personal development advice, ranging from mindfulness advice to confidence tips"
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
                    title="Personal Development"
                    link="/categories/personalDevelopment"
                >
                    {personalDevelopmentExpertisePosts &&
                        personalDevelopmentExpertisePosts.map(
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

export default PersonalDevelopment;
