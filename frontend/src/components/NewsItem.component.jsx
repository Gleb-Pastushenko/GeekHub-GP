import { Card } from 'react-bootstrap';


const NewsItem = ({ itemData }) => {
  return (
    <Card className="h-100" style={{ cursor: "pointer" }}>
      <Card.Img variant="top" src={itemData.image} />
      <Card.Body className="gap-3">
        <Card.Title>{itemData.title}</Card.Title>
        <Card.Text>{itemData.text}</Card.Text>
      </Card.Body>
      <Card.Footer className="fs-4 fw-bold text-secondary text-nowrap text-center">
        {itemData.date}
      </Card.Footer>
    </Card>
  )
}

export default NewsItem;
