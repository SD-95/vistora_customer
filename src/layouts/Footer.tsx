import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaCcVisa,
    FaCcMastercard,
    FaCcAmex,
    FaUniversity,
    FaCreditCard
} from 'react-icons/fa';
import { SiUpwork, SiX } from 'react-icons/si';
import { Link } from 'react-router-dom';

const footerData = {
    columns: [
        {
            title: 'About',
            links: [
                { label: 'Contact Us', path: '#' },
                { label: 'About Us', path: '#' },
                { label: 'Vistora Stories', path: '#' },
                { label: 'Corporate Information', path: '#' },
            ],
        },
        {
            title: 'Group Companies',
            links: [
                { label: 'Myntra', path: '#' },
                { label: 'Cleartrip', path: '#' },
                { label: 'Shopsy', path: '#' },
            ],
        },
        {
            title: 'Help',
            links: [
                { label: 'Payments', path: '#' },
                { label: 'Shipping', path: '#' },
                { label: 'Cancellation & Returns', path: '#' },
                { label: 'FAQ', path: '#' },
            ],
        },
        {
            title: 'Consumer Policy',
            links: [
                { label: 'Cancellation & Returns', path: '#' },
                { label: 'Terms Of Use', path: '#' },
                { label: 'Security', path: '#' },
                { label: 'Privacy', path: '#' },
                { label: 'Sitemap', path: '#' },
                { label: 'Grievance Redressal', path: '#' },
            ],
        },
    ],
    mailUs: [
        'Vistora E-commerce Private Limited,',
        'Buildings H.no 82090',
        'Dandapadar Village,',
        'Main Road, Baliguda,',
        'Kandhamal 762103, ODISHA , India',
    ],
    socialLinks: [
        { icon: FaFacebookF, alt: 'Facebook' },
        { icon: SiX, alt: 'X (formerly Twitter)' },
        { icon: FaInstagram, alt: 'Instagram' },
        { icon: FaYoutube, alt: 'YouTube' },
    ],
    officeAddress: [
        'Vistora E-commerce Private Limited,',
        'Buildings H.no 82090',
        'Dandapadar Village,',
        'Main Road, Baliguda,',
        'Kandhamal 762103, ODISHA , India',
        'CIN: U51109KA2012PTC066107',
        'Telephone: +91 8895319373',
    ],
    bottomLinks: [
        { label: 'Become a Seller', path: '#' },
        { label: 'Advertise', path: '#' },
        { label: 'Gift Cards', path: '#' },
        { label: 'Help Center', path: '#' },
    ],
    paymentIcons: [
        { icon: FaCcVisa, path: '#' },
        { icon: FaCcMastercard, path: '#' },
        { icon: FaCcAmex, path: '#' },
        { icon: SiUpwork, path: '#' },
        { icon: FaCreditCard, path: '#' },
        { icon: FaUniversity, path: '#' },
    ],
};

const Footer = () => {
    return (
        <React.Fragment>
            <div className="footer-top rounded-3">
                <Container fluid>
                    <Row>
                        {footerData.columns.map((col, idx) => (
                            <Col key={idx} xs={12} sm={6} md={3} className="footer-column">
                                <h4>{col.title}</h4>
                                <ul>
                                    {col.links.map((link, i) => (
                                        <li key={i}>
                                            <Link to={link.path}>{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </Col>
                        ))}

                        <Col xs="auto" className="d-none d-md-flex justify-content-center align-items-stretch">
                            <div className="vertical-line" />
                        </Col>


                        <Col xs={12} md={3} className="footer-column">
                            <h4>Mail Us:</h4>
                            <div className="footer-mail">
                                {footerData.mailUs.map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </div>
                            <h4>Social:</h4>
                            <div className="footer-social-icons">
                                {footerData.socialLinks.map((link, i) => {
                                    const Icon = link.icon;
                                    return (
                                        <Link to="#" key={i} aria-label={link.alt} className="social-icon">
                                            <Icon />
                                        </Link>
                                    );
                                })}
                            </div>
                        </Col>

                        <Col xs={12} md={3} className="footer-column">
                            <h4>Registered Office Address:</h4>
                            <div className="footer-address">
                                {footerData.officeAddress.map((line, i) => (
                                    <div key={i}>{line}</div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="footer-bottom rounded-3">
                <Container fluid>
                    <Row className="justify-content-between">
                        <Col className="left d-flex flex-wrap gap-3">
                            {footerData.bottomLinks.map((item, idx) => (
                                <Link to={item.path} key={idx}>{item.label}</Link>
                            ))}
                        </Col>

                        <Col className="right d-flex flex-wrap gap-2 justify-content-end">
                            {footerData.paymentIcons.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <Link key={idx} to={item.path} className="payment-icon">
                                        <Icon />
                                    </Link>
                                );
                            })}
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default Footer;
