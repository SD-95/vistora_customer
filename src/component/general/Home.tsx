// ✅ Home.tsx

import { useState } from 'react';
import { Alert, Button, Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import banner_1 from '../../assets/images/offer_banner/banner_1.jpg';
import banner_2 from '../../assets/images/offer_banner/banner_2.jpg';
import banner_3 from '../../assets/images/offer_banner/banner_3.jpg';
import mob_1 from '../../assets/images/product/mob_1.jpg';
import mob_2 from '../../assets/images/product/mob_2.jpg';
import mob_3 from '../../assets/images/product/mob_3.jpg';
import mob_4 from '../../assets/images/product/mob_4.jpg';
import mob_5 from '../../assets/images/product/mob_5.jpg';
import mob_6 from '../../assets/images/product/mob_6.jpg';
import lap_1 from '../../assets/images/product/lap_1.jpg';
import lap_2 from '../../assets/images/product/lap_2.jpg';
import lap_3 from '../../assets/images/product/lap_3.jpg';
import lap_4 from '../../assets/images/product/lap_4.jpg';
import lap_5 from '../../assets/images/product/lap_5.jpg';
import lap_6 from '../../assets/images/product/lap_6.jpg';
import earbd_1 from '../../assets/images/product/earbod_1.jpg';
import earbd_2 from '../../assets/images/product/earbod_2.jpg';
import earbd_3 from '../../assets/images/product/earbod_3.jpg';
import earbd_4 from '../../assets/images/product/earbod_4.jpg';
import earbd_5 from '../../assets/images/product/earbod_5.jpg';
import earbd_6 from '../../assets/images/product/earbod_6.jpg';
import shoe_1 from '../../assets/images/product/shoe_1.jpg';
import shoe_2 from '../../assets/images/product/shoe_2.jpg';
import shoe_3 from '../../assets/images/product/shoe_3.jpg';
import shoe_4 from '../../assets/images/product/shoe_4.jpg';
import shoe_5 from '../../assets/images/product/shoe_5.jpg';
import shoe_6 from '../../assets/images/product/shoe_6.jpg';
import season_1 from '../../assets/images/product/season_1.jpg';
import season_2 from '../../assets/images/product/season_2.jpg';
import season_3 from '../../assets/images/product/season_3.jpg';
import season_4 from '../../assets/images/product/season_4.jpg';
import season_5 from '../../assets/images/product/season_5.jpg';
import Video_1 from '../../assets/images/offer_banner/video_1.mp4';
import Video_2 from '../../assets/images/offer_banner/video_2.mp4';

const banners = [
  { src: banner_1, caption: 'Big Summer Sale' },
  { src: banner_2, caption: 'Festive Deals Await' },
  { src: banner_3, caption: 'Exclusive Online Offers' },
];

type Product = {
  name: string;
  price: string;
  offer: string;
  badge: string;
  images: string[];
  video?: string;
  category?: string;
  finalPrice?: string;
  originalPrice?: string;
  discountPercent?: string;
  saveAmount?: string;
  availability?: 'in-stock' | 'out-of-stock' | 'limited';
  quantity?: number;
  size?: string;
  showLowStockAlert?: boolean;
  countdown?: string;
};

type ProductMap = {
  [key: string]: Product[];
};

const categories = [
  "Today's Top Picks",
  'Seasonal Picks',
  'Exclusive Drops',
  'New Launches'
];

const productsData: ProductMap = {
  "Today's Top Picks": [
    {
      name: '5G Android Mobiles',
      price: 'Rs. 499',
      offer: 'Flat 50% Off',
      badge: 'Best Selling',
      images: [mob_1, mob_2, mob_3, mob_4, mob_5, mob_6],
      category: 'Electronics',
      finalPrice: 'Rs. 499',
      originalPrice: 'Rs. 999',
      discountPercent: '50% Off',
      saveAmount: 'You Save Rs. 500',
      availability: 'in-stock',
      quantity: 20,
      size: 'Standard',
      countdown: '02:15:45'
    },
    {
      name: 'Premium Laptop',
      price: 'Rs. 899',
      offer: 'Save 20%',
      badge: 'Trending',
      images: [lap_1, lap_2, lap_3, lap_4, lap_5, lap_6],
      category: 'Computers',
      finalPrice: 'Rs. 899',
      originalPrice: 'Rs. 1125',
      discountPercent: '20% Off',
      saveAmount: 'You Save Rs. 226',
      availability: 'limited',
      quantity: 5,
      size: '15-inch',
      showLowStockAlert: true
    },
    {
      name: 'Premium Bluethooth Earbords',
      price: 'Rs. 299',
      offer: 'Grab Now',
      badge: 'Hot Deal',
      images: [earbd_1, earbd_2, earbd_3, earbd_4, earbd_5, earbd_6],
      category: 'electronics',
      finalPrice: 'Rs. 299',
      originalPrice: 'Rs. 599',
      discountPercent: '50% Off',
      saveAmount: 'You Save Rs. 300',
      availability: 'out-of-stock',
      quantity: 0,
      size: 'M',
    },
  ],
  'Seasonal Picks': [
    {
      name: 'Season Special',
      price: 'Rs. 799',
      offer: '30% Off',
      badge: 'Best Selling',
      images: [season_1, season_2, season_3, season_4, season_5],
      category: 'Seasonal',
      finalPrice: 'Rs. 799',
      originalPrice: 'Rs. 1140',
      discountPercent: '30% Off',
      saveAmount: 'You Save Rs. 341',
      availability: 'in-stock',
      quantity: 12,
      size: 'XL',
    },
    {
      name: 'Winter Warmers',
      price: 'Rs. 599',
      offer: 'Limited Stock',
      badge: 'Hot Deal',
      images: [],
      category: 'Winterwear',
      finalPrice: 'Rs. 599',
      originalPrice: 'Rs. 999',
      discountPercent: '40% Off',
      saveAmount: 'You Save Rs. 400',
      availability: 'limited',
      quantity: 3,
      size: 'L',
      showLowStockAlert: true,
      countdown: '05:22:10'
    },
    {
      name: 'Promo Video',
      price: 'Video Only',
      offer: 'Watch Now',
      badge: 'Trending',
      images: [],
      video: Video_1,
      category: 'Video Promo',
      availability: 'in-stock'
    },
  ],
  'Exclusive Drops': [
    {
      name: 'Smartwatch Pro X',
      price: 'Rs. 1099',
      offer: 'Introductory Price',
      badge: 'Hot Deal',
      images: [],
      category: 'Wearables',
      finalPrice: 'Rs. 1099',
      originalPrice: 'Rs. 1499',
      discountPercent: '27% Off',
      saveAmount: 'You Save Rs. 400',
      availability: 'in-stock',
      quantity: 30,
      size: 'One Size',
    },
    {
      name: 'Noise Cancelling Headphones',
      price: 'Rs. 749',
      offer: 'Just Dropped',
      badge: 'Trending',
      images: [],
      category: 'Audio Gear',
      finalPrice: 'Rs. 749',
      originalPrice: 'Rs. 999',
      discountPercent: '25% Off',
      saveAmount: 'You Save Rs. 250',
      availability: 'limited',
      quantity: 4,
      size: 'Adjustable',
      showLowStockAlert: true,
      countdown: '01:45:30'
    },
    {
      name: 'Launch Video',
      price: 'See the Reveal',
      offer: 'Watch First',
      badge: 'Trending',
      images: [],
      video: Video_2,
      category: 'Launch Event',
      availability: 'in-stock'
    }
  ],
  'New Launches': [
    {
      name: 'UltraSlim Smart TV',
      price: 'Rs. 1799',
      offer: 'New Arrival',
      badge: 'Best Selling',
      images: [],
      category: 'Home Entertainment',
      finalPrice: 'Rs. 1799',
      originalPrice: 'Rs. 1999',
      discountPercent: '10% Off',
      saveAmount: 'You Save Rs. 200',
      availability: 'in-stock',
      quantity: 10,
      size: '55-inch',
    },
    {
      name: 'Eco-Friendly Sneakers',
      price: 'Rs. 499',
      offer: 'Eco Style',
      badge: 'Hot Deal',
      images: [shoe_1, shoe_2, shoe_3, shoe_4, shoe_5, shoe_6],
      category: 'Sustainable Fashion',
      finalPrice: 'Rs. 499',
      originalPrice: 'Rs. 699',
      discountPercent: '29% Off',
      saveAmount: 'You Save Rs. 200',
      availability: 'limited',
      quantity: 2,
      size: 'M',
      showLowStockAlert: true,
    },
    {
      name: 'Smart Kitchen Setup',
      price: 'Rs. 999',
      offer: 'Kitchen Combo',
      badge: 'Trending',
      images: [],
      category: 'Kitchen Appliances',
      finalPrice: 'Rs. 999',
      originalPrice: 'Rs. 1399',
      discountPercent: '29% Off',
      saveAmount: 'You Save Rs. 400',
      availability: 'in-stock',
      quantity: 8,
      size: 'Standard',
      countdown: '03:12:20'
    }
  ]
};

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof productsData>("Today's Top Picks");

  return (
    <div className="home-wrapper">
      <Container fluid className="px-0">
        {/* Hero Banner */}
        <Carousel fade indicators controls interval={4000} className="hero-carousel">
          {banners.map((banner, idx) => (
            <Carousel.Item key={idx} className="hero-slide">
              <div className="hero-img-wrapper">
                <img src={banner.src} alt={banner.caption} className="hero-img" />
                <div className="hero-overlay" />
              </div>
              <Carousel.Caption className="hero-caption">
                <motion.h2 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                  {banner.caption}
                </motion.h2>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <Button variant="warning" className="cta-btn_home mt-3">Shop Now</Button>
                </motion.div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Section Selector */}
        <Container className="d-flex my-5 flex-column flex-lg-row">
          {/* Sidebar */}

          <div className="deal-nav-modern p-3 shadow-sm rounded-4 bg-white">
            <h5 className="mb-3 fw-semibold text-secondary d-none d-md-block">Categories</h5>

            {/* Desktop vertical stack */}
            <div className="d-none d-md-flex flex-column gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={cat === activeCategory ? 'dark' : 'outline-secondary'}
                  className={`category-pill ${cat === activeCategory ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            {/* Mobile grid style */}
            <div className="category-grid d-flex d-md-none flex-wrap justify-content-between gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={cat === activeCategory ? 'dark' : 'outline-secondary'}
                  className={`category-grid-btn ${cat === activeCategory ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Product Cards */}
          <div className="flex-grow-1 px-3">
            <div className="section-header d-flex justify-content-between align-items-center mb-4">
              <h2 key={activeCategory} className="section-title mb-0">🔥 {activeCategory}</h2>
              <Button
                as={Link as any}
                to='product-page'
                variant="link"
                className="text-decoration-none text-dark d-flex align-items-center p-0 view-more-btn"
              >
                View More <FaArrowRight className="ms-1" />
              </Button>
            </div>

            {/* product details */}
            <Row className="g-4 justify-content-center">
              {productsData[activeCategory]?.map((product, idx) => (
                <Col key={idx} lg={4} md={6} sm={12} className="animated-fade">
                  <Card className="product-card-ticket shadow-sm rounded-4 overflow-hidden">
                    <div className="product-image-container position-relative">
                      {product.video ? (
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="product-card-ticket-media"
                        >
                          <source src={product.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <Carousel indicators={false} controls={false} interval={2000} fade>
                          {product.images.map((img, i) => (
                            <Carousel.Item key={i}>
                              <img
                                src={img}
                                className="product-card-ticket-media"
                                alt={`Product ${i}`}
                              />
                            </Carousel.Item>
                          ))}
                        </Carousel>
                      )}

                      <div className={`product-ribbon-modern ${product.badge.toLowerCase().replace(' ', '-')}`}>
                        {product.badge}
                      </div>

                      <div className="wishlist-button">
                        <i className="bi bi-heart-fill"></i>
                      </div>

                      {/* Hover Slide-up Panel */}
                      <div className="product-hover-details">
                        <Link to='product-detail' className="product-name fw-bold">{product.name}</Link>
                        <div className="product-category text-muted small mb-1">{product.category}</div>
                        <div className="seller-badge"><i className="bi bi-shield-check"></i> Vistora Assured</div>

                        <div className="price-block mt-2">
                          <span className="text-dark fw-semibold">₹{product.finalPrice}</span>{' '}
                          <span className="price-original ms-2">₹{product.originalPrice}</span>{' '}
                          <span className="price-discount text-success fw-semibold">{product.discountPercent}</span>
                        </div>

                        {product.saveAmount && <div className="save-amount text-success small">{product.saveAmount}</div>}

                        <div className="availability mt-1">
                          {product.availability === 'in-stock' && '✅ In Stock'}
                          {product.availability === 'out-of-stock' && '❌ Out of Stock'}
                          {product.availability === 'limited' && '⚠️ Limited Availability'}
                        </div>

                        {product.quantity !== undefined && <div className="quantity">Quantity: {product.quantity}</div>}
                        {product.size && <div className="size">Size: {product.size}</div>}

                        {product.showLowStockAlert && (
                          <Alert variant="danger" className="low-stock-alert mt-2">
                            Only Few Left!
                          </Alert>
                        )}

                        {product.countdown && (
                          <div className="countdown mt-1 text-danger small">⏳ Ends in: {product.countdown}</div>
                        )}
                      </div>
                    </div>

                    <Card.Body className="px-4 py-3 product-body-on-hover product-basic-info">
                      <Card.Title className="mt-2 text-truncate fw-semibold fs-5">
                        {product.name}
                      </Card.Title>
                      <div className="product-offer text-success small fw-bold">
                        {product.offer}
                      </div>
                      <div className="product-price text-muted mb-2">
                        {product.price}
                      </div>
                    </Card.Body>
                    <Card.Footer>
                      <Link to='/product-detail'>
                        <Button
                          variant="dark"
                          className="w-100 mt-2 rounded-pill shadow-sm"
                        >
                          View Product <FaArrowRight className="ms-2" />
                        </Button>
                      </Link>
                    </Card.Footer>

                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </Container>
    </div>
  );
};

export default Home;