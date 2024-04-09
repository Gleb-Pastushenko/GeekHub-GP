import { Navbar, Nav, Container } from 'react-bootstrap'

import logo from '../assets/site-logo.png'
import { LinkContainer } from 'react-router-bootstrap'


const Header = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#">
            <img src={logo} alt="site logo" />
          </Navbar.Brand>
          <Nav.Link className="ms-auto me-3 me-lg-0 order-lg-2">
            <i className="fa-regular fa-user"></i> Username
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <LinkContainer to="/">
                <Nav.Link to="/">Новини</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/ads">
                <Nav.Link to="/ads">Оголошення</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/community">
                <Nav.Link to="/community">Товариство</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about-us">
                <Nav.Link to="/about-us">Про нас</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/payments">
                <Nav.Link to="/payments">Оплата</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header