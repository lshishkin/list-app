import { Container } from "react-bootstrap";
import { Contacts } from "./features/contacts";

export default function Home() {
  return (
    <Container className="py-4">
      <h1>Контактная книжка</h1>
      <Contacts />
    </Container>
  );
}
