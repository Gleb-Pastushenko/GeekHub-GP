import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import Footer from "./Footer.component"
import Header from "./Header.component"


const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default RootLayout