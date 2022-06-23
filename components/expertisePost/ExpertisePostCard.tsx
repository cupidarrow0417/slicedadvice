import Image from "next/image";
import Link from "next/link";

interface expertisePostCardInterface {
    expertisePost: any;
}

const ExpertisePostCard = ({ expertisePost }: expertisePostCardInterface) => {
    //These calculations allow us to slice the title at the right place so that 
    //the title is always only two lines. Still a work in progress.
    let numSpacesInTitle: Number = expertisePost["title"].slice(0, 35).split(" ").length - 1;
    let slicePoint: Number = numSpacesInTitle > 3 ? 40 : 30;

    return (
        <>
            <Link href={`/expertisePost/${expertisePost._id}`}>
                <div className="flex flex-col max-w-[18rem] min-w-[18rem] h-96 p-3 border-[1px] border-black/10 rounded-2xl bg-brand-bg-light shadow-sm cursor-pointer hover:-mt-[2px] transition-all snap-start">
                    <div className="expertisePostCardImageWrapper">
                        <a>
                            <Image
                                src={expertisePost["images"][0]["url"]}
                                layout="responsive"
                                width={1}
                                height={1}
                                alt={expertisePost["title"]}
                            />
                        </a>
                    </div>
                    <div className="flex flex-col w-8/9 mx-4 my-3">
                        <a>
                            <h1 className="text-xl font-medium hover:text-brand-primary transition-all">
                                {expertisePost["title"].slice(0, slicePoint)}
                                {expertisePost["title"].length > slicePoint && "..."}
                            </h1>
                        </a>
                        <div className="flex justify-between">
                            <p className="text-black/50">
                                <span className="text-black">
                                    ${expertisePost["pricePerSubmission"]}
                                </span>{" "}
                                / submission
                            </p>
                            <p className="text-black/50">
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
