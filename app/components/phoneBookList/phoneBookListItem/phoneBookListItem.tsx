import { PhoneIcon } from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import { ButtonDelete } from "~/components/buttonDelete/ButtonDelete";
import type { IPhoneBookEntry } from "../phoneBookList";

interface IButtonDelete {
    id: string;
    onDelete: (item: IPhoneBookEntry) => void;
    phoneEntry: IPhoneBookEntry;
}

export function PhoneBookListItem(props: IButtonDelete): JSX.Element {
    return (
        <div key={props.id} className="flex justify-between bg-white px-2 py-2 opacity-1 border-2">
            <div className="flex flex-col">
                <Link to={`/phonebook/${props.phoneEntry.id}`}
                    className="font-semibold mb-1.5 bg-white hover:text-sky-600 transition duration-300">
                    {`${props.phoneEntry.firstName} ${props.phoneEntry.lastName}`}
                </ Link>
                <div className="flex flex-row">
                    <PhoneIcon className="h-5 w-5 mr-1 text-slate-500" />
                    <p className="text-slate-500">{props.phoneEntry.phone}</p>
                </div>
            </div>

            <ButtonDelete onClick={() => props.onDelete(props.phoneEntry)} />
        </div>
    );
}