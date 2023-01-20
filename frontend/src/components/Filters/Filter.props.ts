import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface FilterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    filterBy: CheckBoxElement[]
}
export interface CheckBoxElement {
    name: string,
    isActive?: boolean,
}