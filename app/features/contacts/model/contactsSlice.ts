import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../../../shared/types';

interface ContactsState {
  contactList: Contact[];
}

const initialState: ContactsState = {
  contactList: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<Contact, 'id' | 'createdAt'>>) => {
      const id = nanoid();
      state.contactList.push({ ...action.payload, id, createdAt: Date.now() });
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contactList.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.contactList[index] = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contactList = state.contactList.filter(c => c.id !== action.payload);
    },
  },
});

export const { addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;