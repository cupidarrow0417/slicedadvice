import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import Head from "next/head"
import { toast } from "react-toastify"
import { clearErrors } from "../../redux/actions/expertisePostActions"

import Breadcrumbs from "../Breadcrumbs"
import Image from "next/image"





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
      <div className="flex flex-col gap-5 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
        <h1 className="text-2xl font-semibold">
          {expertisePost["title"]}
        </h1>
        <div className="expertisePostDetailImageWrapper">
          {
            expertisePost["images"][0] &&
            <Image
              src={expertisePost["images"][0]["url"]}
              layout="responsive"
              width={1}
              height={1}
              alt="Picture for expertise posting"
            />
          }
        </div>
      </div>
    </>
  )
}

export default ExpertisePostDetails