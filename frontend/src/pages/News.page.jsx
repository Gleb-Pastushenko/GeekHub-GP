import { Row, Col, Form, Button } from 'react-bootstrap';

import NewsItem from '../components/NewsItem.component';
import { news } from '../assets/news';
import { useState } from 'react';


const News = () => {
  const [searchField, setSearchField] = useState('');
  const [filteredNews, setFilteredNews] = useState(news);

  const handleSearch = e => {
    const searchText = e.target.value.toLowerCase();
    setSearchField(searchText);

    setFilteredNews(news.filter(item => {
      const title = item.title.toLowerCase();
      const text = item.text.toLowerCase();

      return title.includes(searchText) || text.includes(searchText);
    }))
  }

  const handleCreateAdClick = () => {

  }

  return (
    <div className="py-3">
      <Form className="pb-4">
        <Row>
          <Col xs="6">
            <Form.Control
              type="text"
              placeholder="Пошук"
              value={searchField}
              className="mr-sm-2"
              onChange={handleSearch}
            />
          </Col>
          <Col xs="6">
            <Button onClick={handleCreateAdClick} className="w-100">Створити</Button>
          </Col>
        </Row>
      </Form>
      <Row className="g-3">
        {filteredNews.map(itemData => (
          <Col key={itemData._id} xs={12} sm={6} md={4} lg={3}>
            <NewsItem itemData={itemData} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default News;