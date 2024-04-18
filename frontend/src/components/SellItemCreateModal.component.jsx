import { useEffect, useRef, useState } from 'react';
import { Modal, Card, CloseButton, Image, Form, Button, Row, Col } from 'react-bootstrap';

const SellItemCreateModal = (_props) => {
  // Extract custom props
  const { currentUser, setIsModalShown, setIsRefreshRequired, ...props } = _props;

  // Form control states
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviewURLs, setFilePreviewURLs] = useState([]);

  // Form control Refs
  const formRef = useRef();
  const fileInputRef = useRef();

  // Utility functions
  const sendData = async () => {
    const formData = new FormData(formRef.current);
    formData.append('user', 1)

    const response = await fetch('/api/sell-ads/', {
      method: 'POST',
      body: formData,
    })
  }

  const resetStates = () => {
    setTitle('');
    setText('');
  }

  const toFileList = (files) => {
    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));

    return dataTransfer.files;
  }

  const getImageURLs = (files) => {
    return selectedFiles.map(file => URL.createObjectURL(file))
  }

  const appendSelectedFiles = (files) => {
    const selectedFileNames = selectedFiles.map(file => file.name);
    const newFiles = files.filter(file => !selectedFileNames.includes(file.name));

    setSelectedFiles((currentFiles) => [...currentFiles, ...newFiles]);
  }

  // Refreshing file input state, and file preview URLs
  useEffect(() => {
    if (fileInputRef.current) {
      const fileList = toFileList(selectedFiles);

      fileInputRef.current.files = fileList;
      setFilePreviewURLs(getImageURLs(fileList));
    }
  }, [selectedFiles])


  // Form control handlers
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const result = await sendData();
    setIsRefreshRequired(true);

  }

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  }

  const textChangeHandler = (e) => {
    setText(e.target.value);
  }

  const inputFileChangeHandler = (e) => {
    appendSelectedFiles([...e.target.files]);
  }

  const closeClickHandler = () => {
    setIsModalShown(false);
  }

  const previewRemoveHandler = (idx) => {
    setSelectedFiles((currentFiles) => currentFiles.toSpliced(idx, 1))
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
              name="image"
              ref={fileInputRef}
            />
            <Button type="submit" className="mt-3">Зберегти</Button>
          </Form.Group>
        </Form>
        <Row className="pt-3">
          {filePreviewURLs.map((imageURL, idx) => (
            <Col key={imageURL} className="p-1" xs={6} sm={4} md={3}>
              <Card className="h-100 position-relative">
                <Image src={imageURL} className="my-auto" thumbnail />
                <CloseButton
                  className="position-absolute top-0 end-0 bg-white"
                  onClick={() => previewRemoveHandler(idx)}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closeClickHandler}>Закрити</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SellItemCreateModal;
