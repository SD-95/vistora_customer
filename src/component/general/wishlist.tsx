// WishlistPage.tsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

interface WishlistItem {
    title: string;
    image: string;
    price: string;
    originalPrice?: string;
    offer?: string;
    status?: string;
}

const wishlistItems: WishlistItem[] = [
    {
        title: 'Godrej Protekt Health Bathing Soap | Citrus Fragrance | Anti-bacterial with 99.9% Germ Protection',
        image: 'https://rukminim2.flixcart.com/image/416/416/kq5iykw0/soap/u/j/g/75-health-soap-godrej-original-imag48ebxgpxpchg.jpeg?q=70',
        price: 'Not Available',
        status: 'Currently unavailable'
    },
    {
        title: 'Perfect Wear Woven Banarasi Cotton Silk Saree',
        image: 'https://rukminim2.flixcart.com/image/832/832/l3lx8cw0/sari/n/m/b/free-2181s313-siril-unstitched-original-imagez7qqzcmkztg.jpeg?q=70',
        price: '₹765',
        originalPrice: '₹6,499',
        offer: '88% off'
    },
    {
        title: 'Home Full Engineered Wood TV Entertainment Unit',
        image: 'https://rukminim2.flixcart.com/image/416/416/l15bxjk0/tv-entertainment-unit/y/l/i/particle-board-800-a-surface-living-original-imagcuzxt8q6jzyh.jpeg?q=70',
        price: '₹6,299',
        originalPrice: '₹13,000',
        offer: '51% off'
    }
];

const Wishlist: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null);

    return (
        <div className="profile-container">
            <Container>
                <Row>
                    <Col lg={9}>
                        <Card className="profile-card">
                            <Card.Body>
                                <h5 className="mb-4">My Wishlist ({wishlistItems.length})</h5>
                                {wishlistItems.map((item, idx) => (
                                    <Card
                                        key={idx}
                                        className="mb-3 border-0 border-bottom wishlist-card shadow-none"
                                        onClick={() => setSelectedItem(item)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Card.Body className="d-flex align-items-center gap-3 justify-content-between">
                                            <div className="d-flex gap-3 align-items-center">
                                                <img src={item.image} alt={item.title} width="80" height="80" className="rounded" />
                                                <div>
                                                    <p className="mb-1 fw-semibold">{item.title}</p>
                                                    {item.price !== 'Not Available' ? (
                                                        <div className="fw-bold text-dark">
                                                            {item.price}
                                                            <span className="text-muted text-decoration-line-through ms-2">{item.originalPrice}</span>
                                                            <span className="text-success ms-2">{item.offer}</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <p className="text-muted mb-0">Price: {item.price}</p>
                                                            <p className="text-danger small mb-0">{item.status}</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Add to Cart and Delete Icons */}
                                            <div className="wishlist-icons d-flex gap-2 align-items-center">
                                                <Button variant="outline-success" size="sm">
                                                    <i className="bi bi-cart-plus"></i>
                                                </Button>
                                                <Button variant="outline-danger" size="sm">
                                                    <i className="bi bi-trash3"></i>
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={3}>
                        <Card className="profile-card">
                            <Card.Body>
                                {selectedItem ? (
                                    <>
                                        <img
                                            src={selectedItem.image}
                                            alt={selectedItem.title}
                                            className="img-fluid rounded mb-3"
                                        />
                                        <h6>{selectedItem.title}</h6>
                                        {selectedItem.price !== 'Not Available' ? (
                                            <>
                                                <p className="fw-bold text-dark">{selectedItem.price}</p>
                                                <p className="text-muted text-decoration-line-through">
                                                    {selectedItem.originalPrice}
                                                </p>
                                                <p className="text-success">{selectedItem.offer}</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-muted mb-0">Price: {selectedItem.price}</p>
                                                <p className="text-danger small mb-0">{selectedItem.status}</p>
                                            </>
                                        )}
                                        <Button variant="success" className="w-100 mt-3">
                                            <i className="bi bi-cart-plus me-2"></i>Add to Cart
                                        </Button>
                                    </>
                                ) : (
                                    <div className="text-center text-muted">
                                        Ad Space / Product Info Preview
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Wishlist;
