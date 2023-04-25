import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createPhoneContact } from "~/models/phoneBook.server";
import { requireUserId } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
    await requireUserId(request);
    return json({}, 200);
};

export const action = async ({ request }: ActionArgs) => {

    const formData = await request.formData();

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const phone = formData.get("phone");

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

    await createPhoneContact({ firstName, lastName, phone });

    return redirect("/phonebook");
};

const inputClassName = `w-full border border-gray-300 p-2 rounded-lg`;
export default function NewNotePage() {
    const navigate = useNavigate();
    const errors = useActionData<typeof action>();

    return (
        <div className="flex flex-col mx-32 px-10 bg-gray-100 h-full">
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4">New contact</h1>
                <Form className="space-y-6" method="post">
                    <div>
                        <label htmlFor="name" className="block text-gray-800 font-bold mb-2">
                            Name
                            <input
                                type="text"
                                id="name"
                                name="firstName"
                                className={inputClassName}
                                placeholder="Enter name"
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
                            Create
                        </button>
                    </div>
                </Form>
            </div>
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