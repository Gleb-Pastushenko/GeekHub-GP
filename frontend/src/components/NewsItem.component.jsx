import { Card } from 'react-bootstrap';


const NewsItem = ({ itemData }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={`/news/photos/${itemData.url}`} />
      <Card.Body className="gap-3">
        <Card.Title>{itemData.title}</Card.Title>
        <Card.Text>{itemData.text}</Card.Text>
      </Card.Body>
      <Card.Footer>
        DateTime
      </Card.Footer>
    </Card>
  )
}

export default NewsItem;
