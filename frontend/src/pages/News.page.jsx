import { Row, Col } from 'react-bootstrap';

import NewsItem from '../components/NewsItem.component';
import { news } from '../assets/news';


const News = () => {
  return (
    <div className="py-3">
      <Row>
        {news.map(itemData => (
          <Col key={itemData._id} xs={12} sm={6} md={4} lg={3}>
            <NewsItem itemData={itemData} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default News;