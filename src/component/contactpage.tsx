import React, { useState } from "react";
import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FiPaperclip } from "react-icons/fi";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import support from '../assets/images/profile/support.jpg';
import support_2 from '../assets/images/profile/support_2.jpg';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        purpose: "",
        order: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [isOrderQuery, setIsOrderQuery] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
            setFormData({ name: "", mobile: "", email: "", purpose: "", order: "", message: "" });
        }
    };

    const toggleQueryType = () => {
        setIsOrderQuery(!isOrderQuery);
    };

    return (
        <div className={`minimal-contact-wrapper ${isOrderQuery ? "swap-order" : "swap-general"}`}>
            <div className="minimal-contact-card">
                {/* LEFT SIDE */}
                <div className="minimal-contact-left">
                    <h2>{isOrderQuery ? "Order Related Query" : "General Query"}</h2>
                    <p>
                        Fill in the form, or, if you prefer, <a href="mailto:support@example.com">send us an email</a>
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="What’s your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        {!isOrderQuery && (
                            <Form.Group controlId="formMobile">
                                <Form.Control
                                    type="text"
                                    name="mobile"
                                    placeholder="Your registered mobile number"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        )}

                        <Form.Group controlId="formEmail">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Your registered email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        {isOrderQuery && (
                            <div className="select-row">
                                <Form.Group controlId="formPurpose" className="select-group">
                                    <Form.Select
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleChange}
                                        className="custom-select"
                                        required
                                    >
                                        <option value="">Purpose of your query</option>
                                        <option value="Late Delivery">Late Delivery</option>
                                        <option value="Product Defect">Product Defect</option>
                                        <option value="Wrong Order">Wrong Order</option>
                                        <option value="Return Request">Return Request</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="formOrder" className="select-group">
                                    <Form.Select
                                        name="order"
                                        value={formData.order}
                                        onChange={handleChange}
                                        className="custom-select"
                                        required
                                    >
                                        <option value="">Select the order you have query with</option>
                                        <option value="Order #1001">Order #1001</option>
                                        <option value="Order #1002">Order #1002</option>
                                        <option value="Order #1003">Order #1003</option>
                                        <option value="Order #1004">Order #1004</option>
                                        <option value="Order #1005">Order #1005</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        )}
                        <Form.Group controlId="formMessage" className="textarea-with-icon">
                            <Form.Control
                                as="textarea"
                                name="message"
                                placeholder={
                                    isOrderQuery
                                        ? "Describe your order concern"
                                        : "Summarize your general query"
                                }
                                rows={3}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Max 5 attachments allowed</Tooltip>}
                            >
                                <label htmlFor="fileUpload">
                                    <FiPaperclip className="attachment-icon" style={{ cursor: "pointer" }} />
                                </label>
                            </OverlayTrigger>
                            <input
                                id="fileUpload"
                                type="file"
                                style={{ display: "none" }}
                                multiple
                                accept="image/*,application/pdf"
                            />
                        </Form.Group>

                        <Button type="submit" className="send-button">
                            send
                        </Button>
                    </Form>
                    {submitted && <div className="submitted-msg">Thank you! We’ll be in touch soon.</div>}

                    <div className="swap-trigger" onClick={toggleQueryType}>
                        {isOrderQuery ? <FaArrowLeft /> : <FaArrowRight />}{" "}
                        {isOrderQuery ? "For general queries" : "Order related queries"}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="minimal-contact-right">
                    <img
                        src={isOrderQuery ? support_2 : support}
                        alt="Decorative Contact"
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
