import { useState } from 'react';
import {
  Tab,
  Nav,
  Card,
  Row,
  Col,
  ProgressBar,
  Button,
  Alert,
  Form,
  Modal,
  InputGroup,
  Collapse,
  Badge,
} from 'react-bootstrap';
import {
  FaUserAlt,
  FaMapMarkedAlt,
  FaClipboardList,
  FaCreditCard,
  FaCheckCircle,
  FaTruck,
  FaBell,
  FaStar,
  FaInfoCircle,
  FaBoxOpen,
  FaArrowLeft,
  FaPlus
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillWarning } from 'react-icons/ai';
import { LogOut } from 'lucide-react';
import { MdEdit, MdLocationOn, MdSecurity } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useLogout } from '../../layouts/authentication/LogoutContext';
import product from '../../assets/images/product/shop_2.jpg'

const steps = [
  { key: 'login', label: 'Login confirmation', icon: <FaUserAlt /> },
  { key: 'address', label: 'Address confirmation', icon: <FaMapMarkedAlt /> },
  { key: 'summary', label: 'Order Summary', icon: <FaClipboardList /> },
  { key: 'payment', label: 'Payment Option', icon: <FaCreditCard /> },
];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(Array(steps.length).fill(false));
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [showEdit, setShowEdit] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(true);
  const [newAddressMode, setNewAddressMode] = useState(false);
  const [showOpenBoxModal, setShowOpenBoxModal] = useState(false);
  const [expandedPayment, setExpandedPayment] = useState<string>('card');
  const [showUPIInput, setShowUPIInput] = useState(false);
  const [codConfirmed, setCodConfirmed] = useState(false);

  const { handleLogout } = useLogout();

  const handleContinue = () => {
    if (currentStep === 2) {
      setShowOpenBoxModal(true);
      return;
    }
    if (currentStep < steps.length - 1) {
      const updated = [...completedSteps];
      updated[currentStep] = true;
      setCompletedSteps(updated);
      setDirection('forward');
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection('backward');
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleAcceptAndContinue = () => {
    setShowOpenBoxModal(false);
    const updated = [...completedSteps];
    updated[currentStep] = true;
    setCompletedSteps(updated);
    setCurrentStep(prev => prev + 1);
  };

  const progressValue = ((currentStep) / (steps.length - 1)) * 100;

  const [address, setAddress] = useState({
    name: "Mr Somes Dash",
    type: "HOME",
    phone: "8895319373",
    addressLine: "House no. 82090, Village Dandapadar, Baliguda, Odisha",
    pincode: "762103",
    locality: "Village Dandapadar",
    city: "Baliguda",
    state: "Odisha",
    landmark: "Infront of sevashram school",
    alternatePhone: "9438030412"
  });

  const handleSave = () => {
    setShowEdit(false);
  };

  const handleCancel = () => {
    setShowEdit(false);
  };

 const fadeMotion = {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.3 }
  };


  return (
    <div className="checkout-wrapper container py-5">
      <Tab.Container activeKey={steps[currentStep].key}>
        <div className="checkout-progress mb-4 px-2">
          <Row className="align-items-center gx-0">
            {steps.map((step, index) => (
              <Col key={step.key} className="text-center">
                <Nav.Item>
                  <Nav.Link
                    eventKey={step.key}
                    className={`checkout-step ${currentStep === index ? 'active' : ''}`}
                    onClick={() => {
                      if (completedSteps[index] || index === currentStep) {
                        setDirection(index > currentStep ? 'forward' : 'backward');
                        setCurrentStep(index);
                      }
                    }}
                  >
                    <div className="step-icon">
                      {completedSteps[index] && index !== currentStep ? <FaCheckCircle color="green" /> : step.icon}
                    </div>
                    <div className="step-label">{step.label}</div>
                  </Nav.Link>
                </Nav.Item>
              </Col>
            ))}
          </Row>
          <ProgressBar now={progressValue} className="mt-3 progress-track" />
        </div>

        <Tab.Content>
          <AnimatePresence mode="wait">
            <Tab.Pane eventKey={steps[currentStep].key} key={steps[currentStep].key}>
              <motion.div
                key={steps[currentStep].key}
                initial={{ x: direction === 'forward' ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === 'forward' ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="checkout-card shadow-lg p-4">
                  {steps[currentStep].key === 'login' ? (
                    <>
                      <Row>
                        <Col md={6} className="position-relative pe-4 border-end d-flex flex-column justify-content-between">
                          <div>
                            <p><strong>Name:</strong> Somes Dash</p>
                            <p><strong>Phone:</strong> 8895319373</p>
                          </div>
                          <div className="text-start">
                            <Button size='sm' className="text-white fw-semibold" style={{ cursor: 'pointer' }} onClick={handleLogout}><LogOut size={24} /> Logout & Sign in to another account</Button>
                          </div>
                        </Col>
                        {/* Show hr only on small screens */}
                        <div className="d-block d-md-none my-3">
                          <hr />
                        </div>
                        <Col md={6}>
                          <p className="text-muted fw-semibold">Advantages of our secure login</p>
                          <p><FaTruck className="text-primary me-2" /> Easily Track Orders, Hassle free Returns</p>
                          <p><FaBell className="text-primary me-2" /> Get Relevant Alerts and Recommendation</p>
                          <p><FaStar className="text-primary me-2" /> Wishlist, Reviews, Ratings and more.</p>
                        </Col>
                      </Row>
                      <Alert variant="warning" className="mt-2">
                        <AiFillWarning size={24} color="orange" /> Please note that upon clicking "Logout" you will lose all items in cart and will be redirected to Flipkart home page.
                      </Alert>
                      <hr />
                    </>
                  ) : steps[currentStep].key === 'address' ? (
                    <>
                      {/* Add New Address Form */}
                      {newAddressMode && (
                        <Card className="bg-light p-3 mb-3 border border-primary">
                          <h6 className="fw-semibold mb-3">Add New Address</h6>
                          {/* You can extract this as a shared form component */}
                          <Form className="bg-light p-3 rounded">
                            <Button variant="primary" className="mb-3">
                              <MdLocationOn style={{ color: 'white', fontSize: '1.5rem' }} /> Use my current location
                            </Button>
                            <Row className="g-2">
                              <Col md={6}><Form.Control placeholder="Name" /></Col>
                              <Col md={6}><Form.Control placeholder="10-digit mobile number" /></Col>
                              <Col md={6}><Form.Control placeholder="Pincode" /></Col>
                              <Col md={6}><Form.Control placeholder="Locality" /></Col>
                              <Col md={12}><Form.Control placeholder="Address (Area and Street)" /></Col>
                              <Col md={6}><Form.Control placeholder="City/District/Town" /></Col>
                              <Col md={6}><Form.Select defaultValue="Odisha"><option>Odisha</option></Form.Select></Col>
                              <Col md={6}><Form.Control placeholder="Landmark (Optional)" /></Col>
                              <Col md={6}><Form.Control placeholder="Alternate Phone (Optional)" /></Col>
                            </Row>
                            <div className="mt-3">
                              <Form.Check type="radio" inline label="Home (All day delivery)" name="type" defaultChecked />
                              <Form.Check type="radio" inline label="Work (Delivery between 10 AM - 5 PM)" name="type" />
                            </div>
                            <div className="d-flex gap-3 mt-4">
                              <Button variant="success">SAVE AND DELIVER HERE</Button>
                              <Button variant="link" onClick={() => setNewAddressMode(false)}>CANCEL</Button>
                            </div>
                          </Form>
                        </Card>
                      )}

                      {/* Button to Add New Address */}
                      {!newAddressMode && (
                        <div className="mb-3">
                          <Button variant="outline-primary" onClick={() => setNewAddressMode(true)}>+ Add New Address</Button>
                        </div>
                      )}

                      {/* Existing Address Card */}
                      <Card className="bg-light p-3 mb-3">
                        <Row className="align-items-start">
                          <Col xs={1} className="pt-2">
                            <Form.Check type="radio" name="selectedAddress" checked={selectedAddress} onChange={() => setSelectedAddress(true)} />
                          </Col>
                          <Col xs={10}>
                            <p className="mb-1">
                              <strong>{address.name}</strong>
                              <span className="badge bg-secondary ms-2">{address.type}</span>
                              <strong className="ms-2">{address.phone}</strong>
                            </p>
                            <p className="mb-1">{address.addressLine} - <strong>{address.pincode}</strong></p>
                          </Col>
                          <Col xs={1} className="text-end">
                            <Button variant="link" className="p-0 text-primary fw-bold" onClick={() => setShowEdit(!showEdit)}>
                              <MdEdit size={18} />
                            </Button>
                          </Col>
                        </Row>

                        {/* Collapse Section for Inline Editing */}
                        <Collapse in={showEdit}>
                          <div>
                            <Form className="bg-white p-3 rounded mt-3 border">
                              <Button variant="primary" className="mb-3">
                                <MdLocationOn style={{ color: 'white', fontSize: '1.5rem' }} /> Use my current location
                              </Button>
                              <Row className="g-2">
                                <Col md={6}>
                                  <Form.Control
                                    placeholder="Name"
                                    value={address.name}
                                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                                  />
                                </Col>
                                <Col md={6}>
                                  <Form.Control
                                    placeholder="10-digit mobile number"
                                    value={address.phone}
                                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                                  />
                                </Col>
                                <Col md={6}>
                                  <Form.Control
                                    placeholder="Pincode"
                                    value={address.pincode}
                                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                                  />
                                </Col>
                                <Col md={6}>
                                  <Form.Control
                                    placeholder="Locality"
                                    value={address.locality}
                                    onChange={(e) => setAddress({ ...address, locality: e.target.value })}
                                  />
                                </Col>
                                <Col md={12}>
                                  <Form.Control
                                    placeholder="Address (Area and Street)"
                                    value={address.addressLine}
                                    onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                                  />
                                </Col>
                                <Col md={6}>
                                  <Form.Control
                                    placeholder="City/District/Town"
                                    value={address.city}
                                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                  />
                                </Col>
                                <Col md={6}>
                                  <Form.Select
                                    value={address.state}
                                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                                  >
                                    <option>Odisha</option>
                                    <option>Andhra Pradesh</option>
                                    <option>Bihar</option>
                                  </Form.Select>
                                </Col>
                                <Col md={6}>
                                  <Form.Control
                                    placeholder="Landmark (Optional)"
                                    value={address.landmark}
                                    onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                                  />
                                </Col>
                                <Col md={6}>
                                  <Form.Control
                                    placeholder="Alternate Phone (Optional)"
                                    value={address.alternatePhone}
                                    onChange={(e) => setAddress({ ...address, alternatePhone: e.target.value })}
                                  />
                                </Col>
                              </Row>
                              <div className="mt-3">
                                <Form.Check type="radio" inline label="Home (All day delivery)" name="type" defaultChecked />
                                <Form.Check type="radio" inline label="Work (Delivery between 10 AM - 5 PM)" name="type" />
                              </div>
                              <div className="d-flex gap-3 mt-4">
                                <Button variant="warning" onClick={handleSave}>SAVE AND DELIVER HERE</Button>
                                <Button variant="link" onClick={handleCancel}>CANCEL</Button>
                              </div>
                            </Form>
                          </div>
                        </Collapse>
                      </Card>
                    </>
                  ) : steps[currentStep].key === 'summary' ? (
                    <>
                      <Row className="align-items-start">
                        <Col md={8} className="d-flex">
                          <img src={product} alt="product" className="img-fluid me-3" />
                          <div>
                            <h5 className="fw-semibold">Ramya METRO 2 Way Bib Cock Tap With Soft Health Faucet</h5>
                            <p className="text-muted mb-1">Wall Mount Installation Type</p>
                            <p className="mb-1">
                              Seller: <span className="text-primary">RamyaSanitryWarePvtLmt</span> <span className="text-success ms-2 fw-semibold">Assured</span>
                            </p>
                            <div className="d-flex align-items-center gap-3">
                              <del className="text-muted">₹2,999</del>
                              <span className="fw-bold text-dark">₹789</span>
                              <span className="text-success fw-bold">73% Off</span>
                              <span className="text-success">3 offers available</span>
                              <FaInfoCircle className="text-success" />
                            </div>
                            <div className="text-muted mt-1 small">Or Pay ₹750 + <span className="fw-bold">🪙 39</span></div>
                            <div className="d-flex align-items-center mt-3">
                              <Button variant="outline-secondary" size="sm">-</Button>
                              <span className="mx-2">1</span>
                              <Button variant="outline-secondary" size="sm">+</Button>
                              <Button variant="link" className="text-danger fw-bold ms-4">REMOVE</Button>
                            </div>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="text-end text-success fw-semibold mb-2">Delivery by Sun Jun 29</div>
                          <div className="d-flex align-items-start">
                            <FaBoxOpen className="text-warning me-2" style={{ fontSize: '1.5rem' }} />
                            <div>
                              <p className="mb-1"><strong>Open Box Delivery is eligible for this item.</strong> You will receive a confirmation post payment.</p>
                              <span className="text-primary fw-bold" style={{ cursor: 'pointer' }}>Know More</span>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Alert variant="success" className="mt-4">
                        Order confirmation email will be sent to <strong>somes.dash1995@gmail.com</strong>
                      </Alert>
                      <hr />
                    </>
                  ) : steps[currentStep].key === 'payment' ? (
                    <>
                      <div className="d-flex align-items-center mb-4">
                        <FaArrowLeft
                          className="me-2 text-primary"
                          style={{ cursor: 'pointer' }}
                          onClick={() => { setDirection('backward'); setCurrentStep(2) }}
                        />
                        <span className="fw-bold text-primary"
                          onClick={() => { setDirection('backward'); setCurrentStep(2) }}
                          style={{ cursor: 'pointer' }}>
                          Cancel payment process
                        </span>
                        <Badge className='ms-auto'><MdSecurity style={{ color: 'white', fontSize: '1.2rem' }} />Secure payment process</Badge>
                      </div>
                      <Row>
                        <Col md={6}>
                          <h5 className="fw-semibold mb-3">Select Payment Method</h5>
                          <div className="payment-methods">
                            {/* Credit / Debit Card */}
                            <Card className="mb-3">
                              <Card.Header onClick={() => setExpandedPayment('card')} style={{ cursor: 'pointer' }}>
                                💳 Credit / Debit Card
                              </Card.Header>
                              {expandedPayment === 'card' && (
                                <motion.div {...fadeMotion}>
                                <Card.Body>
                                  <Alert variant="warning">Note: Please ensure your card can be used for online transactions.</Alert>
                                  <Form>
                                    <Form.Group className="mb-3">
                                      <Form.Label>Card Number</Form.Label>
                                      <Form.Control type="text" placeholder="Enter card number" />
                                    </Form.Group>
                                    <Row>
                                      <Col><Form.Control placeholder="MM/YY" /></Col>
                                      <Col><Form.Control placeholder="CVV" /></Col>
                                    </Row>
                                    <Button variant="warning" className="mt-3 w-100">Pay ₹723</Button>
                                  </Form>
                                </Card.Body>
                                </motion.div>
                              )}
                            </Card>

                            {/* UPI */}
                            <Card className="mb-3">
                              <Card.Header onClick={() => setExpandedPayment('upi')} style={{ cursor: 'pointer' }}>
                                📱 UPI
                              </Card.Header>
                              {expandedPayment === 'upi' && (
                                <motion.div {...fadeMotion}>
                                <Card.Body>
                                  <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span className="fw-semibold">Add new UPI</span>
                                    <FaPlus onClick={() => setShowUPIInput(!showUPIInput)} style={{ cursor: 'pointer' }} />
                                  </div>
                                  {showUPIInput && (
                                    <InputGroup className="mb-3">
                                      <Form.Control placeholder="Enter UPI ID" />
                                      <Button variant="outline-primary">Verify</Button>
                                    </InputGroup>
                                  )}
                                  <Card className="mb-2 p-2 border">
                                    <Form.Check type="checkbox" label="somes.dash@upi" />
                                  </Card>
                                  <Card className="mb-2 p-2 border">
                                    <Form.Check type="checkbox" label="somesdash1995@ybl" />
                                  </Card>
                                  <Button variant="warning" className="mt-3 w-100">Pay ₹723</Button>
                                </Card.Body>
                                </motion.div>
                              )}
                            </Card>

                            {/* Net Banking */}
                            <Card className="mb-3">
                              <Card.Header onClick={() => setExpandedPayment('netbanking')} style={{ cursor: 'pointer' }}>
                                🏦 Net Banking
                              </Card.Header>
                              {expandedPayment === 'netbanking' && (
                                <motion.div {...fadeMotion}>
                                <Card.Body>
                                  <Form.Check type="checkbox" label="State Bank of India" className="mb-2" />
                                  <Form.Check type="checkbox" label="HDFC Bank" className="mb-2" />
                                  <Form.Check type="checkbox" label="ICICI Bank" className="mb-2" />
                                  <Form.Check type="checkbox" label="Axis Bank" className="mb-2" />
                                  <Form.Check type="checkbox" label="Punjab National Bank" className="mb-2" />
                                  <Button variant="warning" className="mt-3 w-100">Pay ₹723</Button>
                                </Card.Body>
                                </motion.div>
                              )}
                            </Card>

                            {/* Cash on Delivery */}
                            <Card className="mb-3">
                              <Card.Header onClick={() => setExpandedPayment('cod')} style={{ cursor: 'pointer' }}>
                                💵 Cash on Delivery
                              </Card.Header>
                              {expandedPayment === 'cod' && (
                                <motion.div {...fadeMotion}>
                                <Card.Body>
                                  {!codConfirmed ? (
                                    <>
                                      <Alert variant="info">For COD handling fees + platform fees will be charged extra.</Alert>
                                      <Form.Control className="mb-3" value="889531" disabled readOnly />
                                      <Form.Control className="mb-3" placeholder="Enter last 4 digits" maxLength={4} />
                                      <Button onClick={() => setCodConfirmed(true)} variant="warning" className="w-100">Confirm</Button>
                                    </>
                                  ) : (
                                    <>
                                      <Form.Control className="mb-3" placeholder="Enter OTP" maxLength={4} />
                                      <Button variant="outline-success" className="mb-3">Verify OTP</Button>
                                      <InputGroup className="mb-3">
                                        <Form.Control placeholder="Enter Captcha" />
                                        <Button variant="outline-primary">Verify</Button>
                                      </InputGroup>
                                      <Button as={Link as any} to='order-page' variant="success" className="w-100">Place Order</Button>
                                    </>
                                  )}
                                </Card.Body>
                                </motion.div>
                              )}
                            </Card>
                          </div>
                        </Col>
                        <Col md={6}>
                          <Card className="p-3">
                            <h6 className="fw-bold">Price Details</h6>
                            <div className="d-flex justify-content-between">
                              <span>Price (1 item)</span><span>₹789</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <span>Platform Fee</span><span>₹4</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold">
                              <span>Total Payable</span><span>₹793</span>
                            </div>
                            <p className="text-success mt-2">Your Total Savings on this order ₹2,206</p>
                          </Card>
                          {/* ✅ OUTSIDE THE CARD BELOW */}
                          <div className="bg-white p-3 rounded shadow-sm border mt-3 mb-3">
                            <div className="d-flex align-items-start">
                              <div className="me-2 mt-1">
                                <MdSecurity style={{ color: '#2e7d32', fontSize: '1.8rem' }} />
                              </div>
                              <div>
                                <p className="mb-1 fw-semibold text-dark">
                                  Safe and Secure Payments
                                </p>
                                <p className="text-muted small mb-0">
                                  Easy returns. 100% Authentic products from trusted sellers.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-light p-3 rounded shadow-sm border">
                            <small className="text-muted d-block text-center">
                              By continuing with your order, you confirm that you are <strong>above 18 years of age</strong> and you agree to Flipkart’s{' '}
                              <Link to="#" className="text-primary text-decoration-none fw-medium">Terms of Use</Link> and{' '}
                              <Link to="#" className="text-primary text-decoration-none fw-medium">Privacy Policy</Link>.
                            </small>
                          </div>
                        </Col>
                      </Row>
                    </>
                  ) : null}
                  <div className="d-flex justify-content-between mt-4">
                    {currentStep === 0 ? <div /> : <>
                      <Button variant="outline-secondary" disabled={currentStep === 0} onClick={handleBack}>Back</Button>
                    </>}
                    {currentStep !== 3 && (
                      <Button variant="warning" onClick={handleContinue}>
                        {steps[currentStep].key === 'login' ? 'Continue & Checkout' :
                          steps[currentStep].key === 'address' ? 'Deliver Here' :
                            steps[currentStep].key === 'summary' ? 'Continue' : 'Continue'}
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            </Tab.Pane>
          </AnimatePresence>
        </Tab.Content>
      </Tab.Container>

      <Modal show={showOpenBoxModal} onHide={() => setShowOpenBoxModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rest assured with open box delivery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-unstyled">
            <li className="mb-3">📦 Ask the Agent to open the package in front of you, check for Damages, Parts Missing or Wrong Item</li>
            <li className="mb-3">🔐 Share the OTP after checking the product for these issues</li>
            <li className="mb-3">✅ After OTP is shared, Returns will NOT be accepted for Damages, Parts Missing or Wrong item</li>
          </ul>
          <p className="small text-muted">
            Orders placed with '1 Day Delivery' option will not have open-box delivery. 'Working condition' of the product will not be verified during delivery.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAcceptAndContinue}>
            Accept & Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Checkout;

