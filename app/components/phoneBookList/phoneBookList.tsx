import { PhoneBookListItem } from "./phoneBookListItem/phoneBookListItem";

export interface IPhoneBookEntry {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
}

interface IPhoneBookListProps {
    onDelete: (item: IPhoneBookEntry) => void;
    phoneItemList: IPhoneBookEntry[];
}

export function PhoneBookList(props: IPhoneBookListProps): JSX.Element {
    return (
        <div className="flex flex-col mt-3 overflow-y-auto">
            {
                props.phoneItemList.map(x => (
                    <PhoneBookListItem
                        id={x.id}
                        onDelete={(id) => props.onDelete(x)}
                        phoneEntry={x}
                        key={x.id}/>
                ))
            }
        </div>
    );
}