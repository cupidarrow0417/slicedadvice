import {
    CashIcon,
    HomeIcon,
    InboxInIcon,
    ViewListIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import React, { SVGProps } from "react";

// interface NavigationInterface {
//     name: string;
//     href: string;
//     icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
//     current: boolean;
// }

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const navigation = [
    {
        name: "Home",
        href: "/dashboard/adviceSeeker/home",
        icon: HomeIcon,
        current: false,
    },
    {
        name: "Bookings",
        href: "/dashboard/adviceSeeker/bookings",
        icon: InboxInIcon,
        current: false,
    },
    {
        name: "Payments",
        href: "/dashboard/adviceSeeker/payments",
        icon: CashIcon,
        current: false,
    },
];

// The AdviceSeekerDashboardSidebar is a reusable component that sits inside a sidebar
// that exists on an advice seeker's dashboard.
const AdviceSeekerDashboardSidebar = () => {
    return (
        <>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="h-0 flex-1 flex flex-col overflow-y-auto">
                {/* Navigation */}
                <nav className="px-3">
                    <div className="space-y-1">
                        {navigation.map((item: any) => (
                            <Link href={item.href} key={item.name}>
                                <a
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-200 text-gray-900"
                                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                                    )}
                                    aria-current={
                                        item.current ? "page" : undefined
                                    }
                                >
                                    <item.icon
                                        className={classNames(
                                            item.current
                                                ? "text-gray-500"
                                                : "text-gray-400 group-hover:text-gray-500",
                                            "mr-3 flex-shrink-0 h-6 w-6"
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </a>
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default AdviceSeekerDashboardSidebar;
