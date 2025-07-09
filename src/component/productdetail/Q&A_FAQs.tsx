import React, { useState } from 'react';
import {
  Row, Col, Card, Button, Modal, Form, Badge
} from 'react-bootstrap';
import {
  FaThumbsUp, FaThumbsDown, FaExclamationTriangle,
  FaCheckCircle, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface QuestionItem {
  question: string;
  answer: string;
  user: string;
  likes: number;
  dislikes: number;
}

const QAandFAQSection: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionItem[]>([
    {
      question: "Is it helpful for dark underarms?",
      answer: "Yes",
      user: "Hmmm",
      likes: 3,
      dislikes: 0,
    },
    {
      question: "Apply face also?",
      answer: "Yes",
      user: "Diksha Pandey",
      likes: 5,
      dislikes: 1,
    },
    {
      question: "It really helps in skin whitening?",
      answer: "Will not make you white if you are dark skinned from birth.",
      user: "Hmmm",
      likes: 12,
      dislikes: 2,
    },
  ]);

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showAbuseModal, setShowAbuseModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [_abuseTargetIndex, setAbuseTargetIndex] = useState<number | null>(null);
  const [abuseReason, setAbuseReason] = useState('');

  const [faqExpanded, setFaqExpanded] = useState<{ [id: number]: boolean }>({});

  const faqs = [
    {
      id: 1,
      question: "Can I use this soap daily?",
      answer: "Yes, it is designed for everyday use and gentle on the skin.",
    },
    {
      id: 2,
      question: "Does it contain artificial colors?",
      answer: "No, it’s free from artificial colorants and parabens.",
    },
  ];

  const toggleFAQ = (id: number) => {
    setFaqExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmitQuestion = () => {
    if (newQuestion.trim() === '') return;

    if (editingIndex !== null) {
      const updated = [...questions];
      updated[editingIndex].question = newQuestion;
      setQuestions(updated);
    } else {
      const newQ: QuestionItem = {
        question: newQuestion,
        answer: "Pending moderation...",
        user: "You",
        likes: 0,
        dislikes: 0,
      };
      setQuestions([newQ, ...questions]);
    }

    setNewQuestion('');
    setEditingIndex(null);
    setShowQuestionModal(false);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setNewQuestion(questions[index].question);
    setShowQuestionModal(true);
  };

  const handleAbuseSubmit = () => {
    console.log("Reported Abuse:", abuseReason);
    setAbuseReason('');
    setAbuseTargetIndex(null);
    setShowAbuseModal(false);
  };

  return (
    <Row className="gy-4">
      {/* Q&A Section */}
      <Col md={6}>
        <Card className="shadow-sm p-4 border-0 rounded-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0 fw-semibold">Questions and Answers</h5>
            <Button variant="outline-primary" size="sm" onClick={() => setShowQuestionModal(true)}>
              Ask Question?
            </Button>
          </div>

          {questions.map((item, index) => (
            <Card key={index} className="mb-3 border rounded-3">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div style={{ maxWidth: '80%' }}>
                    <p className="fw-semibold mb-1 text-dark">Q: {item.question}</p>
                    <p className="mb-2">A: {item.answer}</p>
                    <div className="text-muted small d-flex align-items-center gap-2">
                      <span>{item.user}</span>
                      <Badge bg="light" className="text-success d-flex align-items-center gap-1 border">
                        <FaCheckCircle size={12} /> Certified Buyer
                      </Badge>
                    </div>
                  </div>

                  <div className="text-end">
                    <div className="mb-2">
                      <span className="me-2 text-success"><FaThumbsUp /> {item.likes}</span>
                      <span className="text-danger"><FaThumbsDown /> {item.dislikes}</span>
                    </div>
                    {item.user === 'You' && (
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        className="mb-2 w-100"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="danger"
                      className="d-flex align-items-center gap-1 small w-100"
                      onClick={() => {
                        setAbuseTargetIndex(index);
                        setShowAbuseModal(true);
                      }}
                    >
                      <FaExclamationTriangle size={14} /> Report Abuse
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Card>
      </Col>

      {/* FAQs Section */}
      <Col md={6}>
        <Card className="shadow-sm p-4 border-0 rounded-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0 fw-semibold">Frequently Asked Questions</h5>
            <Link to="#" className="text-decoration-none small fw-medium text-primary">Check our Privacy & Policy</Link>
          </div>

          {faqs.map((faq) => (
            <Card
              key={faq.id}
              className="mb-3 px-3 py-2 border rounded-3"
              style={{ borderRadius: '10px', cursor: 'pointer' }}
              onClick={() => toggleFAQ(faq.id)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="fw-semibold">{faq.question}</div>
                {faqExpanded[faq.id] ? (
                  <FaChevronUp size={14} className="text-muted" />
                ) : (
                  <FaChevronDown size={14} className="text-muted" />
                )}
              </div>
              {faqExpanded[faq.id] && (
                <div className="text-muted mt-2 small">
                  {faq.answer}
                </div>
              )}
            </Card>
          ))}
        </Card>
      </Col>

      {/* Ask Question Modal */}
      <Modal show={showQuestionModal} onHide={() => setShowQuestionModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex !== null ? "Edit Your Question" : "Ask a Question"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Your Question</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Type your question here..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQuestionModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmitQuestion}>
            {editingIndex !== null ? "Update" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Report Abuse Modal */}
      <Modal show={showAbuseModal} onHide={() => setShowAbuseModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Report Abuse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Reason for Reporting</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={abuseReason}
              onChange={(e) => setAbuseReason(e.target.value)}
              placeholder="Describe the issue..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAbuseModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleAbuseSubmit}>Report</Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default QAandFAQSection;
