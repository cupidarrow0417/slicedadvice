import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actionCreators/expertisePostActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpertisePostCard from "../expertisePost/ExpertisePostCard";
import PageHeader from "../PageHeader";
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
            <PageHeader
                pageName="All Categories"
                heroPhrase="Life changing advice, by-the-slice."
                supportingText="Ranging from career growth to personal development"
            />

            <Shelf title="Career Growth" link="/categories/careerGrowth">
                {careerGrowthExpertisePosts &&
                    careerGrowthExpertisePosts.map((expertisePost: any) => (
                        <ExpertisePostCard
                            key={expertisePost._id}
                            expertisePost={expertisePost}
                        />
                    ))}
            </Shelf>
            <Shelf title="College Application" link="/categories/collegeApplication">
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
            <Shelf title="Personal Development" link="/categories/personalDevelopment">
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
