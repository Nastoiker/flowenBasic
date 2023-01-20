import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface CheckBoxProps extends DetailedHTMLProps<HTMLAttributes<CheckBoxProps>, CheckBoxProps>{
     text: string,
     isActive?: boolean
}