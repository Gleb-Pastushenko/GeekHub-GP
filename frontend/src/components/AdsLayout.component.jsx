import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet } from 'react-router-dom';

const AdsLayout = () => {
  return (
    <div>
      <Nav className="pt-3 text-color-primary" variant="tabs" defaultActiveKey="sell">

        <LinkContainer to="sell" eventKey="sell">
          <Nav.Link>Продаж</Nav.Link>
        </LinkContainer>


        <LinkContainer to="services">
          <Nav.Link>Послуги</Nav.Link>
        </LinkContainer>


        <LinkContainer to="vacancies">
          <Nav.Link>Вакансії</Nav.Link>
        </LinkContainer>
      </Nav>
      <Outlet />
    </div>
  )
}

export default AdsLayout
