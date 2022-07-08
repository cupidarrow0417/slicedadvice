import { useState, Fragment } from 'react'
import { CheckIcon, SearchIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import SearchBar from './SearchBar';
import axios from "axios";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false)

  function closeModal() {
    setOpen(false)
  }

  // For some reason, for my inital search to be there, I need to call search() twice
  // (here and the modal's onFocus event), as the first axios.get ALWAYS fails.
  function openModal() {
    search("advice")
    setOpen(true)
  }

  const categories= [
    {
        name: "Career Growth",
        href: "/careerGrowth",
        description:
            "Boost your trajectory with expertise from accomplished professionals.",
    },
    {
        name: "College Application",
        href: "/collegeApplication",
        description:
            "Get guidance on your application from experienced applicants.",
    },
    {
        name: "Personal Development",
        href: "/personalDevelopment",
        description:
            "Cultivate your ideal life with personal development experts.",
    },
]

  var getResults = async () => {
        try {
          
            const origin  = window.location.origin
            const { data } = await axios.get(
                `${origin}/api/search/${searchQuery}`
            );
            setSearchResults(data)
        } catch (err) {
        }
    }

  function search(target: string){
      setSearchQuery(target);
      getResults();
  }

  return (
    <Fragment>
      <Combobox as="div" value={""} onChange={() => setSearchResults}>
        <div className="relative mt-1">
          <Combobox.Input
            className="z-0 hidden sm:text-sm md:block sm:w-28 md:w-32 lg:w-80 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary mr-10"
            onChange={(event) => search(event.target.value)}
            onClick={() => openModal()}
            onFocus={(e:any) => e.target.blur()}
            placeholder="Search for advice..."
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none mr-10">
              <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                      />
          </Combobox.Button>
        </div>
      </Combobox>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-0" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-end py-[27px] pr-[139px] text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="">
                <Combobox as="div" value={""} onChange={() => setSearchResults}>
                  <div className="relative mt-1">
                    <Combobox.Input
                      id="real"
                      className="z-0 hidden sm:text-sm md:block sm:w-28 md:w-32 lg:w-80 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      onChange={(event) => search(event.target.value)}
                      onFocus={(e:any) => {
                        search("advice")
                        e.target.nextSibling.click();
                      }}
                      displayValue={(post:any) => post?.title}
                      placeholder="Search for advice..."
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <SearchIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                    </Combobox.Button>

                    {searchResults.length > 0 && (
                      <Fragment>
                        <Combobox.Options className="flex flex-col absolute z-10 mt-1 max-h-160 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          <Combobox.Label className="font-bold text-lg my-2 ml-3 self-start">
                            Expertise Posts
                          </Combobox.Label>
                          {searchResults.map((result: any) => (
                            <Combobox.Option
                              key={result._id}
                              value={result.title}
                              className={({ active }) =>
                                classNames(
                                  'relative cursor-default select-none py-2 pl-3 pr-4',
                                  active ? 'bg-brand-primary-light text-white' : 'text-gray-900'
                                )
                              }
                            >
                              {({ active, selected }) => (
                                <>
                                <a
                                  href={window.location.origin + "/expertisePost/" + result._id}
                                  >
                                      <div className="flex items-center">
                                          <img src={result.images[0].url} alt="" className="h-10 w-10 flex-shrink-0 rounded-full" />
                                          <div className="flex flex-col overflow-hidden">
                                              <span className={classNames('ml-3 truncate', selected ? 'font-bold' : "font-semibold")}>{result.title}</span>
                                              <p className={classNames("mt-1 text-sm ml-3 truncate", active ? "text-white" : "text-gray-500")}>{result.description}</p>
                                          </div>
                                      </div>
                                  </a>

                                  {selected && (
                                    <span
                                      className={classNames(
                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                        active ? 'text-white' : 'text-indigo-600'
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                          <Combobox.Label className="font-bold text-lg my-2 ml-3 self-start">
                            Categories
                          </Combobox.Label>
                          {categories.map((category: any) => (
                            <Combobox.Option
                              key={category.name}
                              value={category.name}
                              className={({ active }) =>
                                classNames(
                                  'relative cursor-default select-none py-2 pl-3 pr-9',
                                  active ? 'bg-brand-primary-light text-white' : 'text-gray-900'
                                )
                              }
                            >
                              {({ active, selected }) => (
                                <>
                                <a
                                  href={window.location.origin + "/categories"+ category.href}
                                  >
                                      <div className="flex items-center">
                                          {/* <img src={category.images[0].url} alt="" className="h-10 w-10 flex-shrink-0 rounded-full" /> */}
                                          <div className="flex flex-col overflow-hidden">
                                              <span className={classNames('ml-3 truncate', selected ? 'font-bold' : "font-semibold")}>{category.name}</span>
                                          </div>
                                      </div>
                                  </a>

                                  {selected && (
                                    <span
                                      className={classNames(
                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                        active ? 'text-white' : 'text-indigo-600'
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      </Fragment>
                    )}
                    
                  </div>
                </Combobox>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  )
}