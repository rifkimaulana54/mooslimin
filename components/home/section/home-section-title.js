import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./home-section-title.module.css";

export default function HomeSectionTitle({ title, subtitle, button, onClick }) {
  return (
    <Container className="py-4">
      <Row className="g-3">
        <Col xs="8" md="6">
          <div className={styles.container}>
            <div className={styles.title}>{title}</div>
            <div className={styles.subtitle}>{subtitle}</div>
          </div>
        </Col>
        <Col xs="4" md="6" className="d-none d-md-block align-self-center text-end">
          <Button variant="outline-primary" className="btn-outline-primary"
            onClick={onClick} >{button}</Button>
        </Col>
        <Col className="d-block d-md-none align-self-center text-end">
          <Button variant="outline-primary" className="btn-outline-primary"
            onClick={onClick}>Belanja</Button>
        </Col>
      </Row>
    </Container>
  );
};
