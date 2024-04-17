import { Form, Button, Row, Col } from 'react-bootstrap';

import SellItemCard from '../components/SellItemCard.component';
import SellItemModal from '../components/SellItemModal.component';
import SellItemCreateModal from '../components/SellItemCreateModal.component';
import { useEffect, useState } from 'react';


const Sell = () => {
  // Form control states
  const [searchField, setSearchField] = useState('');

  // Ads list states
  const [adsList, setAdsList] = useState([]);
  const [filteredAdsList, setFilteredAdsList] = useState([]);

  // Modal show/hide status states
  const [isShownAdItemModal, setIsShownAdItemModal] = useState(false);
  const [isShownCreateAdModal, setIsShownCreateAdModal] = useState(false);

  // Selected Ad (to show in Modal)
  const [selectedAd, setSelectedAd] = useState(null);

  // UI states
  const [isRefreshRequired, setIsRefreshRequired] = useState(true);

  // Utility functions
  const filterAdsBySearch = (searchText) => {
    searchText = searchText.toLowerCase()

    setFilteredAdsList(adsList.filter(item => {
      const title = item.title.toLowerCase();
      const text = item.text.toLowerCase();

      return title.includes(searchText) || text.includes(searchText);
    }))
  }

  const fetchData = async () => {
    const response = await fetch('/api/sell-ads/');
    const data = await response.json();

    setAdsList(data);
    setFilteredAdsList(data);
  }

  // Initial data fetching, refsheshing after create/change items
  useEffect(() => {
    if (isRefreshRequired) {
      fetchData();
      setIsRefreshRequired(false);
    }

  }, [isRefreshRequired])

  const currentUser = 'CurrentUser';

  // Modal onShos/onHide handlers
  const createItemModalHideHandler = () => {
    setIsShownCreateAdModal(false);
  }

  const itemModalHideHandler = () => {
    setIsShownAdItemModal(false);
  }

  // Form control and event handlers
  const searchChangeHandler = e => {
    setSearchField(e.target.value);
    filterAdsBySearch(e.target.value);
  }

  const itemClickHandler = (itemData) => {
    setSelectedAd(itemData);
    setIsShownAdItemModal(true);
  }

  const createClickHandler = () => {
    setIsShownCreateAdModal(true);
  }

  return (
    <div className="pt-3">
      {/* Modals for viewing and creating news item */}
      <SellItemModal
        show={isShownAdItemModal}
        onHide={itemModalHideHandler}
        itemData={selectedAd}
        setIsRefreshRequired={setIsRefreshRequired}
        setIsModalShown={setIsShownAdItemModal}
      />
      <SellItemCreateModal
        show={isShownCreateAdModal}
        onHide={createItemModalHideHandler}
        currentUser={currentUser}
        setIsRefreshRequired={setIsRefreshRequired}
        setIsModalShown={setIsShownCreateAdModal}
      />
      {/* Search fiels and Create Button */}
      <Form className="pb-4">
        <Row>
          <Col xs="6">
            <Form.Control
              type="text"
              placeholder="Пошук"
              value={searchField}
              className="mr-sm-2"
              onChange={searchChangeHandler}
            />
          </Col>
          <Col xs="6">
            <Button onClick={createClickHandler} className="w-100 btn-secondary">Створити</Button>
          </Col>
        </Row>
      </Form>
      {/* Items List */}
      <Row className="g-3">
        {filteredAdsList.map(itemData => (
          <SellItemCard
            key={itemData.id}
            onClick={() => itemClickHandler(itemData)}
            itemData={itemData}
          />
        ))}

      </Row>
    </div>
  )
}

export default Sell