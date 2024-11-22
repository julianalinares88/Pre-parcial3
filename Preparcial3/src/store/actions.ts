import { Actions } from "../types/store";
import { getProducts } from "../utils/firebase";

export const navigate = (screen: string) => {
    return {
        action: Actions.NAVIGATE,
        payload: screen,
    }
};

export const getProductsAction = async () => {
    const data = await getProducts();
    console.log("DATA", data);
    
    return {
        action: Actions.GETPRODUCTS,
        payload: data,
    };
};


