import styles from './navBar.css';
import { navigate } from '../../store/actions';
import { dispatch } from '../../store';
import { Screens } from '../../types/store';

export enum Attribute {
    
}

class NavBar extends HTMLElement {
    

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.values(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        
    }

    connectedCallback() {
        this.render();
    
       
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <section class="container-top">
                <h1>Vinyl Store</h1>
            </section>
            <section class="container-text">
                <label class="nav-label-home">Home</label>
                <label class="nav-label-add">Add new Product</label>
                <label class="nav-label-modify">Modify Products</label>
            </section>
            `;
    
            // Event listeners
            const homeLabel = this.shadowRoot?.querySelector('.nav-label-home');
            homeLabel?.addEventListener('click', () => {
                console.log('Home');
                dispatch(navigate(Screens.DASHBOARD));
            });
    
            const addProductLabel = this.shadowRoot?.querySelector('.nav-label-add');
            addProductLabel?.addEventListener('click', () => {
                console.log('Add New Product');
                dispatch(navigate(Screens.ADDPRODUCTS));
            });
    
            const modifyProductsLabel = this.shadowRoot?.querySelector('.nav-label-modify');
            modifyProductsLabel?.addEventListener('click', () => {
                console.log('Modify Products');
                dispatch(navigate(Screens.MODIFYPRODUCTS));
            });
    
            const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);
        }
    }
}    

customElements.define('nab-bar', NavBar);
export default NavBar;
