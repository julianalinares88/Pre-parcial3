import { appState } from "../../store";
import styles from "./vinylProduct.css";

export enum Attribute {
    "albumName" = "albumName",
    "artistName" = "artistName",
    "price" = "price",
    "stock" = "stock",
    "imageUrl" = "imageUrl",
}

class VinylProduct extends HTMLElement {
    albumName?: string;
    artistName?: string;
    price?: number;
    stock?: number;
    imageUrl?: string;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return Object.values(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        if (oldValue === newValue) return; // Evita actualizaciones innecesarias
        console.log('Atributo cambiado:', propName, newValue); // Verifica el cambio de atributo
    
        switch (propName) {
            case Attribute.price:
            case Attribute.stock:
                this[propName] = newValue !== undefined ? Number(newValue) : undefined;
                break;
            default:
                this[propName] = newValue || undefined;
                break;
        }
        this.render(); // Actualiza la renderización si cambian los atributos
    }
    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            console.log('Renderizando VinylProduct:', this); // Verifica el renderizado
            this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="/src/components/normal-VinylProduct/normal-VinylProduct.css">
                <section class="VinylProduct-card">
                    <img src="${this.imageUrl || ''}" alt="Vinyl image">
                    <h2>${this.albumName || 'Unknown Album'}</h2>
                    <p>${this.artistName || 'Unknown Artist'}</p>
                    <p>Price: $${this.price || 0}</p>
                    <p>Stock: ${this.stock || 0}</p>
                </section>
            `;
            
            const cssCard = this.ownerDocument.createElement("style");
            cssCard.innerHTML = styles;
            this.shadowRoot.appendChild(cssCard);
        }
    }
    }


customElements.define("vinyl-product", VinylProduct);
export default VinylProduct;
