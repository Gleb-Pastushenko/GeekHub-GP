import { Modal, Carousel, Image, Button } from 'react-bootstrap';

const SellItemModal = (props) => {
  const { itemData } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {itemData.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel>
          {itemData.photos?.map((item, idx) => (
            <Carousel.Item>
              <Image src={`/ads-for-sell/photos/${itemData._id}/${item}`} height="600px" />
            </Carousel.Item>
          ))}
        </Carousel>
        <p className="text-emphazis fs-5 pt-3">
          {itemData.text}
        </p>


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SellItemModal;
