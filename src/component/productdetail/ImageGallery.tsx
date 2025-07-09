// components/ImageGallery.tsx
import React, { useState } from 'react';

import soap_1 from '../../assets/images/product/shop_1.jpg';
import soap_2 from '../../assets/images/product/shop_2.jpg';
import soap_3 from '../../assets/images/product/soap_3.jpg';
import soap_4 from '../../assets/images/product/soap_4.jpg';
import soap_5 from '../../assets/images/product/soap_5.jpg';
import soap_6 from '../../assets/images/product/soap_6.jpg';
import { Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const images = [
  soap_1,
  soap_2,
  soap_3,
  soap_4,
  soap_5,
  soap_6,
];

const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="gallery-wrapper">
      <div className="gallery-container">
        <div className="gallery-thumbnails">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Main Image with Heart Icon */}
        <div className="gallery-main position-relative">
          <img src={selectedImage} alt="Selected" className="main-image" />
          <Link to='/wishlist' >
            <FaHeart className="wishlist-icon" size='30px' />
          </Link>
        </div>
      </div>

      <div className="gallery-buttons offset-2">
        <Button as={Link as any} to='/add-cart' variant="warning" className="fw-bold px-4">ADD TO CART</Button>
        <Button as={Link as any} to='/checkout' variant="danger" className="fw-bold px-4">BUY NOW</Button>
      </div>
    </div>
  );
};

export default ImageGallery;
