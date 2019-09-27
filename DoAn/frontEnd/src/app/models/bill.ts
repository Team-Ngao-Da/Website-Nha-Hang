import { Employee } from './employee';
export interface Bill {
    id: number;
    E_ID: string;
    date: Date;
    payment: number;
    employee: Employee;

}
