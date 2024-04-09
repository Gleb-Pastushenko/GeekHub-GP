import { Navbar, Nav, Container } from 'react-bootstrap'

import logo from '../assets/site-logo.png'

const Header = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="site logo" />
          </Navbar.Brand>
          <Nav.Link className="ms-auto me-3 me-lg-0 order-lg-2">
            <i className="fa-regular fa-user"></i> Username
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="/">Новини</Nav.Link>
              <Nav.Link href="/ads">Оголошення</Nav.Link>
              <Nav.Link href="/members">Товариство</Nav.Link>
              <Nav.Link href="/about-us">Про нас</Nav.Link>
              <Nav.Link href="/payments">Оплата</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header