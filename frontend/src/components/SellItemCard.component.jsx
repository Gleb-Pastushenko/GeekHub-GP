import { Card, Col } from 'react-bootstrap';


const SellItemCard = ({ itemData, onClick }) => {

  return (
    <Col xs={12} md={6} lg={4} xl={3} onClick={onClick}>
      <Card className="h-100" style={{ cursor: "pointer" }}>
        <Card.Img src={`${itemData.images[0]?.image}`} />
        <Card.Body>
          <Card.Title>
            {itemData.title}
          </Card.Title>
          <Card.Text>
            {`${itemData.text.slice(0, 70)}${itemData.text.length > 70 ? " . . ." : ""}`}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default SellItemCard
