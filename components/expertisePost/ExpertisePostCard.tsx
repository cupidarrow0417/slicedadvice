import Image from "next/image";
import Link from "next/link";

interface expertisePostCardInterface {
    expertisePost: any;
}

const ExpertisePostCard = ({ expertisePost }: expertisePostCardInterface) => {
    //These calculations allow us to slice the title at the right place so that
    //the title is always only two lines. Still a work in progress.
    // Updated as of June 23, 2022
    let numSpacesInTitle: Number =
        expertisePost["title"].slice(0, 90).split(" ").length - 1;
    let slicePoint: Number = numSpacesInTitle > 5 ? 90 : 70;

    return (
        <>
            <Link href={`/expertisePost/${expertisePost._id}`}>
                <div className="flex flex-col min-w-[20rem] max-w-xs sm:min-w-[20rem] sm:max-w-[20rem] h-full rounded-2xl bg-brand-bg-light cursor-pointer hover:-mt-[2px] transition-all snap-start">
                    <div className="expertisePostCardImageWrapper">
                        <a className="">
                            <Image
                                src={expertisePost["images"][0]["url"]}
                                layout="responsive"
                                width={1}
                                height={1.2}
                                className="rounded-md w-full h-full object-center object-cover"
                                alt={expertisePost["title"]}
                            />
                        </a>
                    </div>
                    <div className="flex flex-col justify-start items-between mt-2 gap-2">
                        <a>
                            <h1 className="text-xl font-semibold text-black/80 hover:text-brand-primary transition-all">
                                {expertisePost["title"].slice(0, slicePoint)}
                                {expertisePost["title"].length > slicePoint &&
                                    "..."}
                            </h1>
                        </a>
                        <div className="flex justify-between text-black/50 text-md font-light">
                            <p className="">
                                <span className="text-black">
                                    ${expertisePost["pricePerSubmission"]}
                                </span>{" "}
                                / submission
                            </p>
                            {expertisePost?.ratings?.length > 0 && (
                                <p className="">
                                    Ratings: {expertisePost.ratings}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default ExpertisePostCard;
