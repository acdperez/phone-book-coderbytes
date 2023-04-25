
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface ISearchBar {
    onChange: (event: any) => void;
    placeHolder: string;
}

export function SearchBar(props: ISearchBar): JSX.Element {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex items-center justify-center bg-white border border-gray-300 rounded-md p-2">
            <MagnifyingGlassIcon className="h-5 w-5 pr-1" />
            <input
                type="text"
                placeholder={props.placeHolder}
                onChange={(event) => {
                    setSearchTerm(event.target.value);
                    props.onChange(event)
                }}
                value={searchTerm}
                className="bg-transparent outline-none placeholder-gray-400 w-full"
            />
        </div>
    );
}