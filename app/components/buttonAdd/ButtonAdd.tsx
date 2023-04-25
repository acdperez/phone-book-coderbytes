interface IButtonAddProps {
    onClick: () => void;
    label: string;
}

export function ButtonAdd(props: IButtonAddProps): JSX.Element {
    return (
        <div
            className="flex bg-sky-500 text-white font-bold rounded-md justify-center items-center w-32 h-12"
            role="button"
            onClick={props.onClick}>

            <div className="flex justify-items-center">
                <label>{props.label}</label>
            </div>
        </div>
    );
}