import React, { useState } from 'react';
import {
  Card,
  Col,
  Row,
  Button,
  Badge,
  Modal,
  ListGroup,
  OverlayTrigger,
  Tooltip,
  ProgressBar,
  Form,
  InputGroup,
  Container,
  Collapse,
} from 'react-bootstrap';
import { FaHeart, FaCheckCircle, FaSearch, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

import pr_1 from '../../assets/images/product/lap_1.jpg';
import pr_2 from '../../assets/images/product/mob_1.jpg';
import pr_3 from '../../assets/images/product/shoe_1.jpg';
import pr_4 from '../../assets/images/product/shop_1.jpg';
import pr_5 from '../../assets/images/product/earbod_1.jpg';
import pr_6 from '../../assets/images/product/headPhone_1.jpg';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  subtitle: string;
  image: string;
  rating: number;
  totalRatings: number;
  finalPrice: number;
  originalPrice: number;
  discount: number;
  bestSeller?: boolean;
  offers: string[];
  variants: string[];
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Magic Sandal Soap',
    subtitle: 'Ayurvedic Skin Care',
    image: pr_1,
    rating: 4.5,
    totalRatings: 1234,
    finalPrice: 155,
    originalPrice: 499,
    discount: 68,
    bestSeller: true,
    offers: [
      '10% off on ICICI Credit Card',
      '₹50 Cashback on PhonePe',
      '5% off on Axis Bank Card',
      'Extra ₹20 off on UPI Payment',
    ],
    variants: ['75g', '100g', '150g'],
  },
  {
    id: 2,
    name: 'Magic Sandal Soap',
    subtitle: 'Ayurvedic Skin Care',
    image: pr_2,
    rating: 4.5,
    totalRatings: 1234,
    finalPrice: 155,
    originalPrice: 499,
    discount: 68,
    bestSeller: true,
    offers: [
      '10% off on ICICI Credit Card',
      '₹50 Cashback on PhonePe',
      '5% off on Axis Bank Card',
      'Extra ₹20 off on UPI Payment',
    ],
    variants: ['75g', '100g', '150g'],
  },
  {
    id: 3,
    name: 'Magic Sandal Soap',
    subtitle: 'Ayurvedic Skin Care',
    image: pr_3,
    rating: 4.5,
    totalRatings: 1234,
    finalPrice: 155,
    originalPrice: 499,
    discount: 68,
    bestSeller: true,
    offers: [
      '10% off on ICICI Credit Card',
      '₹50 Cashback on PhonePe',
      '5% off on Axis Bank Card',
      'Extra ₹20 off on UPI Payment',
    ],
    variants: ['75g', '100g', '150g'],
  },
  {
    id: 4,
    name: 'Magic Sandal Soap',
    subtitle: 'Ayurvedic Skin Care',
    image: pr_4,
    rating: 4.5,
    totalRatings: 1234,
    finalPrice: 155,
    originalPrice: 499,
    discount: 68,
    bestSeller: true,
    offers: [
      '10% off on ICICI Credit Card',
      '₹50 Cashback on PhonePe',
      '5% off on Axis Bank Card',
      'Extra ₹20 off on UPI Payment',
    ],
    variants: ['75g', '100g', '150g'],
  },
  {
    id: 5,
    name: 'Magic Sandal Soap',
    subtitle: 'Ayurvedic Skin Care',
    image: pr_5,
    rating: 4.5,
    totalRatings: 1234,
    finalPrice: 155,
    originalPrice: 499,
    discount: 68,
    bestSeller: true,
    offers: [
      '10% off on ICICI Credit Card',
      '₹50 Cashback on PhonePe',
      '5% off on Axis Bank Card',
      'Extra ₹20 off on UPI Payment',
    ],
    variants: ['75g', '100g', '150g'],
  },
  {
    id: 6,
    name: 'Magic Sandal Soap',
    subtitle: 'Ayurvedic Skin Care',
    image: pr_6,
    rating: 4.5,
    totalRatings: 1234,
    finalPrice: 155,
    originalPrice: 499,
    discount: 68,
    bestSeller: true,
    offers: [
      '10% off on ICICI Credit Card',
      '₹50 Cashback on PhonePe',
      '5% off on Axis Bank Card',
      'Extra ₹20 off on UPI Payment',
    ],
    variants: ['75g', '100g', '150g'],
  },
  {
    id: 7,
    name: 'Magic Sandal Soap',
    subtitle: 'Ayurvedic Skin Care',
    image: pr_6,
    rating: 4.5,
    totalRatings: 1234,
    finalPrice: 155,
    originalPrice: 499,
    discount: 68,
    bestSeller: true,
    offers: [
      '10% off on ICICI Credit Card',
      '₹50 Cashback on PhonePe',
      '5% off on Axis Bank Card',
      'Extra ₹20 off on UPI Payment',
    ],
    variants: ['75g', '100g', '150g'],
  },
  {
    id: 8,
    name: 'Magic Sandal Soap',
    subtitle: 'Ayurvedic Skin Care',
    image: pr_6,
    rating: 4.5,
    totalRatings: 1234,
    finalPrice: 155,
    originalPrice: 499,
    discount: 68,
    bestSeller: true,
    offers: [
      '10% off on ICICI Credit Card',
      '₹50 Cashback on PhonePe',
      '5% off on Axis Bank Card',
      'Extra ₹20 off on UPI Payment',
    ],
    variants: ['75g', '100g', '150g'],
  },
];

