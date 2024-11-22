import "./screens/dashboardScreen/dashboardScreen";
import "./screens/creationScreen/creationScreen";
import "./screens/modifyproductsScreen/modifyproductsScreen";


import { appState, addObserver } from "./store";
import { Screens } from "./types/store";

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
    };

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = ``;
            switch(appState.screen){
                case Screens.DASHBOARD:
                    const dashboard = this.ownerDocument.createElement('dashboard-screen');
                    this.shadowRoot.appendChild(dashboard);
                    break;

                case Screens.ADDPRODUCTS:
                    const addproducts = this.ownerDocument.createElement('creation-screen');
                    this.shadowRoot.appendChild(addproducts);
                    break;
                
                case Screens.MODIFYPRODUCTS:
                    const modifyproducts = this.ownerDocument.createElement('modify-products-screen');
                    this.shadowRoot.appendChild(modifyproducts);
                    break;

                case Screens.EDITPRODUCT:
                    const editproduct = this.ownerDocument.createElement('edit-product-screen');
                    this.shadowRoot.appendChild(editproduct);
                    break;
                    
                
                default:
                    break;
            }
        }
    }
}

customElements.define('app-container', AppContainer);
