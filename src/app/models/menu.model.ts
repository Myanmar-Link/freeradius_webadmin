import { PERMISSION } from "./permission.model";

export interface MENU {
    title: string;
    icon: string;
    children: CHILDREN_MENU[]
}


export interface CHILDREN_MENU {
    title: string;
    url: string;
    permission?: PERMISSION
}