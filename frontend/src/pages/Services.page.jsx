import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import ServiceItem from '../components/ServiceItem.component';
import ServiceCreateModal from '../components/ServiceCreateModal.component';
import ServiceChangeModal from '../components/ServiceChangeModal.component';


const Services = () => {
  // Form control states
  const [searchField, setSearchField] = useState('');

  // Services list states
  const [filteredServices, setFilteredServices] = useState([]);
  const [servicesListData, setServicesListData] = useState([]);

  // Selected Service item data (for passing to ServiceChangeModal)
  const [selectedService, setSelectedServiceItem] = useState(null);

  // Modals show/hide states
  const [isShownCreateServiceModal, setIsShownCreateServiceModal] = useState(false);
  const [isShownChangeServiceModal, setIsShownChangeServiceModal] = useState(false);

  // UI states
  const [isRefreshRequired, setIsRefreshRequired] = useState(true);

  // Utility Functions
  const fetchData = async () => {
    const response = await fetch("/api/services/");
    const data = await response.json();

    setServicesListData(data);
    setFilteredServices(data);
  }

  const filterServicesBySearch = (searchText) => {
    searchText = searchText.toLowerCase()

    setFilteredServices(servicesListData.filter(item => {
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
    filterServicesBySearch(e.target.value);
  }

  const handleCreateServiceClick = () => {
    setIsShownCreateServiceModal(true);
  }

  // Items click handler
  const handleServiceItemClick = (itemData) => {
    setSelectedServiceItem(itemData);
    setIsShownChangeServiceModal(true);
  }

  // ServiceChangeModal show/hide Handlers
  const changeServiceModalOnHideHandler = () => {
    setIsShownChangeServiceModal(false);
  }

  // ServiceCreateModal show/hide Handlers
  const createServiceModalOnHideHandler = () => {
    setIsShownCreateServiceModal(false);
  }

  return (
    <div className="py-3">
      {/* Modal for creating/editing */}
      <ServiceChangeModal
        // Native props
        show={isShownChangeServiceModal}
        onHide={changeServiceModalOnHideHandler}
        // Custom props
        setIsShown={setIsShownChangeServiceModal}
        setIsRefreshRequired={setIsRefreshRequired}
        itemData={selectedService}
      />
      <ServiceCreateModal
        // Native props
        show={isShownCreateServiceModal}
        onHide={createServiceModalOnHideHandler}
        // Custom props
        setIsShown={setIsShownCreateServiceModal}
        setIsRefreshRequired={setIsRefreshRequired}
      />
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
            <Button onClick={handleCreateServiceClick} className="w-100 btn-secondary">Створити</Button>
          </Col>
        </Row>

      </Form>
      {/* News Cards */}
      <Row className="g-3">
        {filteredServices.map(itemData => (
          <Col key={itemData.id} xs={12} sm={6} md={4} lg={3} onClick={() => handleServiceItemClick(itemData)}>
            <ServiceItem itemData={itemData} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Services
