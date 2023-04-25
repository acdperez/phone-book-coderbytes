import { TrashIcon } from "@heroicons/react/24/solid";

interface IButtonDeleteProps {
  onClick: () => void;
}

export function ButtonDelete(props: IButtonDeleteProps): JSX.Element {
  return (
    <div
      className="flex bg-red-500 text-white rounded-md justify-center items-center w-12 h-12"
      role="button"
      onClick={props.onClick}>

      <div>
        <TrashIcon className="h-5 w-5" />
      </div>
    </div>
  );
}