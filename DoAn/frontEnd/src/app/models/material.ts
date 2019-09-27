import { MaterialType } from './material-type';

export interface Material {
    id: number;
    MA_T_ID: string;
    name: string;
    supplie: string;
    unit: string;
    count: number;
    cost: number;
    expirationDate: Date;
    importDate: Date;
    materialType: MaterialType;
}
