import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actionCreators/expertisePostActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpertisePostCard from "../expertisePost/ExpertisePostCard";
import PageHeader from "../atoms/PageHeader";
import SingleShelf from "../atoms/SingleShelf";
import { ArrowDownIcon } from "@heroicons/react/outline";
import UniversalFadeAnimation from "../atoms/UniversalFadeAnimation";

const Categories = () => {
    const dispatch = useAppDispatch();

    // Select all categories from Redux store.
    const { careerGrowthExpertisePosts, error: careerGrowthError } =
        useAppSelector((state) => state.allCareerGrowthExpertisePosts);
    const { collegeApplicationExpertisePosts, error: collegeApplicationError } =
        useAppSelector((state) => state.allCollegeApplicationExpertisePosts);
    const {
        personalDevelopmentExpertisePosts,
        error: personalDevelopmentError,
    } = useAppSelector((state) => state.allPersonalDevelopmentExpertisePosts);

    // Toast errors based on which category it came from.
    useEffect(() => {
        if (careerGrowthError) {
            console.log("careerGrowth error!");
            toast.error(careerGrowthError);
            dispatch(clearErrors());
        } else if (collegeApplicationError) {
            console.log("collegeApplication error!");
            toast.error(collegeApplicationError);
            dispatch(clearErrors());
        } else if (personalDevelopmentError) {
            console.log("personalDevelopment error!");
            toast.error(personalDevelopmentError);
            dispatch(clearErrors());
        }
    }, [careerGrowthError, collegeApplicationError, personalDevelopmentError]);

    return (
        <div className="max-w-7xl mx-auto  flex flex-col gap-6">
            <UniversalFadeAnimation>
                <PageHeader
                    heroPhrase="Advice that makes a difference."
                    supportingText="Browse our categories ranging from career growth to personal development"
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
                    title="Career Growth"
                    link="/categories/careerGrowth"
                >
                    {careerGrowthExpertisePosts &&
                        careerGrowthExpertisePosts.map((expertisePost: any) => (
                            <ExpertisePostCard
                                key={expertisePost._id}
                                expertisePost={expertisePost}
                            />
                        ))}
                </SingleShelf>
                <SingleShelf
                    title="College Application"
                    link="/categories/collegeApplication"
                >
                    {collegeApplicationExpertisePosts &&
                        collegeApplicationExpertisePosts.map(
                            (expertisePost: any) => (
                                <ExpertisePostCard
                                    key={expertisePost._id}
                                    expertisePost={expertisePost}
                                />
                            )
                        )}
                </SingleShelf>
                <SingleShelf
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
                </SingleShelf>
            </UniversalFadeAnimation>
        </div>
    );
};

export default Categories;
