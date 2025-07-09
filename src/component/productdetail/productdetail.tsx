import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import Specifications from './Specifications';
import ReviewsSection from './ReviewsSection';
import QAandFAQSection from './Q&A_FAQs';
import SimilarProducts from './SimilarProducts';

const Productdetail: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && contentRef.current.scrollHeight > 650) {
      setShowToggle(true);
    }
  }, []);

  return (
    <div className="profile-container py-5 bg-light">
      <Container fluid="lg">
        <Row className="gy-4 gx-4 align-items-start">
          {/* Left Column - Image Gallery */}
          <Col lg={5}>
            <Card className="card-shadow-sm p-3 border-0 rounded-4">
              <ImageGallery />
            </Card>
          </Col>

          {/* Right Column - Product Info */}
          <Col lg={7}>
            <Card className="card-shadow-sm p-4 border-0 rounded-4 position-relative">
              <div
                className={`card-content ${expanded ? 'expanded' : ''}`}
                ref={contentRef}
                style={{
                  maxHeight: expanded ? 'none' : '650px',
                  overflow: 'hidden',
                  transition: 'max-height 0.5s ease',
                }}
              >
                <ProductInfo
                  title="GharSoaps Magic Soap Sandal Wood And Saffron for DeTan and Glowing Brightening Skin (100 g)"
                  price={155}
                  originalPrice={499}
                  discount={68}
                  weight="100"
                  rating={4.0}
                  totalRatings={188650}
                  reviews={6883}
                  offers={[
                    'Get extra 40% off up to ₹52',
                    'Get extra 51% off (inclusive of coupon)',
                    '100% Cashback up to ₹500 on Axis SuperMoney',
                    '5% Cashback on Flipkart Axis Bank Credit Card',
                  ]}
                  deliveryDate="28 Jun, Saturday"
                  onHide={() => { }}
                />
              </div>
              {showToggle && (
                <div
                  className="text-center mt-3"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? (
                    <BsChevronUp size={24} className="text-primary arrow-icon" />
                  ) : (
                    <BsChevronDown size={24} className="text-primary arrow-icon bounce" />
                  )}
                </div>
              )}
            </Card>
          </Col>
        </Row>

        {/* Specifications and Reviews */}
        <Row className="mt-5 gx-4">
          <Col lg={6}>
            <Card className="border-0 rounded-4 shadow-sm p-4">
              <Specifications />
            </Card>
          </Col>
          <Col lg={6}>
            <Card className="border-0 rounded-4 shadow-sm p-4">
              <ReviewsSection />
            </Card>
          </Col>
        </Row>

        {/* Q&A and FAQs */}
        <Row className="mt-5 gx-4">
          <Col>
            <QAandFAQSection />
          </Col>
        </Row>

        {/* Similar Products */}
        <Row className="mt-5 gx-4">
          <Col>
            <SimilarProducts />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Productdetail;