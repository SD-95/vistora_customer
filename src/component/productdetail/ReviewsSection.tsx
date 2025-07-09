import React, { useState } from 'react';
import { Card, ProgressBar, Row, Col, Badge, Form, Button, Modal } from 'react-bootstrap';

interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const ratingsData = {
  average: 4.1,
  totalRatings: 188650,
  totalReviews: 6883,
  breakdown: {
    5: 65,
    4: 20,
    3: 8,
    2: 4,
    1: 3,
  },
};

const allReviews: Review[] = [
  {
    user: 'Anjali Verma',
    rating: 5,
    comment: 'Amazing soap! Skin feels fresh and glowing. Very natural fragrance too.',
    date: 'June 12, 2025',
  },
  {
    user: 'Rohit Kumar',
    rating: 4,
    comment: 'Good value for money. Lathers well and feels herbal.',
    date: 'June 9, 2025',
  },
];

// Simulate current logged-in user
const currentUser = 'Samrat';

const ReviewsSection: React.FC = () => {
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  // const [editing, setEditing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSubmit = () => {
    const newReview: Review = {
      user: currentUser,
      rating,
      comment,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setUserReview(newReview);
    setComment('');
    setRating(0);
  };

  const handleEdit = () => {
    setShowEditModal(true);
    setComment(userReview?.comment || '');
    setRating(userReview?.rating || 0);
  };

  const handleUpdate = () => {
    if (userReview) {
      setUserReview({ ...userReview, comment, rating });
      setShowEditModal(false);
    }
  };

  const otherReviews = allReviews.filter((r) => r.user !== currentUser);

  return (
    <div className="reviews-section">
      <h5 className="mb-4">Ratings & Reviews</h5>
      <Row className='gy-4 gx-4'>
        <Col md={4} className="text-center overall-rating">
          <h1>{ratingsData.average.toFixed(1)} ★</h1>
          <div>
            {ratingsData.totalRatings.toLocaleString()} Ratings &{' '}
            {ratingsData.totalReviews.toLocaleString()} Reviews
          </div>
        </Col>
        <Col md={8}>
          <Row className="ratings-breakdown gx-2">
            <Col md={12}>
              {Object.entries(ratingsData.breakdown)
                .reverse()
                .map(([stars, percent]) => (
                  <Row key={stars} className="align-items-center mb-1">
                    <Col xs={2} className="text-end pe-1 small fw-semibold">
                      {stars} ★
                    </Col>
                    <Col xs={8} className="px-1">
                      <ProgressBar
                        now={percent}
                        variant="success"
                        style={{ height: '6px', borderRadius: '5px' }}
                      />
                    </Col>
                    <Col xs={2} className="ps-1 small text-muted text-end">
                      {percent}%
                    </Col>
                  </Row>
                ))}
            </Col>
          </Row>
        </Col>
      </Row>

      <hr />

      {/* Rating Form */}
      {!userReview && (
        <Card className="mb-4 p-3 shadow-sm">
          <h6 className="fw-semibold mb-3">Rate this product</h6>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label className="fw-semibold">Your Rating</Form.Label>
              <Form.Select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value={0}>Select</option>
                {[5, 4, 3, 2, 1].map((val) => (
                  <option key={val} value={val}>{val} ★</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              disabled={rating === 0 || comment.trim() === ''}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Card>
      )}

      {/* User's Review */}
      {userReview && (
        <Card className="mb-3 bg-light border shadow-sm">
          <Card.Body>
            <div className="d-flex align-items-center mb-2">
              <Badge bg="success">{userReview.rating} ★</Badge>
              <span className="ms-3 fw-semibold">{userReview.user} (You)</span>
              <span className="ms-auto text-muted small">{userReview.date}</span>
            </div>
            <div className="d-flex justify-content-between align-items-start">
              <Card.Text className="me-3">{userReview.comment}</Card.Text>
              <Button size="sm" variant="outline-secondary" onClick={handleEdit}>
                Edit Review
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Other Reviews */}
      <div className="customer-reviews mt-4">
        {otherReviews.map((review, index) => (
          <Card key={index} className="mb-3 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <Badge bg="success">{review.rating} ★</Badge>
                <span className="ms-3 fw-semibold">{review.user}</span>
                <span className="ms-auto text-muted small">{review.date}</span>
              </div>
              <Card.Text>{review.comment}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Your Rating</Form.Label>
            <Form.Select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((val) => (
                <option key={val} value={val}>{val} ★</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Your Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleUpdate}>
            Update Review
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReviewsSection;
