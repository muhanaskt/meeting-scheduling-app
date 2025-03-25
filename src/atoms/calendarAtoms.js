import { atom } from "jotai";

// Atom for storing all events
export const eventsAtom = atom([]);

// Atom for handling modal visibility
export const showModalAtom = atom(false);

// Atom for storing the new event details
export const newEventAtom = atom({});

// Atom for storing the selected event (for deletion/editing)
export const selectedEventAtom = atom(null);

export const showEditModalAtom = atom(false); 