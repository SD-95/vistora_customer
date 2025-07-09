import React, { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import signin_pic from '../../assets/images/auth/signin.jpg'
import { Link } from 'react-router-dom';

const Signin: React.FC = () => {
    const [useMobile, setUseMobile] = useState(false);
    const [mobileDigits, setMobileDigits] = useState<string[]>(Array(10).fill(''));
    const [rememberMe, setRememberMe] = useState(false);
    const digitRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleDigitChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!/^\d?$/.test(value)) return;

        const updated = [...mobileDigits];
        updated[index] = value;
        setMobileDigits(updated);

        if (value && index < 9) {
            digitRefs.current[index + 1]?.focus();
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (useMobile) {
            const phone = mobileDigits.join('');
            console.log('Logging in with mobile:', phone);
        } else {
            console.log('Logging in with email/password');
        }
    };

    return (
        <div className="auth-wrapper">
            <Container className="shadow-lg p-4 rounded-4 bg-white auth-container">
                <Row>
                    {/* Left Side Image */}
                    <Col md={6} className="d-flex align-items-center justify-content-center p-4">
                        <img
                            src={signin_pic}
                            alt="Sign In Illustration"
                            className="img-fluid"
                            style={{ maxHeight: '320px' }}
                        />
                    </Col>

                    {/* Vertical Divider */}
                    <Col md={1} className="d-none d-md-flex justify-content-center">
                        <div className="vr" style={{ height: '100%', width: '2px', background: '#ccc' }} />
                    </Col>

                    {/* Right Side Form */}
                    <Col md={5} className="p-4">
                        <h3 className="mb-4 text-center">Log In to Vistora</h3>

                        <Form onSubmit={handleSubmit}>
                            {!useMobile ? (
                                <>
                                    <Form.Group controlId="formEmail" className="mb-3">
                                        <Form.Label>Email or Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your email or username"
                                            required
                                        />
                                    </Form.Group>

                                    <div className="text-end mb-3">
                                        <Button
                                            variant="link"
                                            type="button"
                                            className="p-0"
                                            style={{ fontSize: '0.85rem', color: '#ff6f61' }}
                                            onClick={() => setUseMobile(true)}
                                        >
                                            Prefer mobile? Log in with Mobile
                                        </Button>
                                    </div>

                                    <Form.Group controlId="formPassword" className="mb-2">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </Form.Group>

                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <Form.Check
                                            type="checkbox"
                                            id="rememberMe"
                                            label="Remember me"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <Button
                                            variant="link"
                                            className="p-0"
                                            style={{ fontSize: '0.85rem' }}
                                        >
                                            Trouble logging in?
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Form.Group controlId="formMobile" className="mb-3">
                                        <Form.Label>Mobile Number</Form.Label>
                                        <div className="d-flex gap-2 flex-wrap">
                                            {mobileDigits.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    maxLength={1}
                                                    value={digit}
                                                    className="text-center"
                                                    onChange={(e) => handleDigitChange(index, e)}
                                                    ref={(el) => {
                                                        digitRefs.current[index] = el;
                                                    }}
                                                    style={{
                                                        width: '35px',
                                                        height: '45px',
                                                        fontSize: '18px',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '6px',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <Form.Check
                                            type="checkbox"
                                            id="rememberMobile"
                                            label="Remember me"
                                            className="mt-3"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                    </Form.Group>

                                    <div className="text-end mb-3">
                                        <Button
                                            variant="link"
                                            type="button"
                                            className="p-0"
                                            style={{ fontSize: '0.85rem', color: '#ff6f61' }}
                                            onClick={() => setUseMobile(false)}
                                        >
                                            Prefer Email? Log in with Email
                                        </Button>
                                    </div>
                                </>
                            )}

                            <Button as={Link as any} to='/home' type="submit" variant="primary" className="w-100 mb-3">
                                Log In
                            </Button>

                            <div className="text-end text-muted mt-4">
                                New to Vistora?{' '}
                                <Button as={Link as any} to='/signup' variant="link" className="p-0" style={{ color: '#ff6f61' }}>
                                    Sign Up
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signin;
