import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import Head from "next/head"
import { toast } from "react-toastify"
import { clearErrors } from "../../redux/actions/expertisePostActions"

import Breadcrumbs from "../Breadcrumbs"
import Image from "next/image"
import RatingsWidget from "../RatingsWidget"





const ExpertisePostDetails = () => {
  const dispatch = useAppDispatch()
  const { expertisePost, error } = useAppSelector(state => state.expertisePostDetails)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
  }, [])
  return (
    <>
      <Head>
        <title>{expertisePost.title} | SlicedAdvice</title>
      </Head>
      <div className="flex flex-col items-start gap-5 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
        <h1 className="text-2xl font-semibold">
          {expertisePost["title"]}
        </h1>
        <RatingsWidget expertisePost={expertisePost} />

        <div className="flex flex-col md:flex-row justify-start items-center w-full gap-7 mt-3 ">
          <div className="expertisePostDetailImageWrapper w-4/5 self-center">
            {
              expertisePost["images"][0] &&
              <Image
                src={expertisePost["images"][0]["url"]}
                layout="responsive"
                width={1.5}
                height={1}
                alt="Picture for expertise posting"
              />
            }
          </div>
          <div className="flex flex-col w-full md:max-w-lg">
            <h1 className="text-xl font-medium">
              Description
            </h1>
            <p className="font-light opacity-60">
              {expertisePost["description"]}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ExpertisePostDetails