import { Modal, Carousel, Image, Button } from 'react-bootstrap';

const SellItemModal = (_props) => {
  // Extract custom props
  const { itemData, setIsModalShown, setIsRefreshRequired, ...props } = _props;

  // Utility functions
  const deleteItem = async (itemId) => {
    const response = await fetch(`/api/sell-ads/${itemId}`, {
      method: 'DELETE',
    })

    return response;
  }

  // Control handlers
  const deleteClickHandler = async (itemId) => {
    const response = await deleteItem(itemId);
    if (response.ok) {
      setIsRefreshRequired(true);
      setIsModalShown(false);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {itemData?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel interval={null}>
          {itemData?.images.map((imageItem, idx) => (
            <Carousel.Item key={idx} className="h-100">
              <Image src={`${imageItem.image}`} className="w-100 mx-auto" />
            </Carousel.Item>
          ))}
        </Carousel>
        <p className="text-emphazis fs-5 pt-3">
          {itemData?.text}
        </p>


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => deleteClickHandler(itemData.id)} className="me-auto" variant="danger">Видалити</Button>
        <Button onClick={props.onHide}>Закрити</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SellItemModal;
