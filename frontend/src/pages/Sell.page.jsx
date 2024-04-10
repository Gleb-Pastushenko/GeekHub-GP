import { Form, Button, Row, Col } from 'react-bootstrap';

import SellItemCard from '../components/SellItemCard.component';
import SellItemModal from '../components/SellItemModal.component';
import SellItemCreateModal from '../components/SellItemCreateModal.component';
import { adsForSell } from '../assets/ads-for-sell'
import { useState } from 'react';



const Sell = () => {
  const [searchField, setSearchField] = useState('');
  const [adsFilteredList, setAdsFilteredList] = useState(adsForSell);
  const [showAdItemModal, setShowAdItemModal] = useState(false);
  const [currentItemData, setCurrentItemData] = useState({});
  const [showCreateAdModal, setShowCreateAdModal] = useState(false);

  const currentUser = 'CurrentUser';

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
    setCurrentItemData(itemData);
    setShowAdItemModal(true);
  }

  const handleCreateAdClick = () => {
    setShowCreateAdModal(true);
  }

  return (
    <div className="pt-3">
      <SellItemModal show={showAdItemModal} onHide={() => setShowAdItemModal(false)} itemData={currentItemData} />
      <SellItemCreateModal show={showCreateAdModal} onHide={() => setShowCreateAdModal(false)} currentUser={currentUser} />
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
      <Row className="row-gap-3">
        {adsFilteredList.map(itemData => (
          <SellItemCard {...{ itemData, handleCardClick, key: itemData._id }} />
        ))}

      </Row>
    </div>
  )
}

export default Sell