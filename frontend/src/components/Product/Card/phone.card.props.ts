import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface PhoneCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    name: string,
    img: string,
    price: number,
    alias: string,
    oldPrice?: number,
}