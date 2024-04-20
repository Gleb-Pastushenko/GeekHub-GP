import { Row, Col, Card, Stack, Carousel, Image } from 'react-bootstrap';

import interactive_icon from '../assets/interactive_icon.png';
import '../assets/сss/carousel-controls-restyling.css';

import img1 from "../assets/community_photos/img1.jpg";
import img2 from "../assets/community_photos/img2.jpg";
import img3 from "../assets/community_photos/img3.jpg";
import img4 from "../assets/community_photos/img4.jpg";
import img5 from "../assets/community_photos/img5.jpg";

const images = [img1, img2, img3, img4, img5]

const AboutUs = () => {
  const ambientBackground = (image) => {
    return {
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
  }

  return (
    <div className="py-3">
      <h3 className="text-center">Садове товариство "Лісова Поляна"</h3>

      <Carousel interval={null}>
        {images.map(image => (
          <Carousel.Item key={image} style={{ maxHeight: "400px", textAlign: "center", ...ambientBackground(image) }}>
            <div style={{ backdropFilter: "blur(15px)" }}>
              <Image src={image} className="mx-auto" style={{ maxHeight: "400px" }}></Image>
            </div>

          </Carousel.Item>
        ))}

      </Carousel>

      <Row className="py-3 py-md-5">
        <Col xs={12} md={6}>
          <Stack gap={3}>
            <Row style={{ background: "rgba(0,0,0,0.03)", padding: "10px" }}>
              <Col xs={3}>
                Голова:
              </Col>
              <Col xs={9}>
                Прокопчук Віра Михайлівна
              </Col>
            </Row>
            <Row style={{ background: "rgba(0,0,0,0.03)", padding: "10px" }}>
              <Col xs={3}>
                Адреса:
              </Col>
              <Col xs={9}>
                Черкаська область, Золотоніський район, Діньгівська ОТГ
              </Col>
            </Row>
            <Row style={{ background: "rgba(0,0,0,0.03)", padding: "10px" }}>
              <Col xs={3}>
                Тел.:
              </Col>
              <Col xs={9} style={{ display: "flex", justifyContent: "space-between" }}>
                <a href="tel:+380975555555" style={{ textDecoration: "none", color: "inherit" }}>+380975555555</a>
                <img src={interactive_icon} alt="clickable" style={{ height: "24px" }} />
              </Col>
            </Row>
            <Row style={{ background: "rgba(0,0,0,0.03)", padding: "10px" }}>
              <Col xs={3}>
                e-mail:
              </Col>
              <Col xs={9} style={{ display: "flex", justifyContent: "space-between" }}>
                <a href="mailto:lisova-polyana@gmail.com" style={{ textDecoration: "none", color: "inherit" }}>lisova-polyana@gmail.com</a>
                <img src={interactive_icon} alt="clickable" style={{ height: "24px" }} />
              </Col>
            </Row>
          </Stack>
        </Col>
        <Col xs={12} md={6} className="pt-4 pt-md-0">
          <Card>
            <Card.Header>
              <h4 className="text-center">Розташування товариства</h4>
            </Card.Header>
            <Card.Body>
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6037.745513866888!2d32.076419855327075!3d49.62187398524039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sua!2sua!4v1713437047707!5m2!1sua!2sua" width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default AboutUs
