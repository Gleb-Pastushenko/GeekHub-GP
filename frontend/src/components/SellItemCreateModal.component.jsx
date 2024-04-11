import { useEffect, useRef, useState } from 'react';
import { Modal, Card, CloseButton, Image, Form, Button, Row, Col } from 'react-bootstrap';

const SellItemCreateModal = (_props) => {
  const { currentUser, ...props } = _props;
  // imageFiles - array of files added to file input. Is used for tracking added files.
  // imageURLs - array of URL.createObjectURL temporary URLs. Is used for showing Thumbnails.
  // fileList - directly the fileList. Is used to recover file input aftef modal reopening.
  const [imageFiles, setImageFiles] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [fileList, setFileList] = useState(null);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const fileInputRef = useRef(null);

  useEffect(() => {
    const dataTransfer = new DataTransfer();

    imageFiles.forEach((file) => {
      dataTransfer.items.add(file)
    })

    setFileList(dataTransfer.files)

    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [imageFiles]);

  const handleTitleChange = e => {
    setTitle(e.target.value);
  }

  const handleTextChange = e => {
    setText(e.target.value);
  }

  const handleFileChange = e => {
    const currentFiles = [...imageFiles].map(file => file.name);
    const newFiles = [...e.target.files].filter(file => !currentFiles.includes(file.name))

    setImageFiles([...imageFiles, ...newFiles])
    setImageURLs([...imageURLs, ...newFiles.map(file => URL.createObjectURL(file))])
  }

  const handleImageRemove = idx => {
    setImageFiles([...imageFiles.toSpliced(idx, 1)]);
    setImageURLs([...imageURLs.toSpliced(idx, 1)]);
  }

  const handleOnShow = () => {
    fileInputRef.current.files = fileList;
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onShow={handleOnShow}
    >
      <Modal.Header closeButton>
        <h3>Нове оголошення</h3>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            type="text"
            placeholder="Заголовок"
            className="mb-3"
            onChange={handleTitleChange}
            value={title}
          />
          <Form.Control
            as="textarea"
            row={3}
            placeholder="Текст оголошення"
            className="mb-3"
            onChange={handleTextChange}
            value={text}
          />
          <Form.Group>
            <Form.Label>Додати фото:</Form.Label>
            <Form.Control
              type="file"
              accept=".jpg,.jpeg,.png"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <Button type="submit" className="mt-3">Зберегти</Button>

          </Form.Group>
        </Form>
        <Row className="pt-3">
          {imageURLs.map((imageURL, idx) => (
            <Col key={imageURL} className="p-1" xs={6} sm={4} md={3}>
              <Card className="h-100 position-relative">
                <Image src={imageURL} className="my-auto" thumbnail />
                <CloseButton
                  className="position-absolute top-0 end-0 bg-white"
                  onClick={() => handleImageRemove(idx)}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SellItemCreateModal;
