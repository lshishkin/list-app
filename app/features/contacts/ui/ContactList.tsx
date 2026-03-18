"use client";

import { Contact } from "../model/types";
import { Button, Card, ListGroup } from "react-bootstrap";

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export const ContactList = ({
  contacts,
  onEdit,
  onDelete,
}: ContactListProps) => {
  const grouped = contacts.reduce(
    (acc, contact) => {
      if (!acc[contact.type]) acc[contact.type] = [];
      acc[contact.type].push(contact);
      return acc;
    },
    {} as Record<string, Contact[]>,
  );

  const typeLabels = {
    phone: "Телефоны",
    email: "Emails",
    address: "Адреса",
  };

  return (
    <div>
      {Object.entries(grouped).map(([type, list]) => (
        <Card key={type} className="mb-3">
          <Card.Header>
            {typeLabels[type as keyof typeof typeLabels]}
          </Card.Header>
          <ListGroup variant="flush">
            {list.map((contact) => (
              <ListGroup.Item
                key={contact.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{contact.value}</strong>
                  {contact.description && <div>{contact.description}</div>}
                </div>
                <div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onEdit(contact)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => onDelete(contact.id)}
                  >
                    Удалить
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      ))}
    </div>
  );
};
