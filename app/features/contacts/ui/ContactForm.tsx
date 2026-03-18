"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { Contact } from "../model/types";
import { useDispatch } from "react-redux";
import { addContact, updateContact } from "../model/contactsSlice";
import { useState, useEffect } from "react";

const schema = z
  .object({
    type: z.enum(["phone", "email", "address"]),
    value: z.string().min(1, "Обязательно"),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "phone") {
        return /^\+?\d{10,15}$/.test(data.value);
      }
      if (data.type === "email") {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.value);
      }
      return true;
    },
    {
      message: "Неверный формат",
      path: ["value"],
    },
  );

type FormData = z.infer<typeof schema>;

interface ContactFormProps {
  show: boolean;
  onHide: () => void;
  contact?: Contact;
}

export const ContactForm = ({ show, onHide, contact }: ContactFormProps) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "phone",
      value: "",
      description: "",
    },
  });

  useEffect(() => {
    if (contact) {
      reset({
        type: contact.type,
        value: contact.value,
        description: contact.description,
      });
    } else {
      reset({
        type: "phone",
        value: "",
        description: "",
      });
    }
  }, [contact, reset]);

  const onSubmit = (data: FormData) => {
    if (contact) {
      dispatch(updateContact({ ...contact, ...data }));
    } else {
      dispatch(addContact(data));
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      onHide();
      reset();
    }, 2000);
  };

  const handleHide = () => {
    onHide();
    reset();
  };

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {contact ? "Редактировать контакт" : "Добавить контакт"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert && <Alert variant="success">Контакт сохранен!</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Тип</Form.Label>
            <Form.Select {...register("type")}>
              <option value="phone">Телефон</option>
              <option value="email">Email</option>
              <option value="address">Адрес</option>
            </Form.Select>
            {errors.type && (
              <Form.Text className="text-danger">
                {errors.type.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Контакт</Form.Label>
            <Form.Control {...register("value")} />
            {errors.value && (
              <Form.Text className="text-danger">
                {errors.value.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control as="textarea" {...register("description")} />
          </Form.Group>
          <Button disabled={showAlert} type="submit">
            Сохранить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
