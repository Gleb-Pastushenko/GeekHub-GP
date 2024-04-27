import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

import logo from '../assets/site-logo.png';
import { LinkContainer } from 'react-router-bootstrap';


const Header = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    setCurrentPage(location.pathname.split('/')[1]);
  }, [location]);

  return (
    <header>
      <Navbar collapseOnSelect fixed="top" expand="lg" className="bg-body-secondary">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="#">
              <img src={logo} alt="site logo" />
            </Navbar.Brand>
          </LinkContainer>
          <LinkContainer to="user-profile">
            <Nav.Link className="ms-auto me-3 me-lg-0 order-lg-2" active={currentPage === 'user-profile'}>
              <i className="fa-regular fa-user"></i> Login
            </Nav.Link>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto" activeKey={currentPage}>
              <LinkContainer to="/">
                <Nav.Link eventKey="news">Новини</Nav.Link>
              </LinkContainer>
              <LinkContainer to="ads">
                <Nav.Link eventKey="ads">Оголошення</Nav.Link>
              </LinkContainer>
              <LinkContainer to="community">
                <Nav.Link eventKey="community">Товариство</Nav.Link>
              </LinkContainer>
              <LinkContainer to="about-us">
                <Nav.Link eventKey="about-us">Про нас</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header