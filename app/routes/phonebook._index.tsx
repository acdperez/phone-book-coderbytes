import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Banner } from "~/components/banner/banner";
import { Header } from "~/components/header/header";
import type { IPhoneBookEntry } from "~/components/phoneBookList/phoneBookList";
import { PhoneBookList } from "~/components/phoneBookList/phoneBookList";
import { SearchBar } from "~/components/searchBar/searchBar";
import { deletePhoneBookById, getPhoneBooksItems } from "~/models/phoneBook.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
    await requireUserId(request);
    return json({
        phoneList: await getPhoneBooksItems()
    });
};

export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();
    const itemId = formData.get("id");
    await deletePhoneBookById(itemId as string);
    return json({}, 200);
};

export default function PhonBook() {

    // Helpers ----------------------------------------
    async function deleteHandler(item: IPhoneBookEntry) {
        if (confirm(`Are you sure you want to delete the contact ${item.firstName} ${item.lastName} with phone number ${item.phone}?`)) {
            const formData = new FormData();
            formData.append("id", item.id);
            await submit(formData, { method: "post" });
            setFilteredPhoneItems(filteredPhoneItems.filter(x => x.id !== item.id));
        }
    }

    // Hooks and states ----------------------------------------
    const submit = useSubmit();
    const navigation = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const { phoneList } = useLoaderData<typeof loader>();
    const [filteredPhoneItems, setFilteredPhoneItems] = useState(phoneList);

    useEffect(() => {
        setFilteredPhoneItems(phoneList.filter((item) => item.lastName.toLowerCase().startsWith(searchTerm.toLowerCase())));
    }, [phoneList, searchTerm]);

    return (
        <div className="flex flex-col mx-32 px-10 bg-gray-100 h-full">
            
            <Banner />
            <Header onClick={() => navigation("/phonebook/new")} label={"+ Add Contact"} />

            <SearchBar
                onChange={function (event: any): void { setSearchTerm(event.target.value); }}
                placeHolder={"Search for contact by last name..."} />

            <PhoneBookList
                onDelete={deleteHandler}
                phoneItemList={filteredPhoneItems} />
        </div>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);

    return <div className="bg-red-100 border rounded-full border-red-400 text-red-700 px-4 py-3 relative" role="alert">
        <strong className="font-bold">Error!</strong> <br />
        <span className="block sm:inline">There was a problem detected, we really sorry.</span>
    </div>
}