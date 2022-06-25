import Link from "next/link";
import { ElementType } from "react";
import ExpertisePostCard from "../expertisePost/ExpertisePostCard";

interface VerticalCardArrayPropsInterface {
    children: any;
    title: string;
    link: string;
}

// An vertically-infinite array of items (modified Shelf component).
// Simply pass in the title and link, and then continue rendering items
// between <VerticalCardArray ... >   </VerticalCardArray>.

// Cards have a gap-5 here, while in the categories page, they have a gap-6.
const VerticalCardArray = ({ children, title, link }: VerticalCardArrayPropsInterface) => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <Link href={link}>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight cursor-pointer">{title}</h1>
                </Link>
            </div>
            <div className="flex flex-row flex-wrap gap-10 pb-4 pt-[2px]">
                {children}
            </div>
        </div>
    );
};

export default VerticalCardArray;
