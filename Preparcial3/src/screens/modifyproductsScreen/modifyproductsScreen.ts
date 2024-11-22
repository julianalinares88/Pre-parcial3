import SideBar from '../../components/NavBar/navBar';
import '../../components/NavBar/navBar';


import { addObserver, appState } from '../../store';
import Styles from './modifyScreen.css';

class ModifyScreen extends HTMLElement {

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

                <h1>Modify Screen</h1>
            <nab-bar></nab-bar>
            <div class="modify-content">
                <!-- Your dashboard content goes here -->
            </div>
                                 
            `;


            }

            const css = this.ownerDocument.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot?.appendChild(css);
        }
    }


customElements.define('modify-products-screen', ModifyScreen);
export default ModifyScreen;