const ProductCard: React.FC<{
  product: Product;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
}> = ({ product, hoveredId, setHoveredId }) => {
  const [showModal, setShowModal] = useState(false);

  const visibleOffers = product.offers.slice(0, 3);
  const extraOfferCount = product.offers.length - visibleOffers.length;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div
      className="product-card-wrapper"
      style={{
        position: 'relative',
        height: '100%', // fixed height is critical
      }}
    >
      <div
        className={`shadow-sm border rounded-4 product-card h-100 ${hoveredId === product.id ? 'hovered' : ''
          }`}
        onMouseEnter={() => setHoveredId(product.id)}
        onMouseLeave={() => setHoveredId(null)}
        style={{
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: hoveredId === product.id ? 'scale(1.03)' : 'scale(1)',
          boxShadow: hoveredId === product.id ? '0 12px 30px rgba(0,0,0,0.15)' : 'none',
          zIndex: hoveredId === product.id ? 10 : 1,
          position: hoveredId === product.id ? 'absolute' : 'relative',
          top: hoveredId === product.id ? 0 : 'unset',
          left: hoveredId === product.id ? 0 : 'unset',
          width: '100%',
          backgroundColor: '#fff',
        }}
      >
        {product.bestSeller && <div className="best-seller-badge">Best Seller</div>}
        <Link to='/wishlist' className="wishlist-icon">
          <FaHeart className="text-danger" />
        </Link>

        <Link to={`/product-detail`} className="product-img-wrapper">
          <img src={product.image} alt={product.name} />
        </Link>

        <div className="d-flex flex-column flex-grow-1 px-3 pt-2 pb-3">
          <Link to={`/product-detail`} className="product-name d-block text-decoration-none text-dark">
            {product.name}
          </Link>
          <div className="product-subtitle">{product.subtitle}</div>

          <div className="d-flex align-items-center gap-2 mt-1">
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip className="rating-tooltip">
                  <div className="d-flex flex-column align-items-start text-dark">
                    <div className="d-flex w-100 justify-content-between align-items-center mb-2">
                      <div className="fw-bold text-success" style={{ fontSize: '1.3rem' }}>{product.rating}</div>
                      <div className="text-muted small">({product.totalRatings}) ratings</div>
                    </div>
                    {[5, 4, 3, 2, 1].map(star => (
                      <div key={star} className="d-flex align-items-center w-100 mb-1">
                        <div
                          style={{
                            width: '24px',
                            color: '#333',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                          }}
                          className="me-2"
                        >
                          {star}★
                        </div>
                        <ProgressBar
                          now={Math.random() * 100}
                          className="flex-grow-1"
                          style={{
                            height: '6px',
                            backgroundColor: '#eee',
                          }}
                          variant="success"
                        />
                      </div>
                    ))}
                  </div>
                </Tooltip>
              }
            >
              <Badge bg="success" className="rating-badge">{product.rating}</Badge>
            </OverlayTrigger>

            <span className="text-muted small">({product.totalRatings})</span>

            <span className="assured-badge">
              <FaCheckCircle /> Assured
            </span>
          </div>

          <div className="price-section mt-2">
            <span className="price-final">₹{product.finalPrice}</span>
            <span className="price-original">₹{product.originalPrice}</span>
            <span className="price-discount">{product.discount}% off</span>
          </div>

          {/* Hover Info */}
          {hoveredId === product.id && (
            <div className="card-hover-info">
              {visibleOffers.map((offer, index) => (
                <div key={index} className="offer-text">{offer}</div>
              ))}
              {extraOfferCount > 0 && (
                <div className="offer-text text-decoration-underline" role="button" onClick={handleShowModal}>
                  +{extraOfferCount} more offers
                </div>
              )}

              <div className="variant-list">
                <strong>Available:</strong> {product.variants.join(', ')}
              </div>
            </div>
          )}
        </div>

        {/* Offer Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered className="offer-modal">
          <Modal.Header closeButton>
            <Modal.Title>Available Offers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup variant="flush">
              {product.offers.map((offer, idx) => (
                <ListGroup.Item key={idx}>{offer}</ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};


const CollapsibleSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
        <h6 className="mb-0">{title}</h6>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <Collapse in={open}>
        <div className="mt-2">{children}</div>
      </Collapse>
    </div>
  );
};

const ProductPage: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['75g', '100g']);

  const handleFilterToggle = (filter: string): void => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleRemoveFilter = (filter: string): void => {
    setSelectedFilters(prev => prev.filter(f => f !== filter));
  };

  return (
    <Container className="product-page">
      <Row>

        <Col lg={3}>

          <Card className="mb-3 p-2" style={{ background: '#fff' }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <p className="mb-0 fw-bold">Filters (0)</p>
              <Button variant="link" className="p-0 text-decoration-none">Clear All</Button>
            </div>
            <hr />
            <div className="d-flex flex-wrap gap-2">
              {selectedFilters.slice(0, showMoreFilters ? selectedFilters.length : 2).map((filter, idx) => (
                <Badge key={idx} bg="light" className="text-dark border">
                  {filter}{' '}
                  <FaTimes
                    className="ms-1"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRemoveFilter(filter)}
                  />
                </Badge>
              ))}
            </div>
            {selectedFilters.length > 2 && (
              <div className="mt-2">
                <Button variant="link" onClick={() => setShowMoreFilters(!showMoreFilters)}>
                  {showMoreFilters ? 'View Less' : 'View More'}
                </Button>
              </div>
            )}
          </Card>

          <Card className="filter-card">
            <Card.Body>
              <CollapsibleSection title="Category">
                <div className="ms-2">
                  <div className="fw-bold">Skin Care</div>
                  <div className="ms-3">
                    <div>Soaps</div>
                    <div className="ms-3">
                      <Form.Check label="Sandal Soaps" checked={selectedFilters.includes("Sandal Soaps")} onChange={() => handleFilterToggle("Sandal Soaps")} />
                      <Form.Check label="Herbal Soaps" checked={selectedFilters.includes("Herbal Soaps")} onChange={() => handleFilterToggle("Herbal Soaps")} />
                      <Form.Check label="Aloe Vera Soaps" checked={selectedFilters.includes("Aloe Vera Soaps")} onChange={() => handleFilterToggle("Aloe Vera Soaps")} />
                      <Form.Check label="Charcoal Soaps" checked={selectedFilters.includes("Charcoal Soaps")} onChange={() => handleFilterToggle("Charcoal Soaps")} />
                    </div>

                    <div className="mt-2">Face Care</div>
                    <div className="ms-3">
                      <Form.Check label="Face Wash" checked={selectedFilters.includes("Face Wash")} onChange={() => handleFilterToggle("Face Wash")} />
                      <Form.Check label="Face Scrubs" checked={selectedFilters.includes("Face Scrubs")} onChange={() => handleFilterToggle("Face Scrubs")} />
                      <Form.Check label="Face Creams" checked={selectedFilters.includes("Face Creams")} onChange={() => handleFilterToggle("Face Creams")} />
                      <Form.Check label="Serums" checked={selectedFilters.includes("Serums")} onChange={() => handleFilterToggle("Serums")} />
                    </div>

                    <div className="mt-2">Body Care</div>
                    <div className="ms-3">
                      <Form.Check label="Body Lotions" checked={selectedFilters.includes("Body Lotions")} onChange={() => handleFilterToggle("Body Lotions")} />
                      <Form.Check label="Body Wash" checked={selectedFilters.includes("Body Wash")} onChange={() => handleFilterToggle("Body Wash")} />
                      <Form.Check label="Body Scrubs" checked={selectedFilters.includes("Body Scrubs")} onChange={() => handleFilterToggle("Body Scrubs")} />
                      <Form.Check label="Massage Oils" checked={selectedFilters.includes("Massage Oils")} onChange={() => handleFilterToggle("Massage Oils")} />
                    </div>

                    <div className="mt-2">Sun Protection</div>
                    <div className="ms-3">
                      <Form.Check label="Sunscreen Lotion" checked={selectedFilters.includes("Sunscreen Lotion")} onChange={() => handleFilterToggle("Sunscreen Lotion")} />
                      <Form.Check label="Sunscreen Gel" checked={selectedFilters.includes("Sunscreen Gel")} onChange={() => handleFilterToggle("Sunscreen Gel")} />
                      <Form.Check label="After Sun Cream" checked={selectedFilters.includes("After Sun Cream")} onChange={() => handleFilterToggle("After Sun Cream")} />
                    </div>

                    <div className="mt-2">Lip Care</div>
                    <div className="ms-3">
                      <Form.Check label="Lip Balm" checked={selectedFilters.includes("Lip Balm")} onChange={() => handleFilterToggle("Lip Balm")} />
                      <Form.Check label="Lip Scrub" checked={selectedFilters.includes("Lip Scrub")} onChange={() => handleFilterToggle("Lip Scrub")} />
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection title="Price">
                <Form.Range />
                <div className="d-flex gap-2">
                  <Form.Select size="sm"><option>Min</option></Form.Select>
                  <Form.Select size="sm"><option>Max</option></Form.Select>
                </div>
              </CollapsibleSection>

              <Form.Check type="checkbox" label="Vistaora Assured Products" className="my-2" />

              <CollapsibleSection title="Customer Ratings">
                {[5, 4, 3, 2, 1].map(star => (
                  <Form.Check key={star} type="checkbox" label={`${star}★ & above`} />
                ))}
              </CollapsibleSection>

              <CollapsibleSection title="Brand">
                <InputGroup className="mb-2">
                  <Form.Control placeholder="Search brand" size="sm" style={{ borderRight: 0 }} />
                  <InputGroup.Text style={{ border: '1px solid #FF6F61', background: 'white' }}>
                    <FaSearch color="#FF6F61" />
                  </InputGroup.Text>
                </InputGroup>
                <Form.Check label="GharSoaps" />
                <Form.Check label="Dove" />
                <Form.Check label="Patanjali" />
              </CollapsibleSection>

              <CollapsibleSection title="Discount">
                <Form.Check label="10% or more" />
                <Form.Check label="30% or more" />
              </CollapsibleSection>

              <CollapsibleSection title="Features">
                <Form.Check label="Ayurvedic" />
                <Form.Check label="Herbal" />
              </CollapsibleSection>

              <CollapsibleSection title="Color">
                <Form.Check label="Brown" />
                <Form.Check label="White" />
              </CollapsibleSection>

              <CollapsibleSection title="Availability">
                <Form.Check label="In Stock" />
                <Form.Check label="Out of Stock" />
              </CollapsibleSection>

              <CollapsibleSection title="Offers">
                <Form.Check label="Bank Offer" />
                <Form.Check label="Special Price" />
              </CollapsibleSection>

              <CollapsibleSection title="New Arrivals">
                <Form.Check label="Last 30 Days" />
                <Form.Check label="Last 90 Days" />
              </CollapsibleSection>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>
          <Card className="w-100 p-3 px-4 py-3 shadow-sm rounded border">
            <Row className="mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                  <p className="mb-0 fw-bold">
                    Audio & Video{' '}
                    <small className="text-muted ms-2">
                      (Showing 1 – 40 products of 15,486 products)
                    </small>
                  </p>
                </div>
                <hr className="my-2" />
                <div className="d-flex align-items-center flex-wrap gap-3 mt-2">
                  <span className="fw-semibold me-2 text-secondary">Sort By:</span>
                  <Form.Check
                    inline
                    label="Popularity"
                    name="sort"
                    type="radio"
                    id="sort-popularity"
                  />
                  <Form.Check
                    inline
                    label="Price -- Low to High"
                    name="sort"
                    type="radio"
                    id="sort-low-high"
                  />
                  <Form.Check
                    inline
                    label="Price -- High to Low"
                    name="sort"
                    type="radio"
                    id="sort-high-low"
                  />
                  <Form.Check
                    inline
                    label="Newest First"
                    name="sort"
                    type="radio"
                    id="sort-newest"
                  />
                  <Form.Check
                    inline
                    label="Discount"
                    name="sort"
                    type="radio"
                    id="sort-discount"
                  />
                </div>
              </div>
            </Row>

            <Row className="g-2 product-grid">
              {sampleProducts.map(product => (
                <Col
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                  key={product.id}
                  className="product-col"
                  style={{ position: 'relative' }}
                >
                  <ProductCard
                    product={product}
                    hoveredId={hoveredId}
                    setHoveredId={setHoveredId}
                  />
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
