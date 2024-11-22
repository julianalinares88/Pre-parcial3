import { dispatch, addObserver, appState } from "../../store/index";
import { getProductsAction } from "../../store/actions";
import VinylProduct from "../../components/vinylProduct/vinylProduct";

import Styles from './dashboardScreen.css';

class DashboardScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        addObserver(this); // Observamos cambios en el estado global
    }

    async connectedCallback() {
        if (!appState.products || appState.products.length === 0) {
            const action = await getProductsAction();
            dispatch(action);
        }

        // Espera a que el estado se actualice
        this.render(); // Render inicial
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="./dashboardScreen.css">
                <h1>Dashboard</h1>
                <nab-bar></nab-bar>
                <div class="dashboard-content"> </div>
            `;

            const content = this.shadowRoot.querySelector(".dashboard-content");
            const products = appState.products || [];
            console.log('Productos a renderizar:', products);

            products.forEach((product) => {
                const vinylProduct = this.ownerDocument.createElement("vinyl-product");
                vinylProduct.setAttribute("albumName", product.albumName);
                vinylProduct.setAttribute("artistName", product.artistName);
                vinylProduct.setAttribute("price", product.price.toString());
                vinylProduct.setAttribute("stock", product.stock.toString());
                vinylProduct.setAttribute("imageUrl", product.imageUrl);
                content?.appendChild(vinylProduct);
                console.log('Elemento añadido al DOM:', vinylProduct);
            });

            const cssDashboard = this.ownerDocument.createElement("style");
            cssDashboard.innerHTML = Styles;
            this.shadowRoot.appendChild(cssDashboard);
        }
    }

    stateChanged(newState: any) {
        if (newState.products.length !== appState.products.length) {
            this.render();
        }
    }
}

customElements.define("dashboard-screen", DashboardScreen);
export default DashboardScreen;
