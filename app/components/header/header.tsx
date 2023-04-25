import { ButtonAdd } from "../buttonAdd/ButtonAdd";

interface IHeaderProps {
    onClick: () => void;
    label: string;
}

export function Header(props: IHeaderProps): JSX.Element {
    return (
        <div className="flex flex-row content-center justify-between mb-4">
            <p className="text-3xl font-medium">Contacts</p>
            <ButtonAdd onClick={props.onClick} label={props.label} />
        </div>
    );
}