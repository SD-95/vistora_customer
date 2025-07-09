import React, { useState } from 'react';
import { Card, Button, Carousel, Row, Col, Badge } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaHeart, FaStar } from 'react-icons/fa';

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: number;
}

const similarProducts: Product[] = [
  {
    id: 1, title: 'Herbal Brightening Soap - Turmeric & Neem (100 g)', image: '/images/similar-1.jpg', price: 145, rating: 4.2,
  },
  {
    id: 2, title: 'Glow & Radiance Soap - Rose & Milk (100 g)', image: '/images/similar-2.jpg', price: 160, rating: 4.3,
  },
  {
    id: 3, title: 'Charcoal Detox Soap - Deep Clean (100 g)', image: '/images/similar-3.jpg', price: 130, rating: 4.1,
  },
  {
    id: 4, title: 'Saffron Whitening Soap (100 g)', image: '/images/similar-4.jpg', price: 170, rating: 4.4,
  },
  {
    id: 5, title: 'Aloe Vera Moisturizing Soap (100 g)', image: '/images/similar-5.jpg', price: 150, rating: 4.3,
  },
  {
    id: 6, title: 'Coffee Scrub Soap (100 g)', image: '/images/similar-6.jpg', price: 155, rating: 4.2,
  },
  {
    id: 7, title: 'Herbal Brightening Soap - Turmeric & Neem (100 g)', image: '/images/similar-1.jpg', price: 145, rating: 4.2,
  },
  {
    id: 8, title: 'Glow & Radiance Soap - Rose & Milk (100 g)', image: '/images/similar-2.jpg', price: 160, rating: 4.3,
  },
  {
    id: 9, title: 'Charcoal Detox Soap - Deep Clean (100 g)', image: '/images/similar-3.jpg', price: 130, rating: 4.1,
  },
  {
    id: 10, title: 'Saffron Whitening Soap (100 g)', image: '/images/similar-4.jpg', price: 170, rating: 4.4,
  },
  {
    id: 11, title: 'Aloe Vera Moisturizing Soap (100 g)', image: '/images/similar-5.jpg', price: 150, rating: 4.3,
  },
  {
    id: 12, title: 'Coffee Scrub Soap (100 g)', image: '/images/similar-6.jpg', price: 155, rating: 4.2,
  },
];

// Helper to generate 6-product sliding groups
const getSlidingGroups = (products: Product[], groupSize: number) => {
  const result: Product[][] = [];
  for (let i = 0; i <= products.length - groupSize; i++) {
    result.push(products.slice(i, i + groupSize));
  }
  for (let i = 0; i < groupSize - 1; i++) {
    const endSlice = products.slice(products.length - groupSize + 1 + i).concat(products.slice(0, i + 1));
    result.push(endSlice);
  }
  return result;
};

const SimilarProducts: React.FC = () => {
  const productGroups = getSlidingGroups(similarProducts, 6);
  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndex((prev) => (prev + 1) % productGroups.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [productGroups.length]);

  return (
    <Card className="p-4 border-0 rounded-4 shadow-sm">
      <h5 className="mb-4">Similar Products</h5>
      <Carousel
        activeIndex={index}
        onSelect={(selectedIndex) => setIndex(selectedIndex)}
        controls
        indicators={false}
        interval={null}
        nextIcon={<FaChevronRight className="custom-carousel-control next" />}
        prevIcon={<FaChevronLeft className="custom-carousel-control prev" />}
      // nextIcon={
      //   <span
      //     aria-hidden="true"
      //     className="carousel-control-next-icon bg-dark rounded-circle p-3"
      //     style={{ filter: 'invert(1)', opacity: 0.9 }}
      //   />
      // }
      // prevIcon={
      //   <span
      //     aria-hidden="true"
      //     className="carousel-control-prev-icon bg-dark rounded-circle p-3"
      //     style={{ filter: 'invert(1)', opacity: 0.9 }}
      //   />
      // }
      >
        {productGroups.map((group, groupIdx) => (
          <Carousel.Item key={groupIdx}>
            <Row className="gx-3">
              {group.map((product) => (
                <Col key={product.id} lg={2} md={4} sm={6} xs={12}>
                  <Card className="shadow-sm border rounded-4 h-100 position-relative overflow-hidden p-2">
                    {/* Wishlist Icon */}
                    <div className="position-relative">
                      <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.title}
                        style={{ height: '150px', objectFit: 'cover', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
                      />

                      {/* Wishlist Icon */}
                      <div
                        className="position-absolute top-0 end-0 m-2 bg-white shadow-sm rounded-circle p-2"
                        style={{ cursor: 'pointer' }}
                      >
                        <FaHeart className="text-danger" />
                      </div>

                      {/* Best Seller Ribbon */}
                      {/* <div className="position-absolute top-0 start-0 bg-info text-white px-2 py-1 small rounded-end">
                        Best Selling
                      </div> */}
                      <div className="ribbon-wrapper">
                        <div className="ribbon">Best Selling</div>
                      </div>
                    </div>

                    <Card.Body className="text-center d-flex flex-column px-2 pb-3 pt-4">
                      {/* Product Title */}
                      <div
                        className="small fw-medium text-muted mb-1"
                        style={{ fontSize: '0.8rem', height: '3rem', overflow: 'hidden' }}
                      >
                        {product.title}
                      </div>

                      {/* Rating Badge & Count */}
                      <div className="d-flex justify-content-center align-items-center gap-1 mb-2">
                        <Badge bg="success" className="px-2 py-1" style={{ fontSize: '0.7rem' }}>
                          <FaStar className="me-1" style={{ fontSize: '0.65rem' }} />
                          {product.rating}
                        </Badge>
                        <span className="text-muted small">(123)</span>
                      </div>

                      {/* Pricing Info */}
                      <div className="d-flex justify-content-center align-items-center gap-2 mb-2 flex-wrap">
                        <div className="fw-bold text-dark">₹{product.price}</div>
                        <div className="text-muted text-decoration-line-through small">₹{Math.round(product.price * 1.5)}</div>
                        <div className="text-success small fw-semibold">
                          {Math.round(100 - (product.price / (product.price * 1.5)) * 100)}% off
                        </div>
                      </div>

                      <Button variant="outline-primary" size="sm" className="mt-auto">
                        View
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Card>
  );
};

export default SimilarProducts;
