import { Menu } from './menu';
import { Material } from './material';
export interface Ingredients {
    M_ID: number;
    MA_ID: number;
    count: number;
    menu: Menu;
    material: Material;
}
