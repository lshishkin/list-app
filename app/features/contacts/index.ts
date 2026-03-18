export { Contacts } from "./ui/Contacts";
export type { Contact, ContactType } from "./model/types";
export {
  addContact,
  updateContact,
  deleteContact,
} from "./model/contactsSlice";
export { default as contactsReducer } from "./model/contactsSlice";
