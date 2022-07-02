import { useState } from 'react'
import { CheckIcon, SearchIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'
import axios from "axios";

const people = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More users...
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getResults = async () => {
        try {
            const origin  = window.location.origin
            const { data } = await axios.get(
                `${origin}/api/search/${searchQuery}`
            );
            setSearchResults(data)
            console.log(searchResults)
        } catch (err) {
        }
    }

    function search(target: any){
        setSearchQuery(target);
        // console.log(searchQuery)
        getResults();
    }

  return (
    <Combobox as="div" value={""} onChange={() => setSearchResults}>
      <div className="relative mt-1">
        <Combobox.Input
          className="z-0 hidden sm:text-sm md:block sm:w-28 md:w-32 lg:w-80 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          onChange={(event) => search(event.target.value)}
          displayValue={(post:any) => post?.title}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
        </Combobox.Button>

        {searchResults.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {searchResults.map((result: any) => (
              <Combobox.Option
                key={result._id}
                value={result.title}
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
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}