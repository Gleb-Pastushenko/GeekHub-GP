import { Form, Button, Row, Col, Card } from 'react-bootstrap';

import SellItemModal from '../components/SellItemModal.component';
import { adsForSell } from '../assets/ads-for-sell'
import { useState } from 'react';


const Sell = () => {
  const [searchField, setSearchField] = useState('');
  const [adsFilteredList, setAdsFilteredList] = useState(adsForSell);
  const [showModal, setShowModal] = useState(false);
  const [currentItemData, setCurrentItemData] = useState({});

  const handleSearch = e => {
    const searchText = e.target.value.toLowerCase();

    setSearchField(searchText);

    setAdsFilteredList(adsForSell.filter(item => {
      const title = item.title.toLowerCase();
      const text = item.text.toLowerCase();

      return title.includes(searchText) || text.includes(searchText);
    }))
  }

  const handleCardClick = (itemData) => {
    setShowModal(true);
    setCurrentItemData(itemData);
  }

  return (
    <div className="pt-3">
      <SellItemModal show={showModal} onHide={() => setShowModal(false)} itemData={currentItemData} />
      <Form className="pb-4">
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Пошук"
              value={searchField}
              className="mr-sm-2"
              onChange={handleSearch}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Створити Оголошення</Button>
          </Col>
        </Row>
      </Form>
      <Row className="row-gap-3">
        {adsFilteredList.map(itemData => (
          <Col xs={12} md={6} lg={4} xl={3} key={itemData._id}>
            <Card className="h-100" onClick={() => handleCardClick(itemData)}>
              <Card.Img src={`/ads-for-sell/photos/${itemData._id}/${itemData.photos[0]}`} />
              <Card.Body>
                <Card.Title>
                  {itemData.title}
                </Card.Title>
                <Card.Text>
                  {itemData.text}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}

      </Row>
    </div>
  )
}

export default Sell