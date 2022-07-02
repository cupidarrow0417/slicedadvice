import { SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
import axios from "axios";
import absoluteUrl from "next-absolute-url";
import { Combobox, Popover } from "@headlessui/react";
import { Transition } from '@headlessui/react'
import Flyout from "./Flyout";
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const getResults = async () => {
        try {
            const origin  = "http://localhost:3000/"
            const { data } = await axios.get(
                `${origin}/api/search/${searchQuery}`
            );
            setSearchResults(data)
        } catch (err) {
        }
    }

    function search(target: any){
        setSearchQuery(target);
        console.log(searchQuery)
        getResults();
    }

    return(
    <div className="z-0 hidden md:block sm:w-28 md:w-32 lg:w-80">
        <label htmlFor="search" className="sr-only">
            Search
        </label>
        <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <SearchIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                />
            </div>
            <input
                id="search"
                name="search"
                className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                placeholder="Search for advice..."
                onChange={(e:any) => search(e.target.value)}
                type="search"
            />
        </div>
        <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? 'text-gray-900' : 'text-gray-500',
              'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            )}
          >
            <span>Solutions</span>
            <ChevronDownIcon
              className={classNames(open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500')}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                  {searchResults.map((result: any) => (
                    <a
                      key={result.name}
                      href={"http://localhost:3000/expertisePost/" + result._id}
                      className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                    >
                      {/* <result.images className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" /> */}
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">{result.title}</p>
                        <p className="mt-1 text-sm text-gray-500">{result.description}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
    </div>
    )
}