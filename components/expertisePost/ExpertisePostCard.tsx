import Image from "next/image";
import Link from "next/link";

interface expertisePostCardInterface {
    expertisePost: any;
}

const ExpertisePostCard = ({ expertisePost }: expertisePostCardInterface) => {
    //These calculations allow us to slice the title at the right place so that 
    //the title is always only two lines. Still a work in progress.
    // Updated as of June 23, 2022
    let numSpacesInTitle: Number = expertisePost["title"].slice(0, 90).split(" ").length - 1;
    let slicePoint: Number = numSpacesInTitle > 5 ? 90 : 70;

    return (
        <>
            <Link href={`/expertisePost/${expertisePost._id}`}>
                <div className="flex flex-col max-w-[18rem] min-w-[18rem] h-96 rounded-2xl bg-brand-bg-light cursor-pointer hover:-mt-[2px] transition-all snap-start">
                    <div className="expertisePostCardImageWrapper">
                        <a>
                            <Image
                                src={expertisePost["images"][0]["url"]}
                                layout="responsive"
                                width={1}
                                height={1}
                                className="rounded-md"
                                alt={expertisePost["title"]}
                            />
                        </a>
                    </div>
                    <div className="flex flex-col justify-start items-between my-3 gap-2">
                        <a>
                            <h1 className="text-md font-semibold text-black/80 hover:text-brand-primary transition-all">
                                {expertisePost["title"].slice(0, slicePoint)}
                                {expertisePost["title"].length > slicePoint && "..."}
                            </h1>
                        </a>
                        <div className="flex justify-between text-black/50 text-sm font-light">
                            <p className="">
                                <span className="text-black">
                                    ${expertisePost["pricePerSubmission"]}
                                </span>{" "}
                                / submission
                            </p>
                            <p className="">
                                Ratings: {expertisePost["ratings"]}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default ExpertisePostCard;
