// Updated Profile Component with Full Sections
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal, Collapse, Accordion, Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import _pic from '../../assets/images/profile/profile.jpg';
import { ShoppingBag, Settings, Wallet, Tags, LogOut } from 'lucide-react';
import logo from '../../assets/circle_logo.png';
import { useLogout } from '../../layouts/authentication/LogoutContext';
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: 'Somes',
    lastName: 'Dash',
    gender: 'male',
    email: 'somes.dash1995@gmail.com',
    mobile: '+918895319373'
  });

  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [editAddressMode, setEditAddressMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editedValue, setEditedValue] = useState('');
  const [panCard, setPanCard] = useState('ABCDE1234F');
  const [panEdit, setPanEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [collapseCoupons, setCollapseCoupons] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState<'add' | 'balance' | null>(null);
  const [giftCardDetails, setGiftCardDetails] = useState({ number: '', pin: '' });
  const [dataMap, setDataMap] = useState({
    address: ['123, Street Name, City', '456, Another Street, City'],
    gift: ['Birthday Gift - ₹500', 'Festive Voucher - ₹1000'],
    upi: ['somes@ybl', 'dash@oksbi'],
    cards: ['**** **** **** 1234', '**** **** **** 5678']
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditMode = () => setEditMode(!editMode);
  const toggleEditSectionMode = () => setEditAddressMode(!editAddressMode);

  const toggleSelection = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const startEditing = () => {
    const items = dataMap[activeSection as keyof typeof dataMap];
    if (selectedItems.length === 1) {
      setEditedValue(items[selectedItems[0]]);
      setEditFormVisible(true);
    }
  };

  const cancelEdit = () => {
    setEditFormVisible(false);
    setSelectedItems([]);
  };

  const saveEdit = () => {
    setDataMap((prev) => {
      const updated = [...prev[activeSection as keyof typeof dataMap]];
      updated[selectedItems[0]] = editedValue;
      return { ...prev, [activeSection]: updated };
    });
    cancelEdit();
  };

  const renderCoupons = () => (
    <Card className="profile-card p-3">
      <h5 className="d-flex justify-content-between align-items-center">
        Available Coupons
      </h5>
      {[...Array(5).keys()].map((i) => (
        <Card key={i} className="mb-3 p-3 border rounded ticket-card" style={{ borderColor: '#ccc', borderRadius: '10px' }}>
          {/* First row: Coupon title + Valid till */}
          <div className="d-flex justify-content-between align-items-start">
            <h6 style={{ color: '#26a541' }}>Coupon Name #{i + 1}</h6>
            <small className="text-muted">Valid till: 2025-12-31</small>
          </div>

          {/* Second row: Description + T&C link */}
          <div className="d-flex justify-content-between align-items-center mt-2">
            <p className="mb-0">Use this coupon to get exclusive discounts on selected products(Valid till: 2025-12-31).</p>
            <Button variant="link" className="text-decoration-none p-0" onClick={() => setShowModal(true)}>
              View T &amp;C
            </Button>
          </div>
        </Card>
      ))}
      <Collapse in={collapseCoupons}>
        <div>
          {[...Array(3).keys()].map((j) => (
            <Card
              key={j}
              className={`mb-3 p-3 border rounded ticket-card position-relative ${j % 2 === 0 ? 'expired' : ''
                }`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0" style={{ color: '#26a541' }}>
                  Extra Coupon #{j + 6}
                </h6>
                <span className={`badge ${j % 2 === 0 ? 'bg-danger' : 'bg-success'}`}>
                  {j % 2 === 0 ? 'Expired' : 'Valid Till: 2025-12-31'}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2">
                <p className="mb-0">
                  {j % 2 === 0
                    ? 'This coupon has expired and can no longer be used.'
                    : 'Use this extra offer for even more value!'}
                </p>
                <Button
                  variant="link"
                  className="text-decoration-none p-0"
                  onClick={() => setShowModal(true)}
                  disabled={j % 2 === 0}
                >
                  View T &amp;C
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Collapse>
      <div className="text-center">
        <Button variant="outline-primary" size="sm" onClick={() => setCollapseCoupons(!collapseCoupons)}>
          {collapseCoupons ? 'View Less' : 'View More'}
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Terms &amp; Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This coupon is valid on selected items only. Cannot be clubbed with other offers.
        </Modal.Body>
      </Modal>
    </Card>
  );

  const renderEditableList = (section: string) => (
    <Card className="profile-card">
      <Card.Body className="profile-content">
        <h5 className="profile-section-title d-flex justify-content-between align-items-center">
          {`Manage ${section.charAt(0).toUpperCase() + section.slice(1)}`}
          <span className="edit-link" onClick={toggleEditSectionMode}>{editAddressMode ? 'Cancel' : 'Edit'}</span>
        </h5>

        {!editFormVisible ? (
          <>
            <Row>
              {dataMap[section as keyof typeof dataMap].map((item, i) => (
                <Col md={6} key={i} className="mb-3">
                  <Card className="address-box border rounded p-3 h-100 shadow-sm">
                    {editAddressMode && (
                      <Form.Check
                        type="checkbox"
                        className="position-absolute m-2"
                        checked={selectedItems.includes(i)}
                        onChange={() => toggleSelection(i)}
                      />
                    )}
                    <Card.Body>
                      <p>{item}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            {editAddressMode && selectedItems.length > 0 && (
              <div className="d-flex gap-3 mt-3">
                <Button variant="danger">Delete</Button>
                <Button variant="primary" onClick={startEditing}>Edit Selected</Button>
              </div>
            )}
          </>
        ) : (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Edit</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex gap-3">
              <Button variant="secondary" onClick={cancelEdit}>Cancel</Button>
              <Button variant="success" onClick={saveEdit}>Save Changes</Button>
            </div>
          </Form>
        )}
      </Card.Body>
    </Card>
  );

  const renderRecentSearches = () => (
    <Card className="profile-card mt-4">
      <Card.Header><strong>Your Recent Searches</strong></Card.Header>
      <Card.Body>
        <Row>
          {['Smart Watch', 'Shoes', 'Wireless Earbuds', 'Sunglasses'].map((item, i) => (
            <Col md={3} sm={6} xs={12} className="mb-3" key={i}>
              <Card className="recent-search-item">
                <Card.Img variant="top" src="https://via.placeholder.com/150" />
                <Card.Body className="p-2">
                  <h6 className="mb-1">{item}</h6>
                  <p className="mb-0 text-muted small">₹{1000 + i * 500}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );

  const renderProfileForm = () => (
    <Card className="profile-card">
      <Card.Body>
        <h5 className="d-flex justify-content-between align-items-center">
          Personal Information
          {!editMode ? (
            <span className="edit-link" onClick={toggleEditMode}>Edit</span>
          ) : (
            <Button size="sm" variant="primary" onClick={toggleEditMode}>Save</Button>
          )}
        </h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" value={profile.firstName} onChange={handleInputChange} disabled={!editMode} />
          </Col>
          <Col md={6}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" value={profile.lastName} onChange={handleInputChange} disabled={!editMode} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Gender</Form.Label><br />
            <Form.Check inline label="Male" name="gender" type="radio" value="male" checked={profile.gender === 'male'} onChange={handleInputChange} disabled={!editMode} />
            <Form.Check inline label="Female" name="gender" type="radio" value="female" checked={profile.gender === 'female'} onChange={handleInputChange} disabled={!editMode} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={profile.email} onChange={handleInputChange} disabled={!editMode} />
          </Col>
          <Col md={6}>
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="text" name="mobile" value={profile.mobile} onChange={handleInputChange} disabled={!editMode} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Accordion defaultActiveKey="0" className="custom-accordion">
              <Accordion.Item eventKey="0">
                <Accordion.Header as='h5'>FAQ's</Accordion.Header>
                <Accordion.Body>
                  <div className="faq-item mb-3">
                    <h6>What happens when I update my email address or mobile number?</h6>
                    <p>Your login credentials will change accordingly. All order updates, support messages, and promotional communication will be sent to your new email address or mobile number.</p>
                  </div>

                  <div className="faq-item mb-3">
                    <h6>When will my Vistora account be updated with the new email address or mobile number?</h6>
                    <p>Once you verify the OTP sent to your new email or mobile, your account details will be updated instantly.</p>
                  </div>

                  <div className="faq-item mb-3">
                    <h6>Will updating my email or mobile affect my current Vistora account?</h6>
                    <p>No, updating your contact details will not affect your account history. You'll still have access to your orders, wishlist, addresses, and saved information.</p>
                  </div>

                  <div className="faq-item mb-3">
                    <h6>If I’m also a seller on Vistora, will my Seller account be affected?</h6>
                    <p>Yes. Vistora uses a single sign-on system. Changes to your primary account credentials will reflect on your seller dashboard as well.</p>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex justify-content-end gap-3">
            <Button variant="warning">Deactivate Account</Button>
            <Button variant="danger">Delete Account</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

  const renderGiftCardSection = () => (
    <Card className="profile-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
          <h5 className="mb-0">Flipkart Gift Card</h5>
          <div className="d-flex gap-3 ms-auto">
            <Button
              variant="link"
              onClick={() => setShowGiftModal('add')}
              className="p-0 text-decoration-none fw-bold"
            >
              Buy a Gift Card
            </Button>
            <Button
              variant="link"
              onClick={() => setShowGiftModal('balance')}
              className="p-0 text-decoration-none fw-bold"
            >
              Check Gift Card Balance
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2">
            <div className="add-gift-card-box d-flex align-items-center mb-4" onClick={() => setShowGiftModal('add')}>
              <span className="fw-semibold text-primary">+ Add a Gift Card</span>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5>Buy a Flipkart Gift Card</h5>
          <small className="text-muted">Issued by <span className='signature-style text-danger'>Vistora</span></small>
        </div>

        <Card className="shadow-sm border-0 mb-4">
          <Card.Header className="p-0">
            <Nav variant="tabs" defaultActiveKey="personal">
              <Nav.Item>
                <Nav.Link eventKey="personal">PERSONAL GIFT CARDS</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="corporate">CORPORATE REQUIREMENTS</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body className="bg-light bg-gradient" style={{ background: 'linear-gradient(to right, #f9f9f9, #e9e9e9)' }}>
            <Tab.Content>
              <Tab.Pane eventKey="personal" active>
                <Row>
                  <Col md={6}>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Receiver’s Email ID *</Form.Label>
                        <Form.Control type="email" placeholder="someone@example.com" required />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Receiver’s Name *</Form.Label>
                        <Form.Control type="text" placeholder="John Doe" required />
                      </Form.Group>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Card Value (₹)</Form.Label>
                            <Form.Select>
                              <option>Select</option>
                              <option value="500">500</option>
                              <option value="1000">1000</option>
                              <option value="2000">2000</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>No. of Cards</Form.Label>
                            <Form.Control type="number" value={1} min={1} />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Label>Gifter’s Name (Optional)</Form.Label>
                        <Form.Control type="text" placeholder="Your name" />
                      </Form.Group>
                    </Form>
                  </Col>

                  <Col md={6} className="d-flex align-items-center justify-content-center">
                    <div className="gift-card-preview d-flex justify-content-between align-items-center px-4 py-3 w-100">
                      <div className="text-start">
                        <small className="text-uppercase">Gift Card Value</small>
                        <h2 className="fw-bold mb-0">₹0</h2>
                      </div>
                      <div className="text-end">
                        <img src={logo} alt="Vistora Logo" width={100} className="Vistora_Logo mb-2" />
                        {/* <div className="fw-semibold fs-5">Vistora</div> */}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="corporate">
                <p>Corporate requirement form goes here...</p>
              </Tab.Pane>
            </Tab.Content>
            <div className="offset-1 mt-3">
              <Button variant="warning">BUY GIFT CARD FOR ₹0</Button>
            </div>
          </Card.Body>
        </Card>

        <div className="text-start mb-4">
          <Button variant="link" className="text-decoration-none px-0">+ Buy Another Gift Card</Button>
        </div>



        <div className="faq-section">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>How do I buy / gift a Flipkart Gift Card?</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Enter the name and email address of the person you want to send the Flipkart Gift Card to.</li>
                  <li>Select the value of the card you would like to purchase, then click 'Proceed To Pay'.</li>
                  <li>You'll now see the payment options. Complete the checkout process to receive an email with the Gift Card details.</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How do I pay with a Flipkart Gift Card?</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Go to flipkart.com and select the items you want to purchase. Click 'Proceed To Pay'.</li>
                  <li>Select the 'Pay By Gift Card' option.</li>
                  <li>Enter your 16-digit gift card number and the corresponding 6-digit PIN when prompted.</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>

        {/* Modals */}
        <Modal show={showGiftModal === 'add'} onHide={() => setShowGiftModal(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add a Gift Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted">Gift Card number & PIN are sent to your email inbox</p>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Gift Card Number</Form.Label>
                <Form.Control type="text" placeholder="Enter card number" value={giftCardDetails.number} onChange={(e) => setGiftCardDetails({ ...giftCardDetails, number: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gift Card PIN</Form.Label>
                <Form.Control type="password" placeholder="Enter PIN" value={giftCardDetails.pin} onChange={(e) => setGiftCardDetails({ ...giftCardDetails, pin: e.target.value })} />
              </Form.Group>
              <Button variant="primary">Add Card to Account</Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showGiftModal === 'balance'} onHide={() => setShowGiftModal(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Check Gift Card Balance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Gift Card Number</Form.Label>
                <Form.Control type="text" placeholder="Enter card number" value={giftCardDetails.number} onChange={(e) => setGiftCardDetails({ ...giftCardDetails, number: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gift Card PIN</Form.Label>
                <Form.Control type="password" placeholder="Enter PIN" value={giftCardDetails.pin} onChange={(e) => setGiftCardDetails({ ...giftCardDetails, pin: e.target.value })} />
              </Form.Group>
              <Button variant="primary">Check Balance</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  );

  const renderReviewSection = () => (
    <Card className="profile-card">
      <Card.Body>
        <h5 className="mb-4">My Reviews (3)</h5>

        {[{
          product: 'D-SNEAKERZ casual partywear new stylish canvas shoes for mens and boys Casuals For Men',
          rating: 2,
          label: 'Not good',
          comment: 'after 4 months it got damaged..',
          date: '27 Dec, 2019',
          name: 'Somes Dash',
          image: 'https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/n/l/v/10-fc-black-10-bruton-black-original-imagsgphzpykh5sh.jpeg?q=70'
        }, {
          product: 'Superman Clubmaster Sunglasses',
          rating: 5,
          label: 'Mind-blowing purchase',
          comment: `It's good product and good looking`,
          date: '21 Sep, 2018',
          name: 'Somes Dash',
          image: 'https://rukminim2.flixcart.com/image/832/832/kq5iykw0/sunglass/e/g/3/free-size-uv-protection-round-sunglasses-for-men-and-boys-original-imag48ebxgpxpchg.jpeg?q=70'
        }, {
          product: 'REEBOK Solid Men Polo Neck Grey T-Shirt',
          rating: 5,
          label: 'Terrific purchase',
          comment: `It's very simple and good looking`,
          date: '17 Dec, 2016',
          name: 'Somes Dash',
          image: 'https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/d/n/d/s-555555-2-ftx-original-imagmhkgphw4hb2f.jpeg?q=70'
        }].map((review, idx) => (
          <Card key={idx} className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <Row>
                <Col xs={2}>
                  <img src={review.image} alt={review.product} className="img-fluid rounded" />
                </Col>
                <Col xs={10}>
                  <p className="mb-1 fw-semibold">{review.product}</p>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className={`badge ${review.rating >= 4 ? 'bg-success' : 'bg-warning text-dark'}`}>{review.rating}★</span>
                    <span className="fw-semibold">{review.label}</span>
                  </div>
                  <p className="mb-1 text-muted small">{review.comment}</p>
                  <small className="text-muted d-block mb-2">{review.name} ● Certified Buyer ● {review.date}</small>
                  <div className="d-flex gap-3">
                    <Button variant="link" size="sm">Edit</Button>
                    <Button variant="link" size="sm">Delete</Button>
                    <Button variant="link" size="sm">Share</Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Card.Body>
    </Card>
  );
  
  const { handleLogout } = useLogout();
  return (
    <div className="profile-container">
      <Container>
        <Row>
          <Col lg={3} className="profile-sidebar">
            <Card className="profile-card">
              <div className="sidebar-header d-flex align-items-center gap-3">
                <img src={_pic} alt="avatar" />
                <div className="sidebar-name">
                  <div className="text-muted small">Hello,</div>
                  <div className="fw-semibold">{profile.firstName} {profile.lastName}</div>
                </div>
              </div>
              <hr />
              <div className="sidebar-section">
                <h6 className="sidebar-heading"><ShoppingBag size={16} color="#ff6f61" className="me-2" />My Orders</h6>
                <Link to="/order-page" className="sidebar-item">Orders</Link>
                <h6 className="sidebar-heading"><Settings size={16} color="#ff6f61" className="me-2" />Account Settings</h6>
                <span className={`sidebar-item ${activeSection === 'profile' ? 'active' : ''}`} onClick={() => setActiveSection('profile')}>Profile Information</span>
                <span className={`sidebar-item ${activeSection === 'address' ? 'active' : ''}`} onClick={() => setActiveSection('address')}>Manage Addresses</span>
                <span className={`sidebar-item ${activeSection === 'pan' ? 'active' : ''}`} onClick={() => setActiveSection('pan')}>PAN Card Info</span>
                <h6 className="sidebar-heading"><Wallet size={16} color="#ff6f61" className="me-2" />Payments</h6>
                <span className={`sidebar-item ${activeSection === 'gift' ? 'active' : ''}`} onClick={() => setActiveSection('gift')}>Gift Cards</span>
                <span className={`sidebar-item ${activeSection === 'upi' ? 'active' : ''}`} onClick={() => setActiveSection('upi')}>Saved UPI</span>
                <span className={`sidebar-item ${activeSection === 'cards' ? 'active' : ''}`} onClick={() => setActiveSection('cards')}>Saved Cards</span>
                <h6 className="sidebar-heading"><Tags size={16} color="#ff6f61" className="me-2" />My Stuff</h6>
                <span className={`sidebar-item ${activeSection === 'coupons' ? 'active' : ''}`} onClick={() => setActiveSection('coupons')}>My Coupons</span>
                <span className={`sidebar-item ${activeSection === 'reviews' ? 'active' : ''}`} onClick={() => setActiveSection('reviews')}>My Reviews and Ratings</span>
                <span className={`sidebar-item ${activeSection === 'notifications' ? 'active' : ''}`} onClick={() => navigate('/component/notification')}>All Notifications</span>
                <div className="text-center mt-4">
                  <Button variant="outline-danger" className="logout-btn d-flex align-items-center gap-2 mx-auto" onClick={handleLogout}>
                    <LogOut size={16} />
                    Log Out
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col lg={9} className="profile-main">
            {activeSection === 'profile' && (
              <>
                {renderProfileForm()}
                {renderRecentSearches()}
              </>
            )}
            {['address', 'upi', 'cards'].includes(activeSection) && renderEditableList(activeSection)}
            {activeSection === 'gift' ? renderGiftCardSection() : null}
            {activeSection === 'reviews' && renderReviewSection()}
            {activeSection === 'pan' && (
              <Card className="profile-card">
                <Card.Body>
                  <h5 className="d-flex justify-content-between align-items-center">
                    PAN Card Info
                    <span className="edit-link" onClick={() => setPanEdit(!panEdit)}>{panEdit ? 'Save' : 'Edit'}</span>
                  </h5>
                  <p className="text-muted">We verify your PAN card with official government services.</p>
                  <Form>
                    <Form.Group>
                      <Form.Label>PAN Number</Form.Label>
                      <Form.Control type="text" value={panCard} onChange={(e) => setPanCard(e.target.value)} disabled={!panEdit} />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            )}
            {activeSection === 'coupons' && renderCoupons()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
