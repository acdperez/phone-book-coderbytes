import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
    Form,
    isRouteErrorResponse,
    useActionData,
    useLoaderData,
    useNavigate,
    useRouteError
} from "@remix-run/react";
import invariant from "tiny-invariant";
import NotFound from "~/components/notFound/notFound";
import { getPhoneBookById, updatePhoneBookById } from "~/models/phoneBook.server";
import { requireUserId } from "~/session.server";


export const loader = async ({ params, request }: LoaderArgs) => {
    await requireUserId(request);
    invariant(params.contactId, "contactId not found");

    const phoneBook = await getPhoneBookById(params.contactId);
    if (!phoneBook) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ phoneBook });
};

export async function action({ request, params }: ActionArgs) {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;

    const errors = {
        firstName: firstName ? null : "First name is required",
        lastName: lastName ? null : "Last name is required",
        phone: phone ? null : "Phone is required",
    };

    const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
    if (hasErrors) {
        return json(errors);
    }

    invariant(typeof firstName === "string", "firstName must be a string");
    invariant(typeof lastName === "string", "lastName must be a string");
    invariant(typeof phone === "string", "phone must be a string");

    await updatePhoneBookById({ id, firstName, lastName, phone });

    return redirect("/phonebook");
}

const inputClassName = `w-full border border-gray-300 p-2 rounded-lg`;

export default function PhoneBookDetail() {
    const data = useLoaderData<typeof loader>();
    const errors = useActionData<typeof action>();
    const navigate = useNavigate();
    return (
        <div className="flex flex-col mx-32 px-10 bg-gray-100 h-full">
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4">Edit contact</h1>
                <Form className="space-y-6" method="post">
                    <input
                        type="hidden"
                        id="name"
                        name="id"

                        defaultValue={data?.phoneBook?.id}
                    />
                    <div>
                        <label htmlFor="name" className="block text-gray-800 font-bold mb-2">
                            Name
                            <input
                                type="text"
                                id="name"
                                name="firstName"
                                className={inputClassName}
                                placeholder="Enter name"
                                defaultValue={data?.phoneBook?.firstName}
                            />
                            {errors?.firstName ? (
                                <em className="text-red-600">{errors.firstName}</em>
                            ) : null}
                        </label>
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block text-gray-800 font-bold mb-2">
                            Last Name
                            <input
                                type="text"
                                id="last_name"
                                name="lastName"
                                className={inputClassName}
                                placeholder="Enter last name"
                                defaultValue={data?.phoneBook?.lastName}
                            />
                            {errors?.lastName ? (
                                <em className="text-red-600">{errors.lastName}</em>
                            ) : null}
                        </label>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-gray-800 font-bold mb-2">
                            Phone Number
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className={inputClassName}
                                placeholder="Enter phone number"
                                defaultValue={data?.phoneBook?.phone}
                            />
                            {errors?.phone ? (
                                <em className="text-red-600">{errors.phone}</em>
                            ) : null}
                        </label>
                    </div>
                    <div className="flex flex-row">
                        <button
                            type="button"
                            onClick={() => navigate("/phonebook")}
                            className="w-full rounded-3xl bg-rose-500 px-6 py-2 mx-3 text-xl font-medium uppercase text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full rounded-3xl bg-green-500 px-6 py-2 mx-3 text-xl font-medium uppercase text-white"
                        >
                            Update
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (error instanceof Error) {
        return <div>An unexpected error occurred: {error.message}</div>;
    }

    if (!isRouteErrorResponse(error)) {
        return <h1>Unknown Error</h1>;
    }

    if (error.status === 404) {
        return <NotFound message={"The contact you are looking for does not exists."} />;
    }

    return <div>An unexpected error occurred: {error.statusText}</div>;
}