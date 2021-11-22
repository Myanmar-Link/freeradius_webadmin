import { ADDRESS } from "./address.model";

export interface EMPLOYEE {
    employee_name: string | null | undefined | number;
    nrc: string | null;
    address?: ADDRESS
}