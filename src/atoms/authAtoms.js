import { atom } from "jotai";

export const userAtom = atom({
    isLoggedIn: false, // Default false
    user: null, 
    
  });


export const showLoginModalAtom = atom(false);
