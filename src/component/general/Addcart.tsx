import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  OverlayTrigger,
  Popover,
  Modal,
  Form,
  Alert
} from 'react-bootstrap';
import { FaInfoCircle, FaMapMarkerAlt, FaShieldAlt, FaBolt, FaCartPlus, FaTrashAlt, FaBoxOpen } from 'react-icons/fa';
import { BsShieldCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import product from '../../assets/images/product/shop_2.jpg'

const renderPopover = (title: string, message: string, price: string) => (
  <Popover id="popover-basic">
    <Popover.Header as="h3">{title}</Popover.Header>
    <Popover.Body className="d-flex justify-content-between">
      <div>{message}</div>
      <div className="fw-bold">{price}</div>
    </Popover.Body>
  </Popover>
);

const OfferPricePopover = () => (
  <Popover id="offer-price-popover" style={{ maxWidth: '350px', overflow: 'hidden' }}>
    <Popover.Body style={{
      maxHeight: '280px',
      overflowY: 'auto',
      paddingRight: '0.5rem'
    }}
      className="offer-scroll">
      {/* Price Breakdown */}
      <div className="d-flex justify-content-between">
        <span>MRP</span>
        <span>₹2,999</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Selling Price</span>
        <span>₹1,099</span>
      </div>
      <div className="d-flex justify-content-between text-success">
        <span>Extra Discount</span>
        <span>− ₹310</span>
      </div>
      <div className="d-flex justify-content-between fw-semibold">
        <span>Special Price</span>
        <span>₹789</span>
      </div>
      <div className="d-flex justify-content-between border-top pt-2 fw-bold">
        <span>Total</span>
        <span>₹789</span>
      </div>

      {/* SuperCoins Alert */}
      <Alert variant="secondary" className="mt-3 py-2 px-3">
        <div className="fw-bold small mb-1">Pay Using SuperCoins</div>
        <div className="d-flex flex-wrap align-items-center gap-2">
          Use SuperCoins at Order Summary and get this product at{' '}
          <Badge bg="success" className="text-white align-middle" style={{ fontSize: '0.75rem' }}>
            ₹710 + 79
          </Badge>
        </div>
      </Alert>

      {/* Save More Offers */}
      <Card className="mt-3">
        <Card.Header className="bg-success text-white p-2 small fw-bold">
          Save more with these offers
        </Card.Header>
        <Card.Body className="p-2 small">
          <ul className="mb-0 ps-3">
            <li>100% Cashback upto ₹500 on Axis Bank SuperMoney Rupay CC UPI transactions on super.money UPI</li>
            <li>5% cashback on Flipkart Axis Bank Credit Card upto ₹4,000 per statement quarter</li>
            <li>5% cashback on Axis Bank Flipkart Debit Card up to ₹750</li>
          </ul>
        </Card.Body>
      </Card>
    </Popover.Body>
  </Popover>
);


const savedProducts = [
  {
    id: 1,
    title: 'im baby Boys & Girls Velcro Sneakers',
    size: '4C',
    color: 'Pink',
    age: '9–12 Months',
    mrp: '₹499',
    price: '₹277',
    discount: '44%',
    payWithCoins: '₹249 + ⚡28',
    image: product
  },
  {
    id: 1,
    title: 'im baby Boys & Girls Velcro Sneakers',
    size: '4C',
    color: 'Pink',
    age: '9–12 Months',
    mrp: '₹499',
    price: '₹277',
    discount: '44%',
    payWithCoins: '₹249 + ⚡28',
    image: product
  },
  // Add more product objects as needed
];

const AddToCart: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Container className="p-4">

      {/* Order placed section */}

      <Row>
        {/* Left Column (col-9) */}

        <Col lg={9}>

          {/* Delivery Address Card */}

          <Card className="mb-3 p-3">
            <Row>
              <Col md={10}>
                <div className="fw-semibold">
                  Deliver to: <span className="fw-bold">Mr Somes Dash, 762103</span> <Badge bg="secondary" text="white">HOME</Badge>
                </div>
                <div className="text-muted">House no. 82090, Village Dandapadar, Baliguda</div>
              </Col>
              <Col md={2} className="text-end">
                <Button variant="outline-primary" size="sm" onClick={handleShow}>Change</Button>
              </Col>
            </Row>
          </Card>

          {/* Product Info Card */}

         
          <Card className="p-3">
            <Card.Body>
              <Row className="p-3 add-to-cart-card">
                {/* Col 2 - Image + Quantity Control */}
                <Col md={2} className="d-flex flex-column align-items-start justify-content-between">
                  <img src={product} alt="product" className="img-fluid" />
                  <div className="d-flex align-items-center mt-3">
                    <Button variant="outline-secondary" size="sm">-</Button>
                    <span className="mx-2">1</span>
                    <Button variant="outline-secondary" size="sm">+</Button>
                  </div>
                </Col>

                {/* Col 7 - Product Info + Action Buttons */}
                <Col md={7}>
                  <div className="fw-semibold">Ramya METRO 2 Way Bib Cock Tap With Soft Health Faucet</div>
                  <div className="text-muted">Wall Mount Installation Type</div>
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <span>
                      Seller: <span className="text-primary">RamyaSanitaryWarePvtLmt</span>
                    </span>
                    <span
                      className="badge bg-primary text-white d-inline-flex align-items-center gap-1 px-2 py-1"
                      style={{ fontSize: '0.7rem', borderRadius: '0.3rem' }}
                    >
                      <FaShieldAlt style={{ fontSize: '0.75rem' }} />
                      Assured
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-1">
                    <del className="text-muted">₹2,999</del>
                    <span className="fw-bold text-dark">₹789</span>
                    <span className="text-success fw-bold">73% Off</span>
                    <span className="text-success">3 offers available</span>
                    <OverlayTrigger
                      trigger="click"
                      placement="right"
                      rootClose
                      overlay={OfferPricePopover()}
                    >
                      <div style={{ display: 'inline-block' }}>
                        <FaInfoCircle className="text-success" style={{ cursor: 'pointer' }} />
                      </div>
                    </OverlayTrigger>
                  </div>
                  <div className="text-muted small mt-1">Or Pay ₹710 + 79 coins</div>

                  {/* Action Buttons Moved Here */}
                  <div className="d-flex gap-2 mt-3">
                    <Button variant="outline-secondary" size="sm" className="py-1 px-1">SAVE FOR LATER</Button>
                    <Button variant="outline-danger" size="sm" className="py-1 px-1">REMOVE</Button>
                  </div>
                </Col>

                {/* Col 3 - Delivery Info & Open Box Info */}
                <Col md={3}>
                  {/* Delivery Date Line */}
                  <div className="fw-semibold text-success mb-3">Delivery by Sun Jun 29</div>

                  {/* Open Box Info */}
                  <div className="d-flex align-items-start gap-2">
                    {/* Icon */}
                    <FaBoxOpen size={64} className="text-warning mt-1" />

                    {/* Text Content */}
                    <div style={{ fontSize: '0.85rem' }}>
                      <div className="text-muted">
                        Open Box Delivery is eligible for this item. You will receive a confirmation post payment.
                      </div>
                      <div className="fw-bold text-primary mt-1" style={{ cursor: 'pointer' }}>
                        Know more
                      </div>
                    </div>
                  </div>
                </Col>

              </Row>

              {/* Place Order Button */}
              <div className="text-end mt-3">
                <Button as={Link as any} to='checkout' variant="warning" className="fw-bold px-4">PLACE ORDER</Button>
              </div>
            </Card.Body>
          </Card>


        </Col>

        {/* Right Column (col-3) */}

        <Col lg={3}>
          <Card className="p-3 mb-2">
            <div className="fw-bold mb-3">PRICE DETAILS</div>
            <div className="d-flex justify-content-between">
              <div>
                Price (1 item)
                <OverlayTrigger
                  trigger="click"
                  placement="left"
                  overlay={renderPopover("Platform Fee", "A non-refundable fee is charged to help keep the platform running smoothly and support app improvements.", "₹4")}
                  rootClose
                >
                  <FaInfoCircle className="ms-1 text-muted info-icon" />
                </OverlayTrigger>
              </div>
              <div>₹2,999</div>
            </div>

            <div className="d-flex justify-content-between">
              <div>Discount</div>
              <div className="text-success">− ₹2,210</div>
            </div>

            <div className="d-flex justify-content-between">
              <div>
                Platform Fee
                <OverlayTrigger
                  trigger="click"
                  placement="left"
                  overlay={renderPopover("Platform Fee", "A non-refundable fee is charged to help keep the platform running smoothly and support app improvements.", "₹4")}
                  rootClose
                >
                  <FaInfoCircle className="ms-1 text-muted info-icon" />
                </OverlayTrigger>
              </div>
              <div>₹4</div>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <div>Total Amount</div>
              <div>₹793</div>
            </div>
            <Alert variant="success" className="mt-2 py-2">
              You will save ₹2,206 on this order
            </Alert>
          </Card>

          <div className="d-flex align-items-start gap-2 text-muted small m-2">
            
            <BsShieldCheck className="text-success" size={25} />
            <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
          </div>
        </Col>

      </Row>

      {/* Second row save for later container */}

      <Card className="p-3 mt-2">
        <h6 className="fw-bold mb-3">Saved for Later ({savedProducts.length})</h6>
        <Row className="g-3">
          {savedProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="p-2 h-100">
                {/* Row 1: Image + Product Info */}
                <div className="d-flex gap-2">
                  <img
                    src={product.image}
                    alt="Saved Product"
                    style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                  />
                  <div className="flex-grow-1">
                    <div className="fw-semibold small">{product.title}</div>
                    <div className="text-muted small">
                      Size: {product.size}, {product.color}, {product.age}
                    </div>
                    <div className="mt-1">
                      <span className="text-muted text-decoration-line-through me-1 small">{product.mrp}</span>
                      <span className="fw-bold me-1 small">{product.price}</span>
                      <span className="text-success small">{product.discount} Off</span>
                    </div>
                    <div className="text-muted small">
                      Or Pay {product.payWithCoins.includes('⚡') ? (
                        <>
                          ₹249 + <FaBolt className="text-warning" style={{ fontSize: '0.8rem' }} /> 28
                        </>
                      ) : product.payWithCoins}
                    </div>
                  </div>
                </div>

                {/* Row 2: Quantity + Buttons */}
                <div className="d-flex justify-content-between align-items-center mt-3 px-1">
                  {/* Quantity Section */}
                  <div className="d-flex align-items-center border rounded px-2 py-1 gap-2">
                    <Button variant="outline-secondary" size="sm" className="py-0 px-2">−</Button>
                    <span className="small">1</span>
                    <Button variant="outline-secondary" size="sm" className="py-0 px-2">+</Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex gap-2 align-items-center">
                    <Button variant="light" className="py-0 px-2" size="sm">
                      <FaCartPlus style={{ fontSize: '1rem', color: '#0d6efd' }} />
                    </Button>
                    <Button variant="light" className="py-0 px-2" size="sm">
                      <FaTrashAlt style={{ fontSize: '1rem', color: '#dc3545' }} />
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Address Modal for 1st row*/}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Body>
          <div className="fw-bold mb-2">Select Delivery Address</div>
          <Card className="p-2 border">
            <Form.Check type="radio" id="address1" name="address" defaultChecked>
              <Form.Check.Input type="radio" name="address" id="address1" />
              <Form.Check.Label htmlFor="address1" className="ms-2 w-100">
                <div className="d-flex flex-column">
                  <div className="fw-bold d-flex align-items-center gap-2">
                    Mr Somes Dash, 762103
                    <Badge bg="secondary" className="text-white px-2 py-1" style={{ fontSize: '0.75rem' }}>
                      HOME
                    </Badge>
                  </div>
                  <div className="text-muted small">House no. 82090, Village Dandapadar, Baliguda</div>
                </div>
              </Form.Check.Label>
            </Form.Check>
          </Card>

          <div className="mt-3">Use pincode to check delivery info</div>
          <div className="d-flex gap-2 mt-2">
            <Form.Control type="text" placeholder="Enter pincode" size="sm" />
            <Button size="sm">Submit</Button>
          </div>
          <div className="d-flex align-items-center gap-2 mt-2">
            <FaMapMarkerAlt className="text-danger" style={{ fontSize: '1.1rem' }} />
            <Button
              variant="light"
              size="sm"
              className="px-2 py-1 border rounded text-muted fw-semibold"
              style={{ textDecoration: 'none', boxShadow: 'none' }}
            >
              Use my current location
            </Button>
          </div>
        </Modal.Body>
      </Modal>


    </Container>
  );
};

export default AddToCart;
