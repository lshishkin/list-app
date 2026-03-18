"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { RootState } from "../../../store/store";
import { deleteContact } from "../model/contactsSlice";
import { ContactForm } from "./ContactForm";
import { ContactList } from "./ContactList";
import { Filter } from "./Filter";
import { Contact, ContactType } from "..";

export const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(
    (state: RootState) => state.contacts.contactList,
  );
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | undefined>();
  const [filter, setFilter] = useState<{
    type?: ContactType;
    order: "new" | "old";
  }>({ order: "new" });

  const filteredContacts = contacts
    .filter((c) => !filter.type || c.type === filter.type)
    .sort((a, b) => {
      if (filter.order === "new") {
        return b.createdAt - a.createdAt;
      } else {
        return a.createdAt - b.createdAt;
      }
    });

  const handleAdd = () => {
    setEditingContact(undefined);
    setShowModal(true);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      <Button onClick={handleAdd} className="mb-3">
        Добавить
      </Button>
      <Filter filter={filter} onFilterChange={setFilter} />
      <ContactList
        contacts={filteredContacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ContactForm
        show={showModal}
        onHide={() => setShowModal(false)}
        contact={editingContact}
      />
    </>
  );
};
