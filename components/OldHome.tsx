import { useEffect } from "react";
import ExpertisePostCard from "./expertisePost/ExpertisePostCard";
import undrawHeroImage from "../public/images/undrawHeroImage.svg";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { toast } from "react-toastify";

import { clearErrors } from "../redux/actionCreators/expertisePostActions";
import Image from "next/image";
import Link from "next/link";
import Shelf from "./atoms/SingleShelf";

const Home = () => {
    const dispatch = useAppDispatch();
    const { allExpertisePosts, error } = useAppSelector(
        (state) => state.allExpertisePosts
    );
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [error]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col-reverse md:flex-row justify-center gap-10 items-center w-full h-[90vh] md:h-[450px] bg-white border-[1px] border-black/10 shadow-sm rounded-3xl mt-2 py-9">
                <div className="flex flex-col justify-center items-center md:items-start gap-7 w-4/5 md:w-2/5">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left sm:tracking-tight ">
                        A marketplace for bite-sized expert advice
                    </h1>
                    <p className="text-l md:text-xl lg:text-2xl font-light opacity-60 text-center md:text-left -mt-3">
                        Affordable for advice seekers, convenient for experts.
                    </p>
                    <div className="flex gap-2">
                        <Link href="/categories">
                            <button className="rounded-xl bg-brand-primary-light text-white p-3 font-semibold text-xs md:text-sm lg:text-base">
                                Browse advice &rarr;
                            </button>
                        </Link>
                        <Link href="/dashboard/expert/home">
                            <button className="rounded-xl bg-black/90 text-white p-3 font-semibold text-xs md:text-sm lg:text-base">
                                Give paid advice &rarr;
                            </button>
                        </Link>
                    </div>
                </div>
                <div>
                    <Image
                        src={undrawHeroImage}
                        layout="fixed"
                        width={300}
                        height={300}
                    />
                </div>
            </div>
            <Shelf title="Explore" link="#">
                {allExpertisePosts &&
                    allExpertisePosts.map((expertisePost: any) => (
                        <ExpertisePostCard
                            key={expertisePost._id}
                            expertisePost={expertisePost}
                        />
                    ))}
            </Shelf>
        </div>
    );
};

export default Home;
