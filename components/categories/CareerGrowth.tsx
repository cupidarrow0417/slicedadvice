import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/expertisePostActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpertisePostCard from "../expertisePost/ExpertisePostCard";
import PageHeader from "../PageHeader";
import VerticalCardArray from "../VerticalCardArray";

const CareerGrowth = () => {
    const dispatch = useAppDispatch();

    // Get the Career Growth category from the Redux store.
    const { careerGrowthExpertisePosts, error: careerGrowthError } =
        useAppSelector((state) => state.allCareerGrowthExpertisePosts);

    useEffect(() => {
        if (careerGrowthError) {
            console.log("careerGrowth error!");
            toast.error(careerGrowthError);
            dispatch(clearErrors());
        }
    }, [careerGrowthError]);

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <PageHeader
                pageName="Career Growth"
                heroPhrase="Boost your trajectory with expertise from accomplished professionals."
                supportingText="Ranging from insider industry knowledge to startup advice"
            />

            <VerticalCardArray
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
            </VerticalCardArray>
        </div>
    );
};

export default CareerGrowth;