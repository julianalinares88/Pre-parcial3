import { reducer } from "./reducer";

import Storage from "../utils/storage";
import { AppState, Observer, Screens } from "../types/store";
import { getFirebaseInstance } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { navigate } from "./actions";

const initialState: AppState = {
    screen: 'DASHBOARD',
    products: [],
};

export let appState = initialState;

let observers: Observer[] = [];

// Dispatch
export const dispatch = (action: any) => {
    const clone = JSON.parse(JSON.stringify(appState));
    const newState = reducer(action, clone);
    
    appState = newState;

	observers.forEach((o: any) => o.render());
};

// Add Observers
export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};