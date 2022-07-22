import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actionCreators/expertisePostActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpertisePostCard from "../expertisePost/ExpertisePostCard";
import PageHeader from "../atoms/PageHeader";
import VerticalCardArray from "../atoms/MultiShelf";
import { ArrowDownIcon } from "@heroicons/react/outline";
import UniversalFadeAnimation from "../atoms/UniversalFadeAnimation";

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
    }, [dispatch, careerGrowthError]);

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <UniversalFadeAnimation>
                <PageHeader
                    heroPhrase="Boost your career trajectory."
                    supportingText="Browse advice from accomplished individuals ranging from insider industry knowledge to startup advice"
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
            </UniversalFadeAnimation>
        </div>
    );
};

export default CareerGrowth;
