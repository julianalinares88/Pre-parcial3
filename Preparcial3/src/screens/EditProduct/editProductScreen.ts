import SideBar from '../../components/NavBar/navBar';
import '../../components/NavBar/navBar';


import { addObserver, appState } from '../../store';
import Styles from './creationScreen.css';

class EditProduct extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `

                <h1>Edit Product Screen</h1>
            <nab-bar></nab-bar>
            <div class="creation-content">
                <!-- Your dashboard content goes here -->
            </div>
                                 
            `;


            }

            const css = this.ownerDocument.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot?.appendChild(css);
        }
    }


customElements.define('edit-product-screen', EditProduct);
export default EditProduct;