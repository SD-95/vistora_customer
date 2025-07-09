import React, { useState } from "react";
import { Container, Row, Col, ListGroup, Badge, Form } from "react-bootstrap";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "order" | "promotion" | "wishlist" | "system";
  timestamp: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "Order Shipped",
    message: "Your order #12453 has been shipped and is on the way!",
    type: "order",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "New Wishlist Offer!",
    message: "Item in your wishlist is now 20% off. Grab it soon!",
    type: "wishlist",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: 3,
    title: "Site Maintenance",
    message: "We will be undergoing scheduled maintenance tonight at 2 AM.",
    type: "system",
    timestamp: "3 days ago",
    read: true,
  },
  {
    id: 4,
    title: "Flash Sale Alert",
    message: "Flash Sale starts in 2 hours. Up to 50% off!",
    type: "promotion",
    timestamp: "4 days ago",
    read: true,
  },
];

const getBadgeVariant = (type: string) => {
  switch (type) {
    case "order":
      return "info";
    case "promotion":
      return "success";
    case "wishlist":
      return "warning";
    case "system":
      return "secondary";
    default:
      return "dark";
  }
};

const getTypeClass = (type: string, read: boolean) => {
  let base = read ? "read" : "unread";
  switch (type) {
    case "order":
      return `${base} type-order`;
    case "promotion":
      return `${base} type-promotion`;
    case "wishlist":
      return `${base} type-wishlist`;
    case "system":
      return `${base} type-system`;
    default:
      return base;
  }
};

const NotificationPage: React.FC = () => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  return (
    <Container className="notification-page mt-4">
      <Row className="mb-4 justify-content-between align-items-center">
        <Col><h3 className="fw-bold heading-animate">Notifications</h3></Col>
        <Col xs="auto">
          <Form.Control type="date" className="date-filter shadow-sm" />
        </Col>
      </Row>
      <Row>
        <Col md={4} className="animated-list">
          <ListGroup>
            {notifications.map((note) => (
              <ListGroup.Item
                key={note.id}
                className={`notification-item ${getTypeClass(note.type, note.read)} shadow-sm`}
                onClick={() => setSelectedNotification(note)}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div className="me-3">
                    <h6 className="mb-1 fw-semibold">
                      {note.title} <Badge bg={getBadgeVariant(note.type)}>{note.type}</Badge>
                    </h6>
                    <p className="mb-0 text-muted small">{note.message}</p>
                  </div>
                  <small className="text-muted text-nowrap">{note.timestamp}</small>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8}>
          <div className="notification-detail shadow-lg fade-in">
            {selectedNotification ? (
              <>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex align-items-center gap-3">
                    <h5 className="fw-semibold mb-0">{selectedNotification.title}</h5>
                    <Badge bg={getBadgeVariant(selectedNotification.type)}>
                      {selectedNotification.type}
                    </Badge>
                  </div>
                  <div className="text-end">
                    <small className="text-muted">June 24, 2025 - 14:45 PM</small>
                    <div className="text-muted small">(4 days ago)</div>
                  </div>
                </div>
                <p className="text-muted fs-6 mt-3 mb-3">{selectedNotification.message}</p>
              </>
            ) : (
              <>
                <h5 className="fw-semibold mb-3">Notification Details</h5>
                <p className="text-muted">Select a notification to view full details here.</p>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotificationPage;