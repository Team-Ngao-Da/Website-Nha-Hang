import { Menu } from './menu';
import { Bill } from './bill';
export interface BillDetails {
    B_ID: number;
    M_ID: number;
    count: number;
    price: number;
    bills: Bill;
    menu: Menu;
}
