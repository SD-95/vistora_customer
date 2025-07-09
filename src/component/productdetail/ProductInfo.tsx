import React, { useState } from 'react';
import { Badge, Button, Modal, FormControl, Row, Col } from 'react-bootstrap';
import { FaTag, FaTruck, FaStore, FaSyncAlt, FaQuestionCircle, FaBolt, FaTools } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { BsChevronRight, BsCartPlus, BsLightningChargeFill } from 'react-icons/bs';

interface ProductInfoProps {
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  weight: string;
  rating: number;
  totalRatings: number;
  reviews: number;
  offers: string[];
  deliveryDate: string;
  onHide: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  price,
  originalPrice,
  discount,
  weight,
  rating,
  totalRatings,
  reviews,
  offers,
  deliveryDate,
  onHide
}) => {
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [showSellers, setShowSellers] = useState(false);

  const sellers = [
    {
      seller: "Ezig",
      rating: "4.1",
      policy: "7 Days Replacement Policy",
      price: "₹1,399",
      originalPrice: "₹5,999",
      discount: "76% off",
      emi: "EMI From ₹127",
      cashback: "100% Cashback up to ₹500 on Axis Bank SuperMoney Rupay CC UPI transactions",
      offers: "6 more offers",
      delivery: "Delivery by 28 Jun, Saturday via Flipkart Logistics",
    },
    {
      seller: "TBL Online",
      rating: "4.3",
      policy: "7 Days Replacement Policy",
      price: "₹1,399",
      originalPrice: "₹5,999",
      discount: "76% off",
      emi: "EMI From ₹127",
      cashback: "100% Cashback up to ₹500 on Axis Bank SuperMoney Rupay CC UPI transactions",
      offers: "6 more offers",
      delivery: "Delivery by 29 Jun, Sunday via Ecom Express",
    },
  ];


  return (
    <div className="product-info">
      <h4 className="product-title">{title}</h4>

      <div className="product-rating mb-2">
        <Badge bg="success">{rating} ★</Badge>
        <span className="text-muted ms-2">
          {totalRatings.toLocaleString()} Ratings & {reviews} Reviews
        </span>
      </div>

      <div className="product-price mt-1">
        <span className="price fw-bold fs-4 text-dark">₹{price}</span>
        <span className="original-price text-muted ms-2 text-decoration-line-through">₹{originalPrice}</span>
        <span className="discount text-success ms-2">{discount}% off</span>
        <div className="price-per-100g text-muted mt-1">@₹{(price / parseInt(weight)).toFixed(0)}/100g</div>
      </div>

      <div className="offers mt-3">
        <strong>Available offers</strong>
        <ul className="offer-list ps-3 mt-2">
          {offers.map((offer, index) => (
            <li key={index}>
              <FaTag className="me-2 text-success" />
              {offer}
            </li>
          ))}
        </ul>
      </div>

      <div className="delivery-section mt-4 p-3 border rounded bg-light">
        <Row>
          {/* Left Column – Quantity */}
          <Col md={6}>
            <div className="quantity-options">
              <h6 className="mb-2 text-dark fw-semibold">Quantity</h6>
              <div className="d-flex gap-2 flex-wrap">
                <Button variant="outline-secondary" size="sm">100 g</Button>
                <Button variant="outline-secondary" size="sm">2 x 100 g</Button>
                <Button variant="outline-secondary" size="sm">3 x 100 g</Button>
              </div>
            </div>
          </Col>

          {/* Right Column – Delivery with Vertical Divider */}
          <Col md={6} className="border-start ps-4 delivery-right-column">
            <div className="delivery-input-wrapper">
              <MdLocationOn size={20} className="text-secondary me-2" />
              <div className="input-border-wrapper d-flex align-items-center">
                <FormControl
                  placeholder="Enter Delivery Pincode"
                  size="sm"
                  className="custom-pincode-input"
                />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="custom-check-btn"
                >
                  Check
                </Button>
              </div>
            </div>

            <div className="mt-2 d-flex align-items-start">
              <FaTruck className="me-2 text-secondary mt-1" />
              <div>
                <div className="d-flex align-items-center">
                  Delivery by <strong className="ms-1">{deliveryDate}</strong>
                  <FaQuestionCircle
                    className="ms-2 text-muted border rounded-circle p-1"
                    size={23}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowShippingInfo(true)}
                  />
                </div>
                <div className="text-muted small mt-1">if ordered before 10:59 AM</div>
                <Button
                  variant="link"
                  size="sm"
                  className="ps-0 text-decoration-none"
                  onClick={() => setShowDeliveryInfo(true)}
                >
                  View Details <BsChevronRight />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>


      <div className="row mt-4 g-0 border-top pt-4">
        {/* Highlights */}
        <div className="col-md-4 px-3">
          <h6><FaBolt className="me-2 text-warning" />Highlights</h6>
          <ul className="ps-3 text-muted mb-0">
            <li>Cordless</li>
            <li>1 Speed Setting</li>
            <li>Rechargeable</li>
            <li>Waterproof</li>
          </ul>
        </div>

        {/* Services */}
        <div className="col-md-4 px-3 border-start highlight-divider">
          <h6><FaTools className="me-2 text-info" />Services</h6>
          <ul className="ps-3 text-muted mb-0">
            <li>12 month warranty with product registration</li>
            <li>Cash on Delivery available</li>
          </ul>
        </div>

        {/* Seller */}
        <div className="col-md-4 px-3 border-start highlight-divider">
          <h6><FaStore className="me-2 text-secondary" />Seller</h6>
          <p className="mb-1 text-muted">Noymi <Badge bg="secondary">3.7</Badge></p>
          <p className="text-muted mb-1">
            <FaSyncAlt className="me-1 text-secondary" />7 Days Return Policy
          </p>
          <Button
            variant="link"
            size="sm"
            className="ps-0 text-decoration-none"
            onClick={() => setShowSellers(true)}
          >
            See other sellers <BsChevronRight />
          </Button>
        </div>
      </div>

      <div className="description mt-4">
        <h6>Description</h6>
        <p className="text-muted small">
          Cordless shaver for men offers a smooth shaving experience. Its waterproof design (IPX7) makes it usable in the shower or over the sink. Rechargeable battery offers up to 90 minutes of usage. Comes with various attachments for full body grooming and nose trimming. Ideal for both wet and dry shaving, and compact for travel.
        </p>
      </div>

      {/* Offcanvas for Seller availibility */}

      <Modal show={showSellers} onHide={onHide} fullscreen centered className="seller-modal">
        <Modal.Header closeButton>
          <Modal.Title>All Sellers</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          <div className="d-flex align-items-start mb-3">
            <img
              src="/path-to-image.jpg" // Replace with actual image path or state
              alt="Product"
              width={64}
              height={64}
              className="me-3 rounded border"
            />
            <div>
              <h6 className="fw-semibold text-dark mb-1">
                Noise Colorfit Icon 2 1.8'' Display with Bluetooth Calling, AI Voice Assistant Smartwatch
              </h6>
              <p className="text-muted small mb-0">4.1 ★ (7,64,388 Ratings)</p>
            </div>
          </div>

          {/* Column Labels */}
          <Row className="px-2 mb-3 text-dark" style={{ fontWeight: 600, fontSize: '0.95rem', fontFamily: 'Segoe UI, sans-serif' }}>
            <Col md={3}>Seller</Col>
            <Col md={3}>Price</Col>
            <Col md={3}>Delivery</Col>
            <Col md={3} className="text-center">Action</Col>
          </Row>

          {sellers.map((item, idx) => (
            <Row key={idx} className="mb-4 border rounded shadow-sm bg-white mx-0 py-3 gx-4">
              {/* Seller Info */}
              <Col md={3}>
                <div className="d-flex align-items-center mb-1">
                  <h6 className="mb-0 me-2">{item.seller}</h6>
                  <Badge bg="primary" className="small">{item.rating} ★</Badge>
                </div>
                <p className="text-muted small mb-0">{item.policy}</p>
              </Col>

              {/* Price Info */}
              <Col md={3}>
                <div className="fw-bold text-dark fs-6">{item.price}</div>
                <div className="text-muted text-decoration-line-through small">{item.originalPrice}</div>
                <div className="text-success fw-semibold small">{item.discount}</div>
                <p className="text-muted small mb-1">{item.emi}</p>
                <p className="text-muted small mb-0">{item.cashback}</p>
                <span className="text-primary small">{item.offers}</span>
              </Col>

              {/* Delivery Info */}
              <Col md={3}>
                <p className="text-muted small mb-2">
                  <strong>Delivery:</strong><br />
                  {item.delivery}
                </p>
                <p className="text-muted small mb-0">
                  Shipping charges and timing may vary by location and seller.
                </p>
              </Col>

              {/* Action Buttons */}
              <Col md={3} className="d-flex justify-content-center align-items-center">
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="d-flex align-items-center gap-1 px-2"
                  >
                    <BsCartPlus /> Cart
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="d-flex align-items-center gap-1 px-2"
                  >
                    <BsLightningChargeFill /> Buy
                  </Button>
                </div>
              </Col>
            </Row>
          ))}
        </Modal.Body>
      </Modal>

      {/* Delivery Info Modal */}
      <Modal show={showDeliveryInfo} onHide={() => setShowDeliveryInfo(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delivery & Installation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Delivery by:</strong> Tomorrow, Sunday</p>
          <p><strong>Installation Details:</strong> This product doesn't require installation</p>
          <p><strong>Shipping Charges For Flipkart Assured Items:</strong></p>
          <p>Shipping charges are calculated based on the number of units, distance and delivery date. Delivery charges if applicable will be shown on the product page and cart.</p>
        </Modal.Body>
      </Modal>

      {/* Shipping Info Modal */}
      <Modal show={showShippingInfo} onHide={() => setShowShippingInfo(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Shipping Charges Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Shipping Charges For Non Flipkart Assured Items:</strong></p>
          <p>Shipping charges are calculated based on the number of units, distance and delivery date.</p>
          <p>For Plus as well as Non-Plus customers, Seller will decide shipping charges for all non-FAssured items.</p>
          <p><strong>Shipping Policy of Flipkart:</strong></p>
          <p>In case your order is not delivered even after the delivery confirmation email/SMS is shared with you, please contact us within 7 days to report this issue. Issue reported after 7 days of delivery confirmation email/SMS being sent will be automatically rejected.</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductInfo;
