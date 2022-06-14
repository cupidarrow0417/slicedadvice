import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearErrors } from "../../redux/actions/expertisePostActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ExpertisePostCard from "../expertisePost/ExpertisePostCard";
import PageHeader from "../PageHeader";
import VerticalCardArray from "../VerticalCardArray";

const CollegeApplication = () => {
    const dispatch = useAppDispatch();

    // Select all categories from Redux store.
    const { collegeApplicationExpertisePosts, error: collegeApplicationError } =
        useAppSelector((state) => state.allCollegeApplicationExpertisePosts);

    // Toast errors based on which category it came from.
    useEffect(() => {
        if (collegeApplicationError) {
            console.log("collegeApplication error!");
            toast.error(collegeApplicationError);
            dispatch(clearErrors());
        }
    }, [collegeApplicationError]);

    return (
        <div className="max-w-7xl mx-auto  flex flex-col gap-6">
            <PageHeader
                pageName="College Application"
                heroPhrase="Get guidance on your application from experienced applicants."
                supportingText="testText"
            />

            <VerticalCardArray title="College Application" link="/categories/collegeApplication">
                {collegeApplicationExpertisePosts &&
                    collegeApplicationExpertisePosts.map((expertisePost: any) => (
                        <ExpertisePostCard
                            key={expertisePost._id}
                            expertisePost={expertisePost}
                        />
                    ))}
            </VerticalCardArray>
        </div>
    );
};

export default CollegeApplication;
