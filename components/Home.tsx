import { useEffect } from "react"
import ExpertisePostCard from "./expertisePost/ExpertisePostCard"
import undrawHeroImage from '../public/images/undrawHeroImage.svg'

import { useAppSelector, useAppDispatch } from "../redux/hooks"
import { toast } from "react-toastify"

import { clearErrors } from "../redux/actions/expertisePostActions"
import Image from "next/image"

const Home = () => {
  const dispatch = useAppDispatch()
  const { expertisePosts, error } = useAppSelector(state => state.allExpertisePosts)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
  }, [])
  



  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse md:flex-row justify-center gap-10 items-center w-full h-[90vh] md:h-[450px] bg-brand-primary/10 rounded-3xl mt-2 py-9">
        <div className="flex flex-col justify-center items-center md:items-start gap-6 w-4/5 md:w-2/5">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left">
            A marketplace for bite-sized expert advice
          </h1>
          <p className="text-l md:text-xl lg:text-2xl font-light opacity-70 text-center md:text-left">
            Affordable for advice seekers, convenient for experts.
          </p>
          <div className="flex gap-2">
            <button className="rounded-xl bg-brand-primary-light text-white p-3 font-semibold text-xs md:text-sm lg:text-base">
              Browse advice &rarr;
            </button>
            <button className="rounded-xl bg-black/80 text-white p-3 font-semibold text-xs md:text-sm lg:text-base">
              Give paid advice &rarr;
            </button>
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
      <h1 className="text-4xl">Explore</h1>
      <div className="flex gap-5 flex-wrap">
        {
          expertisePosts && expertisePosts.map((expertisePost: any) => (
              <ExpertisePostCard key={expertisePost._id} expertisePost={expertisePost} />
            )
          )
        }
      </div>
    </div>
  )
}

export default Home