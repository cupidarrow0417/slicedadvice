import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/expertisePostActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpertisePostCard from "../expertisePost/ExpertisePostCard";
import Shelf from "../Shelf";

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
            <div className="text-center flex flex-col py-10 px-7 gap-5 bg-white rounded-3xl border-[1px] border-black/10">
                <h2 className="text-base font-semibold text-brand-primary-light tracking-wide uppercase">
                    All Categories
                </h2>
                <p className=" text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl -mt-2">
                    Life changing advice, by-the-slice.
                </p>
                <p className="max-w-xl mx-auto text-xl text-center text-gray-500">
                    Ranging from career growth to personal development.
                </p>
            </div>

            <Shelf title="Career Growth" link="#">
                {careerGrowthExpertisePosts &&
                    careerGrowthExpertisePosts.map((expertisePost: any) => (
                        <ExpertisePostCard
                            key={expertisePost._id}
                            expertisePost={expertisePost}
                        />
                    ))}
            </Shelf>
            <Shelf title="College Application" link="#">
                {collegeApplicationExpertisePosts &&
                    collegeApplicationExpertisePosts.map(
                        (expertisePost: any) => (
                            <ExpertisePostCard
                                key={expertisePost._id}
                                expertisePost={expertisePost}
                            />
                        )
                    )}
            </Shelf>
            <Shelf title="Personal Development" link="#">
                {personalDevelopmentExpertisePosts &&
                    personalDevelopmentExpertisePosts.map(
                        (expertisePost: any) => (
                            <ExpertisePostCard
                                key={expertisePost._id}
                                expertisePost={expertisePost}
                            />
                        )
                    )}
            </Shelf>
        </div>
    );
};

export default Categories;
