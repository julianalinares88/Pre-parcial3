import SideBar from '../../components/NavBar/navBar';
import '../../components/NavBar/navBar';

import { VinylComponent } from '../../types/card';
import { addObserver, appState } from '../../store';
import Styles from '../../screens/creationScreen/creationScreen.css';
import { addProducts } from '../../utils/firebase';

class CreationScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        addObserver(this);
    }

    connectedCallback() {
        this.render();
    }

    async render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <h1>Creation Screen</h1>
                <nab-bar></nab-bar>
                <div class="creation-content">
                    <form>
                        <label for="album-name">Album Name:</label>
                        <input type="text" id="album-name" name="album-name" required>

                        <label for="artist-name">Artist Name:</label>
                        <input type="text" id="artist-name" name="artist-name" required>

                        <label for="price">Price:</label>
                        <input type="number" id="price" name="price" required>

                        <label for="stock">Stock:</label>
                        <input type="number" id="stock" name="stock" required>

                        <label for="image-url">Image URL:</label>
                        <input type="text" id="image-url" name="image-url" required>

                        <button type="submit">Add Product</button>
                    </form>
                </div>
            `;

            // Add event listener for the form submission
            const form = this.shadowRoot?.querySelector('form');
            form?.addEventListener('submit', (event) => {
                event.preventDefault();
                this.handleFormSubmission();
            });

            const css = this.ownerDocument.createElement('style');
            css.innerHTML = Styles;
            this.shadowRoot?.appendChild(css);
        }
    }

    private getFormValues(): VinylComponent {
        const albumNameElement = this.shadowRoot?.getElementById('album-name') as HTMLInputElement | null;
        const artistNameElement = this.shadowRoot?.getElementById('artist-name') as HTMLInputElement | null;
        const priceElement = this.shadowRoot?.getElementById('price') as HTMLInputElement | null;
        const stockElement = this.shadowRoot?.getElementById('stock') as HTMLInputElement | null;
        const imageUrlElement = this.shadowRoot?.getElementById('image-url') as HTMLInputElement | null;
    
        return {
            albumName: albumNameElement?.value || '',
            artistName: artistNameElement?.value || '',
            price: priceElement?.value ? parseFloat(priceElement.value) : 0,
            stock: stockElement?.value ? parseInt(stockElement.value) : 0,
            imageUrl: imageUrlElement?.value || '',
        };
    }
    
    async handleFormSubmission() {
        // Get the form data
        const formValues = this.getFormValues();
    
        try {
            // Save the product to the database
            await addProducts(formValues);
            console.log('Product added successfully');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }
    
    
    }


customElements.define('creation-screen', CreationScreen);
export default CreationScreen;
