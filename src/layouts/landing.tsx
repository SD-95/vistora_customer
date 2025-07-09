import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import sample from '../assets/images/product/sample1.png';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDrawer = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <React.Fragment>
      <Container className={isExpanded ? 'drawer-expanded' : ''}>
        <Row className="align-items-center">
          {/* Left Section */}
          <Col md={6} className="welcome-left">
            <div className="text-content">
              <h1 className="headline">
                Discover <span className="highlighted">Vistora</span>
              </h1>
              <p className="subtext">
                Elevate your shopping experience with premium collections & unbeatable offers.
              </p>
              <Button variant="light" className="cta-btn_landing">Explore Now</Button>
            </div>
          </Col>

          {/* Right Section */}
          <Col md={6} className="welcome-right">
            <div className="showcase-panel enhanced">
              <div className="animated-background">
                <div className="blur-circle circle1"></div>
                <div className="blur-circle circle2"></div>
                <div className="blur-circle circle3"></div>
              </div>
              <img src={sample} alt="Vistora Fashion" className="main-showcase-img" />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Backdrop */}
      {isExpanded && <div className="drawer-backdrop" onClick={toggleDrawer}></div>}

      {/* Pull-up Drawer */}
      <div className={`black-drawer ${isExpanded ? 'expanded' : ''}`}>
        <div className="drawer-toggle" onClick={toggleDrawer}>
          <div className={`mouse-icon ${isExpanded ? 'bounce-down' : 'bounce-up'}`}>
            <div className="mouse-wheel"></div>
          </div>
          {!isExpanded && <p className="drawer-hint">Scroll to learn more</p>}
        </div>

        <div className="drawer-content">
          <p className="drawer-intro">
            Welcome to Vistora – India’s leading fashion destination.<br />
            Style, comfort, and affordability — all in one place.
          </p>

          <div className="drawer-user-prompt">
            <div className="user-type-block">
              <p className="drawer-call">Already a Vistora member?</p>
              <Button as={Link as any} to='/signin' variant="light" className="cta-btn_landing login">Log In</Button>
            </div>
            <div className="user-type-block">
              <p className="drawer-call">New here?</p>
              <p className="drawer-subcall">Start your style journey now!</p>
              <Button as={Link as any} to='/signup' variant="light" className="cta-btn_landing signup">Sign Up</Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
