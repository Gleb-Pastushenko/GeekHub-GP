import { Card, Col } from 'react-bootstrap';


const SellItemCard = ({ itemData, handleCardClick }) => {
  return (
    <Col xs={12} md={6} lg={4} xl={3} key={itemData._id}>
      <Card className="h-100" style={{ cursor: "pointer" }} onClick={() => handleCardClick(itemData)}>
        <Card.Img src={`/ads-for-sell/photos/${itemData._id}/${itemData.photos[0]}`} />
        <Card.Body>
          <Card.Title>
            {itemData.title}
          </Card.Title>
          <Card.Text>
            {`${itemData.text.slice(0, 70)}...`}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default SellItemCard
