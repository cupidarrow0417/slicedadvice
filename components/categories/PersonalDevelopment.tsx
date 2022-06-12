import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/expertisePostActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpertisePostCard from "../expertisePost/ExpertisePostCard";
import PageHeader from "../PageHeader";
import VerticalCardArray from "../VerticalCardArray";

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
        <div className="max-w-7xl mx-auto  flex flex-col gap-6">
            <PageHeader
                pageName="Personal Development"
                heroPhrase="Cultivate the life you want to live with knowledgable experts."
                supportingText="testText"
            />

            <VerticalCardArray title="Personal Development" link="/categories/personal-development">
                {personalDevelopmentExpertisePosts &&
                    personalDevelopmentExpertisePosts.map((expertisePost: any) => (
                        <ExpertisePostCard
                            key={expertisePost._id}
                            expertisePost={expertisePost}
                        />
                    ))}
            </VerticalCardArray>
        </div>
    );
};

export default PersonalDevelopment;
