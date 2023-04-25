import { useNavigate } from "@remix-run/react";

interface INotFoundProps {
    message: string;
}

const NotFound = (props: INotFoundProps) => {
    const navigate = useNavigate();
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mb-4 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M9 15a1 1 0 01-1-1V7a1 1 0 012 0v7a1 1 0 01-1 1zm2-1a1 1 0 001-1V7a1 1 0 00-2 0v6a1 1 0 001 1zm5.707-5.293a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0zM4.293 9.707a1 1 0 010-1.414l3-3a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                />
            </svg>
            <h1 className="font-bold text-3xl mb-2 text-gray-900">Page Not Found</h1>
            <p className="text-xl text-gray-600">{props.message}</p>
            <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-3xl bg-lime-600 px-6 py-2 mx-3 w-72 text-xl font-medium uppercase text-white"
            >
                Back to home page
            </button>
        </div>
    );
};

export default NotFound;