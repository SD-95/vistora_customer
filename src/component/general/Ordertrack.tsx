import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

interface Step {
  title: string;
  description: string;
}

const Ordertrack: React.FC = () => {
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  const baseSteps: Step[] = [
    { title: 'Order Confirmed, Mar 07', description: 'Your Order has been placed.' },
    { title: 'Delivered, Mar 12', description: 'Your item has been delivered' },
  ];

  const extraSteps: Step[] = [
    {
      title: 'Shipped, Mar 09',
      description: 'Ekart Logistics - FMPC4602815538\nYour item has been shipped.'
    },
    {
      title: 'Out for Delivery, Mar 12',
      description: 'Your item is out for delivery'
    }
  ];

  const steps = showAllUpdates ? [baseSteps[0], ...extraSteps, baseSteps[1]] : baseSteps;

  useEffect(() => {
    if (timelineRef.current) {
      const stepElements = timelineRef.current.querySelectorAll('.timeline-step');
      if (stepElements.length > 1) {
        const first = stepElements[0].getBoundingClientRect().top;
        const last = stepElements[stepElements.length - 1].getBoundingClientRect().top;
        setLineHeight(last - first);
      }
    }
  }, [steps]);

  return (
    <Container  className="ordertrack-container">
      <Row>
        <Col md={8}>
          <Card className="ordertrack-card">
            <div className="shared-badge">
              Sabitarani Dash shared this order with you.
            </div>

            <Row className="align-items-center mb-4">
              <Col md={9} className="product-info">
                <h5>
                  Ramya METRO 2 Way Bib Cock Tap With Soft Health Faucet Set For Kitchen And Bathroom Tap Twin Elbow Valve Faucet
                </h5>
                <div className="text-muted">Silver</div>
                <div className="text-muted">Seller: RamyaSanitryWarePvtLmt</div>
                <div className="price mt-2">₹658</div>
              </Col>
              <Col md={3}>
                <img
                  src="https://via.placeholder.com/100"
                  alt="Product"
                  className="img-fluid rounded"
                />
              </Col>
            </Row>

            <div className="delivery-note mb-3">
              Item was opened and verified at the time of delivery.
            </div>

            <div
              className="timeline"
              ref={timelineRef}
              style={{ ['--timeline-height' as any]: `${lineHeight}px` }}
            >
              {steps.map((step, index) => (
                <div className="timeline-step" key={index}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h6>{step.title}</h6>
                    <small>{step.description}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="see-updates">
              <Button variant="link" onClick={() => setShowAllUpdates(!showAllUpdates)}>
                {showAllUpdates ? 'Hide Updates' : 'See All Updates'}
              </Button>
            </div>
          </Card>
        </Col>

        <Col md={4}>
          <div className="delivery-details-card">
            <h6>Delivery details</h6>
            <div className="delivery-address mb-3">
              <p>
                <strong>Home</strong> <br />
                C/o Ajit kumar Dash, H.no 82090, dandapadar ...
              </p>
              <p><strong>Somes Dash</strong> <br />8895319373</p>
            </div>

            <h6>Price Details</h6>
            <div className="price-breakdown">
              <div className="price-row">
                <span>List price</span>
                <span><s>₹2,999</s></span>
              </div>
              <div className="price-row">
                <span>Selling price</span>
                <span>₹1,099</span>
              </div>
              <div className="price-row">
                <span>Extra Discount</span>
                <span>- ₹451</span>
              </div>
              <div className="price-row">
                <span>Special Price</span>
                <span>₹648</span>
              </div>
              <div className="price-row">
                <span>Payment Handling Fee</span>
                <span>₹7</span>
              </div>
              <div className="price-row">
                <span>Platform fee</span>
                <span>₹3</span>
              </div>
              <div className="price-row price-total">
                <span>Total Amount</span>
                <span className="amount">₹658</span>
              </div>
              <div className="price-row">
                <span>• Cash On Delivery:</span>
                <span>₹658.0</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Ordertrack;
