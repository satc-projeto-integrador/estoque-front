import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { MouseEventHandler, ReactNode } from "react";

type ActionProps = {
    onClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>,
    icon?: React.ReactNode
}

type Props = {
    children: ReactNode
}

const CustomAction = (props: ActionProps) => {
    if (!props.icon) throw new Error('icon is required for CustomAction')
    return (
        <Button
            className="btn-icon"
            shape="circle"
            type="text"
            onClick={props.onClick}
        >
            <>
                {props.icon}
            </>
        </Button>
    );
};

const DeleteAction = ({ onClick }: ActionProps) => {
    return (
        <Button
            danger
            className="btn-icon"
            shape="circle"
            type="text"
            onClick={onClick}
        >
            <DeleteOutlined size={16} />
        </Button>
    );
};

const EditAction = ({ onClick }: ActionProps) => {
    return (
        <Button
            className="btn-icon"
            type="text"
            
            shape="circle"
            onClick={onClick}
        >
            <EditOutlined size={16} />
        </Button>
    );
};

const TableActions = ({ children }: Props) => {
    return <>{children}</>;
};

export { DeleteAction, EditAction, CustomAction };
export default TableActions;
