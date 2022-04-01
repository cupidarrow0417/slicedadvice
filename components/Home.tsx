import { useEffect } from "react"
import ExpertisePostCard from "./expertisePost/ExpertisePostCard"

import { useAppSelector, useAppDispatch } from "../redux/hooks"
import { toast } from "react-toastify"

import { clearErrors } from "../redux/actions/expertisePostActions"

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
      <div className="flex justify-around items-center w-full h-[60vh] bg-brand-primary/10 rounded-3xl mt-2">
        <div className="flex flex-col justify-center items-start gap-6 w-2/5">
          <h1 className="text-5xl font-bold">
            A marketplace for bite-sized expert advice
          </h1>
          <p className="text-xl font-light opacity-70">
            Affordable for advice seekers, convenient for experts.
          </p>
          <div className="flex gap-2">
            <button className="rounded-xl bg-brand-primary-light text-white p-3 font-semibold">
              Browse advice &rarr;
            </button>
            <button className="rounded-xl bg-black/80 text-white p-3 font-semibold">
              Give paid advice &rarr;
            </button>
          </div>
        </div>
        <div className="w-52 h-52 bg-white"></div>
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