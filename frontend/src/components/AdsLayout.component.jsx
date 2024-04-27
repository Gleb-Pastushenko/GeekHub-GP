import { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';


const AdsLayout = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    setCurrentPage(location.pathname.split('/').slice(-1));
  }, [location])

  return (
    <div>
      <Nav className="pt-3 justify-content-center" variant="tabs" activeKey={currentPage}>
        <LinkContainer to="sell" eventKey="sell">
          <Nav.Link eventKey="sell">Продаж</Nav.Link>
        </LinkContainer>
        <LinkContainer to="services">
          <Nav.Link eventKey="services">Послуги</Nav.Link>
        </LinkContainer>
        <LinkContainer to="vacancies">
          <Nav.Link eventKey="vacancies">Вакансії</Nav.Link>
        </LinkContainer>
      </Nav>
      <Outlet />
    </div>
  )
}

export default AdsLayout;
