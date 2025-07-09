import React, { Fragment, useState } from 'react';
import { Container, Row, Col, Card, Form, Badge, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const ordersData = [
    {
        sharedBy: 'Amit Sharma',
        image: 'https://via.placeholder.com/100',
        name: 'Wireless Earbuds',
        details: 'Black | Qty: 1',
        price: 1999,
        status: 'Delivered',
        deliveredOn: 'Jun 10, 2025',
        courier: 'Delhivery'
    },
    {
        sharedBy: '',
        image: 'https://via.placeholder.com/100',
        name: 'Smart Watch',
        details: 'Blue | Qty: 2',
        price: 3999,
        status: 'On the way',
        deliveredOn: '',
        courier: 'Ekart Logistics'
    }
];

const Order: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Container className='orderpage-container'>
            <Row>
                {/* Filter Section */}
                <Col md={3}>
                    <Card className='p-3 orderpage-filter-card '>
                        <h5>Order Status</h5>
                        {['On the way', 'Delivered', 'Cancelled', 'Returned'].map((status) => (
                            <Form.Check type="checkbox" label={status} key={status} className='mb-2 orderpage-checkbox' />
                        ))}

                        <h5 className="mt-4">Order Time</h5>
                        {['Last 30 days', '2024', '2023', '2022', '2021', 'Older'].map((time) => (
                            <Form.Check type="checkbox" label={time} key={time} className='mb-2 orderpage-checkbox' />
                        ))}
                    </Card>
                </Col>

                {/* Main Content */}
                <Col md={9}>
                    {/* Search Bar */}
                    <InputGroup className='orderpage-searchbar mb-4'>
                        <FormControl
                            placeholder="Search your orders"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-grow-1"
                        />
                        <Button style={{ backgroundColor: 'var(--color-primary)' }}>
                            <Search size={16} />
                        </Button>
                    </InputGroup>

                    {/* Order Cards */}
                    {ordersData.map((order, idx) => (
                        <Card
                            key={idx}
                            className='mb-4 shadow-sm orderpage-card'
                            as={Link}
                            to='/track-order'
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Card.Body className='orderpage-card-body'>
                                {order.sharedBy && (
                                    <Badge className='mb-2 orderpage-badge'>
                                        {order.sharedBy} shared this order with you
                                    </Badge>
                                )}

                                <Row className="align-items-center">
                                    <Col xs={2}>
                                        <img src={order.image} alt={order.name} className='img-fluid orderpage-img' />
                                    </Col>
                                    <Col xs={4}>
                                        <h6 className='orderpage-name'>{order.name}</h6>
                                        <small className='orderpage-muted'>{order.details}</small>
                                    </Col>
                                    <Col xs={2}>
                                        <div className='orderpage-price'>₹{order.price}</div>
                                    </Col>
                                    <Col xs={4} className="text-end">
                                        {order.status === 'Delivered' ? (
                                            <Fragment>
                                                <div className='orderpage-status-success'>Delivered on {order.deliveredOn}</div>
                                                <small className='orderpage-muted'>Delivered by {order.courier}</small>
                                            </Fragment>
                                        ) : (
                                            <div className='orderpage-status-warning'>{order.status}</div>
                                        )}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default Order;
