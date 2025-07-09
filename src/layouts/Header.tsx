// Header.tsx
import React, { useState, useRef, useEffect, type JSX } from 'react';
import {
    Navbar,
    Nav,
    Container,
    Dropdown,
    Offcanvas,
    Button
} from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import {
    FiChevronDown,
    FiChevronRight,
    FiChevronLeft,
    FiMenu,
    FiX
} from 'react-icons/fi';

import logo from '../assets/logo.png';
import promo from '../assets/images/offer_banner/promo.jpg';
import { useLogout } from './authentication/LogoutContext';
import { Link } from 'react-router-dom';

// Types
interface CategoryItem {
    name: string;
    children?: CategoryItem[];
}

// Sample categories (replace with your actual data source)
const shopCategories: CategoryItem[] = [
    {
        name: 'Traditional Tattoo',
        children: [
            { name: 'Tribal Tattoo Style' },
            { name: 'Watercolor Tattoo Style' },
            {
                name: 'Illustrative Tattoo Style',
                children: [{ name: 'Fine Line' }, { name: 'Bold Line' }]
            }
        ]
    },
    {
        name: 'Realistic Tattoo',
        children: [
            { name: 'Celtic Tattoo Style' },
            {
                name: 'Gradient Tattoo Style',
                children: [{ name: 'Monochrome' }, { name: 'Color Shift' }]
            }
        ]
    },
    {
        name: 'Blackwork Tattoo',
        children: [
            { name: 'Outline Tattoo Style' },
            { name: 'Silhouette Tattoo Style' }
        ]
    },
    {
        name: 'Watercolor Tattoo',
        children: [{ name: 'Flower Tattoo' }, { name: 'Rainbow Rose' }]
    },
    {
        name: 'Watercolor Tattoo',
        children: [{ name: 'Flower Tattoo' }, { name: 'Rainbow Rose' }]
    }
];

