
import { Form, Link } from "@remix-run/react";
import imagePath from "./images/contact.png";

export function Banner(): JSX.Element {
    return (
        <div>
            <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
                <h1 className="text-3xl font-bold">
                    <Link to=".">Contacts</Link>
                </h1>
                <Form action="/logout" method="post">
                    <button
                        type="submit"
                        className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                    >
                        Logout
                    </button>
                </Form>
            </header>
            <div className="flex flex-row items-center justify-center mb-2">

                <img src={imagePath} alt="Application logo" className="h-24 w-16 mr-5 pb-4" />
                <div className="font-bold text-5xl ">Phone Book App</div>
            </div>
        </div>
    );
}