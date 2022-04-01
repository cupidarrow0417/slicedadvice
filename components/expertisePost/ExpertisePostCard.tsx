import Image from 'next/image'
import Link from 'next/link'

interface expertisePostCardInterface {
    expertisePost: any
}


const ExpertisePostCard = ({ expertisePost }: expertisePostCardInterface) => {
  return (
    <div className="flex flex-col w-72 h-96 p-3 border-[1px] border-black/10 rounded-2xl bg-brand-bg-light shadow-sm">
        <div className="expertisePostCardImageWrapper cursor-pointer">
            <Link href={`/expertisePost/${expertisePost._id}`}>
                <a>
                    <Image
                    src={expertisePost["images"][0]["url"]}
                    layout="responsive"
                    width={1}
                    height={1}
                    alt="Expertise Posting by (PLACE USER HERE)"
                    /> 
                </a>
            </Link>
        </div>
        <div className="flex flex-col w-8/9 mx-4 my-3">
            <Link href={`/expertisePost/${expertisePost._id}`}>
                <a>
                    <h1 className="text-xl font-medium cursor-pointer hover:text-brand-primary transition-all">{expertisePost["title"].slice(0, 40)}...</h1>
                </a> 
            </Link>
            <div className="flex justify-between">
                <p className="text-black/50"><span className="text-black">${expertisePost["pricePerSubmission"]}</span> / submission</p>
                <p className="text-black/50">Ratings: {expertisePost["ratings"]}</p>
            </div> 
        </div> 
    </div>
  )
}

export default ExpertisePostCard