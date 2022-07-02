import Link from "next/link";
import { ElementType } from "react";
import ExpertisePostCard from "../expertisePost/ExpertisePostCard";

interface ShelfPropsInterface {
    children: any;
    title: string;
    link: string;
}

// A shelf is a general component that represents a feed of items
// (can be expertisePosts, or any other items) that are horizontally
// scrolled and finite. Simply pass in the title and link, and then
// continue rendering items between <Shelf ... >   </Shelf>
const Shelf = ({ children, title, link }: ShelfPropsInterface) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <Link href={link}>
                <h1 className="text-3xl sm:text-4xl tracking-tight font-semibold cursor-pointer">{title}</h1>
                </Link>
                <Link href={link}>
                    <button className="px-4 py-2 rounded-full font-semibold md:bg-white md:hover:bg-white/20 md:border-[1px] cursor-pointer">
                        View All
                    </button>
                </Link>
            </div>
            <div className="flex gap-7 w-full h-full overflow-x-scroll pb-4 pt-[2px]">
                {children}
            </div>
        </div>
    );
};

export default Shelf;