const Header: React.FC = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [lockMegaMenu, setLockMegaMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showShopDrawer, setShowShopDrawer] = useState(false);
    const megaMenuRef = useRef<HTMLDivElement>(null);
    const shopLinkRef = useRef<HTMLAnchorElement>(null);

    const { handleLogout } = useLogout();

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                megaMenuRef.current &&
                !megaMenuRef.current.contains(target) &&
                shopLinkRef.current &&
                !shopLinkRef.current.contains(target)
            ) {
                setLockMegaMenu(false);
                setShowMegaMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleCategory = (path: number[], _depth: number) => {
        const key = `collapse-${path.join('-')}`;
        const current = document.getElementById(key);
        if (current) {
            current.classList.toggle('collapsed');
        }
    };

    const renderCategories = (
        items: CategoryItem[],
        path: number[] = []
    ): JSX.Element[] => {
        return items.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;
            const newPath = [...path, index];
            const collapseId = `collapse-${newPath.join('-')}`;
            return (
                <div key={collapseId} className="category-item">
                    <div
                        className="category-title"
                        onClick={() => toggleCategory(newPath, newPath.length)}
                    >
                        {item.name}
                        {hasChildren ? (
                            <span className="icon">
                                <FiChevronDown />
                            </span>
                        ) : null}
                    </div>
                    {hasChildren && (
                        <div className="category-children collapsed" id={collapseId}>
                            {renderCategories(item.children!, newPath)}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <header>
            <Navbar expand="lg" className={`header-navbar ${isSticky ? 'sticky-header' : ''}`}>
                <Container fluid>
                    {/* Brand */}
                    <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center gap-2">
                        <img src={logo} alt="Logo" className="header-logo" />
                        <div className="header-text">
                            <h1 className="brand-title">VISTORA</h1>
                            <p className="brand-slogan">Shop Smart. Shop Vistora.</p>
                        </div>
                    </Navbar.Brand>

                    {/* My Profile + Toggle (right side) */}
                    <div className="d-flex align-items-center d-lg-none gap-2 ms-auto">
                        <Dropdown align="end">
                            <Dropdown.Toggle as="a" className="nav-link no_caret position-relative">
                                <span className="profile-label-with-dot">
                                    <span className="notif-dot-wrapper">
                                        <span className="notif-dot" />
                                        <span className="notif-ring" />
                                    </span>
                                    <FaUser className="me-1" /> My Profile
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='dropdown-menu_header align-item-center'>
                                <Dropdown.Item as={Link} to="/my-profile">View Profile</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/order-page" className="dropdown-item-with-ribbon">
                                <span className="ribbon-badge ">3</span> My Orders
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to="/wishlist" className="dropdown-item-with-ribbon">
                                <span className="ribbon-badge ">5</span> My wishlist
                                </Dropdown.Item>
                                <Dropdown.Item as={Link} to="/notifications" className="dropdown-item-with-ribbon">
                                <span className="ribbon-badge ">12</span> Notification
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button
                            variant="outline-none"
                            className="toggle-button"
                            onClick={() => setShowMobileMenu(true)}
                        >
                            <FiMenu size={24} />
                        </Button>
                    </div>

                    {/* Main Nav */}
                    <Navbar.Collapse id="main-navbar-nav" className="justify-content-end d-none d-lg-flex">
                        <Nav className="gap-4 align-items-center">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            <Nav.Link as={Link}
                                to="#"
                                ref={shopLinkRef}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setLockMegaMenu(!lockMegaMenu);
                                    setShowMegaMenu(true);
                                }}
                                onMouseEnter={() => setShowMegaMenu(true)}
                                onMouseLeave={() => !lockMegaMenu && setShowMegaMenu(false)}
                            >
                                Shop <FiChevronDown className="ms-1" />
                            </Nav.Link>
                            
                            <Nav.Link as={Link} to="/support">Contact</Nav.Link>

                            {/* Profile dropdown - visible only on lg+ */}
                            <Dropdown align="end" className="d-none d-lg-block">
                                <Dropdown.Toggle as="a" className="nav-link no_caret position-relative">
                                    <span className="profile-label-with-dot">
                                        <span className="notif-dot-wrapper">
                                            <span className="notif-dot" />
                                            <span className="notif-ring" />
                                        </span>
                                        <FaUser className="me-1" /> My Profile
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='dropdown-menu_header align-item-center'>
                                    <Dropdown.Item as={Link} to="/my-profile">View Profile</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/order-page" className="dropdown-item-with-ribbon">
                                        <span className="ribbon-badge">3</span> My Orders
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/wishlist" className="dropdown-item-with-ribbon">
                                        <span className="ribbon-badge ">5</span> My wishlist
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/notifications" className="dropdown-item-with-ribbon">
                                        <span className="ribbon-badge">12</span> Notification
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Mega Menu */}
            {showMegaMenu && (
                <div
                    className={`mega-menu ${lockMegaMenu ? 'persistent' : ''}`}
                    onMouseEnter={() => setShowMegaMenu(true)}
                    onMouseLeave={() => !lockMegaMenu && setShowMegaMenu(false)}
                    ref={megaMenuRef}
                >
                    <div className="mega-menu-content container">
                        <div className="mega-grid">
                            {shopCategories.map((cat, idx) => (
                                <div className="mega-box" key={idx}>
                                    <h5 className="main-category">{cat.name}</h5>
                                    {cat.children && renderCategories(cat.children, [idx])}
                                </div>
                            ))}
                            <div className="promo-image modern d-none d-md-block">
                                <img
                                    src={promo}
                                    alt="Promo"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Offcanvas */}
            <Offcanvas
                show={showMobileMenu}
                onHide={() => setShowMobileMenu(false)}
                placement="start"
                backdrop={false}
                className="mobile-menu"
            >
                <Offcanvas.Header className="justify-content-between">
                    <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center gap-2">
                        <img src={logo} alt="Logo" className="header-logo" />
                        <div className="header-text">
                            <h1 className="brand-title">VISTORA</h1>
                        </div>
                    </Navbar.Brand>
                    <Button variant="link" onClick={() => setShowMobileMenu(false)}>
                        <FiX size={24} />
                    </Button>
                </Offcanvas.Header>
                <hr />
                <Offcanvas.Body>
                    <Nav className="flex-column gap-2">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <div className="d-flex justify-content-between align-items-center">
                            <Nav.Link as={Link} to="/product-page" onClick={(e) => e.preventDefault()}>
                                Shop
                            </Nav.Link>
                            <Button variant="link" onClick={() => setShowShopDrawer(true)}>
                                <FiChevronRight />
                            </Button>
                        </div>
                        
                        <Nav.Link as={Link} to="/support">Contact</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Shop Drawer Offcanvas */}
            <Offcanvas
                show={showShopDrawer}
                onHide={() => setShowShopDrawer(false)}
                placement="start"
                backdrop={false}
                className="shop-drawer"
            >
                <Offcanvas.Header className="justify-content-between">
                    <h5>Product Category</h5>
                    <Button variant="link" onClick={() => setShowShopDrawer(false)}>
                        <FiChevronLeft size={20} />
                    </Button>
                </Offcanvas.Header>
                <hr />
                <Offcanvas.Body>
                    <div className="shop-categories">{renderCategories(shopCategories)}</div>
                </Offcanvas.Body>
            </Offcanvas>
        </header>
    );
};

export default Header;
