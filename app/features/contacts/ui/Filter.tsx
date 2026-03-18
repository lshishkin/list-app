"use client";

import { Form } from "react-bootstrap";
import { ContactType } from "../model/types";

interface FilterProps {
  filter: { type?: ContactType; order: "new" | "old" };
  onFilterChange: (filter: {
    type?: ContactType;
    order: "new" | "old";
  }) => void;
}

export const Filter = ({ filter, onFilterChange }: FilterProps) => {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type =
      e.target.value === "all" ? undefined : (e.target.value as ContactType);
    onFilterChange({ ...filter, type });
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value as "new" | "old";
    onFilterChange({ ...filter, order });
  };

  return (
    <div className="d-flex gap-3 mb-3">
      <Form.Group>
        <Form.Label>Тип</Form.Label>
        <Form.Select value={filter.type || "all"} onChange={handleTypeChange}>
          <option value="all">Все</option>
          <option value="phone">Телефон</option>
          <option value="email">Email</option>
          <option value="address">Адрес</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Порядок</Form.Label>
        <Form.Select value={filter.order} onChange={handleOrderChange}>
          <option value="new">Сначала новые</option>
          <option value="old">Сначала старые</option>
        </Form.Select>
      </Form.Group>
    </div>
  );
};
