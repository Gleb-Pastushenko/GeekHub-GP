import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import NewsItem from '../components/NewsItem.component';
import NewsCreateModal from '../components/NewsCreateModal.component';
import NewsChangeModal from '../components/NewsChangeModal.component';
import { dtFormat } from '../utility/dataAppearance';

const News = () => {
  // Form control states
  const [searchField, setSearchField] = useState('');
  const [showExpired, setShowExpired] = useState(false);

  // News list states
  const [filteredNews, setFilteredNews] = useState([]);
  const [newsListData, setNewsListData] = useState([]);

  // Selected News item data (for passing to NewsChangeModal)
  const [selectedNews, setSelectedNewsItem] = useState(null);

  // Modals show/hide states
  const [isShownCreateNewsModal, setIsShownCreateNewsModal] = useState(false);
  const [isShownChangeNewsModal, setIsShownChangeNewsModal] = useState(false);

  // UI states
  const [isRefreshRequired, setIsRefreshRequired] = useState(true);

  // Utility Functions
  const fetchData = async () => {
    const response = await fetch("/api/news");
    const data = await response.json();

    setNewsListData(data);
    setFilteredNews(data);
  }

  const filterNewsBySearch = (searchText) => {
    searchText = searchText.toLowerCase()

    setFilteredNews(newsListData.filter(item => {
      const title = item.title.toLowerCase();
      const text = item.text.toLowerCase();

      return title.includes(searchText) || text.includes(searchText);
    }))
  }

  // Initial data fetching and refreshing on change
  useEffect(() => {
    if (isRefreshRequired) {
      fetchData();
      setIsRefreshRequired(false);
    }
  }, [isRefreshRequired])

  // Form control handlers
  const handleSeachChange = (e) => {
    setSearchField(e.target.value);
    filterNewsBySearch(e.target.value);
  }

  const handleCreateNewsClick = () => {
    setIsShownCreateNewsModal(true);
  }

  const handleShowExpiredChange = (e) => {
    setShowExpired(e.target.checked);
  }

  // Items click handler
  const handleNewsItemClick = (itemData) => {
    setSelectedNewsItem(itemData);
    setIsShownChangeNewsModal(true);
  }

  // News Change Modal show/hide Handlers
  const changeNewsModalShowHandler = () => {

  }

  const changeNewsModalOnHideHandler = () => {
    setIsShownChangeNewsModal(false);
  }

  // News Create Modal show/hide Handlers
  const showCreateNewsModalHandler = () => {

  }

  const hideCreateNewsModalHandler = () => {

  }

  return (
    <div className="py-3">
      {/* Modal for creating/editing */}
      <NewsChangeModal
        // Native props
        show={isShownChangeNewsModal}
        onHide={changeNewsModalOnHideHandler}
        // Custom props
        setIsShown={setIsShownChangeNewsModal}
        setIsRefreshRequired={setIsRefreshRequired}
        itemData={selectedNews}
      />
      <NewsCreateModal show={isShownCreateNewsModal} onHide={hideCreateNewsModalHandler} itemData={selectedNews} />
      {/* Search field and Create button */}
      <Form className="pb-4">
        <Row>
          <Col xs="6">
            <Form.Control
              type="text"
              placeholder="Пошук"
              value={searchField}
              className="mr-sm-2 "
              onChange={handleSeachChange}
            />
          </Col>
          <Col xs="6">
            <Button onClick={handleCreateNewsClick} className="w-100 btn-secondary">Створити</Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Form.Check
              type="checkbox"
              id="showExpired"
              label="Показати завершені"
              checked={showExpired}
              onChange={handleShowExpiredChange}
            />
          </Col>
        </Row>
      </Form>
      {/* News Cards */}
      <Row className="g-3">
        {filteredNews.filter(item => showExpired || dtFormat(item.date, 'as_dt') >= new Date()).map(itemData => (
          <Col key={itemData.id} xs={12} sm={6} md={4} lg={3} onClick={() => handleNewsItemClick(itemData)}>
            <NewsItem itemData={itemData} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default News;