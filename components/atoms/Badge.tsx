// The Badge component is a reusable component that shows a
// badge with a number of different colors, configurable with the color prop
// of type string.
export default function Badge({
    color,
    text,
}: {
    color: string;
    text: string;
}) {
    return (
        <>
            {color === "gray" && (
                <span className="inline-flex items-center px-3 py-0.5 whitespace-nowrap rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {text}
                </span>
            )}
            {color === "red" && (
                <span className="inline-flex items-center px-3 py-0.5 whitespace-nowrap rounded-full text-sm font-medium bg-red-100 text-red-800">
                    {text}
                </span>
            )}
            {color === "yellow" && (
                <span className="inline-flex items-center px-3 py-0.5 whitespace-nowrap rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    {text}
                </span>
            )}
            {color === "green" && (
                <span className="inline-flex items-center px-3 py-0.5 whitespace-nowrap rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {text}
                </span>
            )}
            {color === "blue" && (
                <span className="inline-flex items-center px-3 py-0.5 whitespace-nowrap rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {text}
                </span>
            )}
            {color === "indigo" && (
                <span className="inline-flex items-center px-3 py-0.5 whitespace-nowrap rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {text}
                </span>
            )}
            {color === "purple" && (
                <span className="inline-flex items-center px-3 py-0.5 whitespace-nowrap rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    {text}
                </span>
            )}
            {color === "pink" && (
                <span className="inline-flex items-center px-3 py-0.5 whitespace-nowrap rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                    {text}
                </span>
            )}
        </>
    );
}
