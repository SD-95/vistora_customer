import React, { useState } from 'react';
import { FaTimes, FaChevronRight } from 'react-icons/fa';
import couponImg from '../assets/images/offer_banner/cupon.png'; // Replace with your actual image path

const FloatingCoupon = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <React.Fragment>

            <div className={`floating-coupon ${isOpen ? 'open' : ''}`}>
                {/* Sticky Tab Icon */}
                {!isOpen && (
                    <div className="coupon-tab" onClick={() => setIsOpen(true)}>
                        <FaChevronRight />
                        <span>UPTO ₹300 OFF</span>
                    </div>
                )}

                {/* Full Coupon Panel */}
                {isOpen && (
                    <div className="coupon-panel">
                        <div className="coupon-header">
                            <span>Avail Upto</span>
                            <h2>₹300 OFF</h2>
                            <p>
                                Coupon Code: <strong>FLAT300</strong>
                                <br /> Applicable on your first order
                            </p>
                            <button className="btn btn-danger">SIGN UP NOW &gt;</button>
                            <FaTimes className="close-icon" onClick={() => setIsOpen(false)} />
                        </div>
                        <div className="coupon-body">
                            <img src={couponImg} alt="Coupon Offer" />
                        </div>
                        <div className="coupon-footer">
                            <span>Genuine Products</span>
                            <span>Try & Buy</span>
                            <span>Easy Exchanges & Returns</span>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
};

export default FloatingCoupon;
