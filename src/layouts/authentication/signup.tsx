import React, { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Modal,
} from 'react-bootstrap';
import signup_pic from '../../assets/images/auth/signup.jpg'
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
    const [_otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [timer, setTimer] = useState(60);
    const [otpError, setOtpError] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);

    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleOtpChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!/\d?/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleAcceptTerms = () => {
        if (acceptedTerms) {
            setShowForm(true);
        }
    };

    const handleOtpSubmit = () => {
        const otpValue = otp.join('');
        if (otpValue.length === 4 && timer > 0) {
            setOtpVerified(true);
            setShowOtpModal(false);
            setOtpError('');
        } else if (timer === 0) {
            setOtpError('Time out. Please retry the verification process.');
        }
    };

    const startOtpTimer = () => {
        setOtpSent(true);
        setTimer(60);
        setOtp(Array(4).fill(''));
        setOtpError('');
        setShowOtpModal(true);

        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev === 1) {
                    clearInterval(countdown);
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <div className="auth-wrapper">
            <Container className="shadow-lg p-4 rounded-4 bg-white auth-container">
                {!showForm ? (
                    <div className="terms-content">
                        <h4>Terms & Conditions</h4>
                        <p>
                            Please read and accept our terms and policies before proceeding to sign up. Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                        </p>
                        <div className="terms-checkbox">
                            <Form.Check
                                type="checkbox"
                                id="acceptTerms"
                                label="I have read and accept the Terms and Privacy Policy."
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                            />
                        </div>
                        <Button
                            variant="primary"
                            disabled={!acceptedTerms}
                            className="accept-btn"
                            onClick={handleAcceptTerms}
                        >
                            Accept & Continue
                        </Button>
                    </div>
                ) : (
                    <Row>
                        {/* Left Side (Sign Up Form) */}
                        <Col md={6} className="p-4">
                            <div className="signup-header">
                                You have accepted our terms & policies. Few steps ahead to join us!
                            </div>
                            <Form>
                                <div className="form-row-pair mb-3">
                                    <Form.Group className="form-group">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter first name" required />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter last name" required />
                                    </Form.Group>
                                </div>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email ID</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" required />
                                </Form.Group>

                                <div className="mobile-group mb-3">
                                    <Form.Control type="text" placeholder="Enter mobile number" required />
                                    <Button variant="outline-secondary" onClick={startOtpTimer}>
                                        Verify OTP
                                    </Button>
                                    {otpVerified && <span className="verify-otp-status">Verified</span>}
                                </div>

                                <div className="form-row-pair mb-3">
                                    <Form.Group className="form-group">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password" required />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label>Re-enter Password</Form.Label>
                                        <Form.Control type="password" placeholder="Re-enter password" required />
                                    </Form.Group>
                                </div>
                                <div className="d-flex justify-content-end mb-3">
                                    <small className="text-muted">
                                        Already a user?{' '}
                                        <Link to="/signin" className="text-decoration-none text-primary">
                                            Sign In
                                        </Link>
                                    </small>
                                </div>
                                {otpVerified && (
                                    <Button as={Link as any} to='/home' type="submit" variant="primary" className="w-100 final-signup-btn">
                                        Sign Up
                                    </Button>
                                )}
                            </Form>
                        </Col>

                        {/* Right Side (Illustration) */}
                        <Col md={6} className="d-flex align-items-center justify-content-center p-4">
                            <img
                                src={signup_pic}
                                alt="Sign Up Illustration"
                                className="img-fluid"
                                style={{ maxHeight: '320px' }}
                            />
                        </Col>
                    </Row>
                )}

                {/* OTP Modal */}
                <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)} centered className="otp-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Enter OTP</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="otp-inputs">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className="otp-box"
                                    value={value}
                                    onChange={(e) => handleOtpChange(index, e)}
                                    ref={(el) => {
                                        otpRefs.current[index] = el;
                                    }}
                                />
                            ))}
                        </div>
                        <div className="otp-timer d-flex align-items-center justify-content-between">
                            {timer > 0 ? (
                                <span>Time remaining: {timer}s</span>
                            ) : (
                                <>
                                    <span className="text-danger">Time expired</span>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        className="ms-2"
                                        onClick={startOtpTimer}
                                    >
                                        Retry
                                    </Button>
                                </>
                            )}
                        </div>
                        {otpError && <div className="otp-error">{otpError}</div>}
                        <Button
                            variant="success"
                            onClick={handleOtpSubmit}
                            disabled={timer === 0 || otp.join('').length < 4}
                        >
                            Verify OTP
                        </Button>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};

export default Signup;
