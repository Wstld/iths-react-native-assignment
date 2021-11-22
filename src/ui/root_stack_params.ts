import { IProduct } from "../data_models/product";

export type RootStackParams = {
    Login: undefined;
    Home: undefined;
    Product: { product:IProduct|undefined};
}