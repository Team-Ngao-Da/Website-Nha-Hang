import { MenuType } from './menu-type';
export interface Menu {
    id: number;
    MT_ID: string;
    name: string;
    price: string;
    image: string;
    menuType: MenuType;
}
