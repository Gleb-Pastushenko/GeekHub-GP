import { useEffect, useRef, useState } from 'react';
import { Modal, Card, CloseButton, Image, Form, Button, Row, Col } from 'react-bootstrap';

const SellItemCreateModal = (_props) => {
  // Extract custom props
  const { currentUser, ...props } = _props;

  // Form control states
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageFiles, setImageFiles] = useState([]);

  // Form control Refs
  const formRef = useRef();
  const fileInputRef = useRef();

  // Utility functions
  const sendData = async () => {
    const formData = new FormData(formRef.current);

    const response = await fetch('/api/news/', {
      method: 'POST',
      body: formData,
    })

    // formData.append('title', title);
    // formData.append('text', text);
    // if (imageFiles) formData.append('image', imageFiles, imageFiles.name);
  }



  // imageFiles - array of files added to file input. Is used for tracking added files.
  // imageURLs - array of URL.createObjectURL temporary URLs. Is used for showing Thumbnails.
  // fileList - directly the fileList. Is used to recover file input aftef modal reopening.
  const [imageURLs, setImageURLs] = useState([]);
  const [fileList, setFileList] = useState(null);

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

  // Form control handlers
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const result = await sendData();
  }

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  }

  const textChangeHandler = (e) => {
    setText(e.target.value);
  }

  const inputFileChangeHandler = (e) => {
    setImageFiles(e.target.files);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onShow={() => { }}
    >
      <Modal.Header closeButton>
        <h3>Створити оголошення</h3>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formSubmitHandler} ref={formRef}>
          <Form.Group>
            <Form.Label>Заголовок:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Заголовок"
              onChange={titleChangeHandler}
              name="title"
              value={title}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Текст оголошення:</Form.Label>
            <Form.Control
              required
              as="textarea"
              row={3}
              placeholder="Текст оголошення"
              onChange={textChangeHandler}
              name="text"
              value={text}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Додати фото:</Form.Label>
            <Form.Control
              required
              type="file"
              accept=".jpg,.jpeg,.png"
              multiple
              onChange={inputFileChangeHandler}
              name="images"
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
