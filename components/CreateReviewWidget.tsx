import { useState } from 'react'
import { createReview } from '../redux/actionCreators/reviewActionCreator'
import { useAppDispatch } from '../redux/hooks'
import InteractiveRating from './InteractiveRating'


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const CreateReviewWidget = ({ user, expertisePostId }: any,) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(5)
  const [wroteReview, setWroteReview] = useState(false);
  const dispatch = useAppDispatch();

  const createReviewHandler = (e: any) => {
    e.preventDefault()

    setWroteReview(true);
    
    setLoading(true);

    const reviewData = {
      rating,
      content,
      user,
      expertisePostId,
    };

    setLoading(false);

    dispatch(createReview(reviewData));
  }

  if(wroteReview){
    return null
  }
  else {
    return (
    <div className="mt-16 lg:mt-0 lg:col-start-6 lg:col-span-7">
    <h3 className="sr-only">Recent reviews</h3>

      <div className="flow-root">
          <div className="-my-12 divide-y divide-gray-200">
              <div className="py-12">
                  <div className="flex items-center">
                      <img
                          src= {user ? user.avatar.url : "/images/default_avatar.jpeg"}
                          className="h-12 w-12 rounded-full"
                      />
                      <div className="ml-4">
                          <h4 className="text-sm font-bold text-gray-900">
                              {user.name}
                          </h4>
                          <div className="mt-1 flex items-center">
                            <InteractiveRating setRating={setRating}/>
                          </div>
                      </div>
                  </div>

                  <form onSubmit={(e:any) => createReviewHandler(e)}>
                    <div className="mt-4 space-y-6 text-base italic text-gray-600">
                      <label htmlFor="review" className="sr-only">
                        Add your review
                      </label>
                      <textarea
                        rows={3}
                        name="review"
                        className="bg-brand-bg-light italic block w-full border-0 border-b border-transparent p-0 pb-2 resize-none focus:ring-0 focus:border-brand-primary-light sm:text-sm"
                        placeholder="Add your review..."
                        defaultValue={""}
                        required = {true}
                        onChange={(e:any) => setContent(e.target.value)}
                      />
                    </div>
                    <div className="pt-2 flex justify-between">
                      <div className="flex items-center space-x-5">
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          type="submit"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-primary-light hover:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                          disabled={loading ? true : false}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
            </div>
        </div>
    </div>
      )
  }
}

export default CreateReviewWidget
