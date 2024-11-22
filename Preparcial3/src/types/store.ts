import { VinylComponent } from "./card";

export type AppState = {
    screen: string;
    products: VinylComponent[];
};

export type Observer = { render: () => void } & HTMLElement;

export enum Actions {
    'NAVIGATE' = 'NAVIGATE',
    'GETPRODUCTS' = 'GETPRODUCTS',
    'CREATEPRODUCT' = 'CREATEPRODUCT',
}

export enum Screens {
    'DASHBOARD' = 'DASHBOARD',
    'ADDPRODUCTS' = 'ADDPRODUCTS',
    'MODIFYPRODUCTS' = 'MODIFYPRODUCTS',
    'EDITPRODUCT' = 'EDITPRODUCT'
}