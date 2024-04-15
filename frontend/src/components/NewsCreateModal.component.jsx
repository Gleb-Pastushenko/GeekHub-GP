import { useState, useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';


const NewsCreateModal = (_props) => {
  const { itemData, ...props } = _props;

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [dateTime, setDateTime] = useState('');
  const [fileInput, setFileInput] = useState(null);

  const formRef = useRef();
  const fileInputRef = useRef();

  console.log(itemData);

  useEffect(() => {
    console.log('item_data fired')
    if (itemData) {
      setTitle(itemData.title);
      setText(itemData.text);
      setDateTime(itemData.date.slice(0, -6));
      setSelectedFile(fileInput);
    } else {
      setTitle('');
      setText('');
      setDateTime('');
      setSelectedFile(null);
    }
  }, [itemData])

  const resetFormFields = () => {
    setTitle('');
    setText('');
    setDateTime('');
    setSelectedFile(null);
    formRef.current.reset();
  }

  const handleModalShow = () => {
    if (fileInput) {
      fileInputRef.current.files = fileInput;
    }
  }

  const handleModalClose = () => {
    setFileInput(fileInputRef.current.files);
    props.onHide();

    if (itemData) {
      resetFormFields();
    }
  }

  const handleTitleChange = e => {
    setTitle(e.target.value);
  }

  const handleTextChange = e => {
    setText(e.target.value);
  }

  const handleFileChange = e => {
    setSelectedFile(e.target.files[0]);
  }

  const handleDateTimeChange = e => {
    setDateTime(e.target.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    if (selectedFile) formData.append('image', selectedFile, selectedFile.name);
    formData.append('date', dateTime);

    try {
      const response = await fetch(`/api/news/${itemData ? itemData.id : ''}`, {
        method: itemData ? 'PATCH' : 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        props.onHide();
        resetFormFields();
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(`/api/news/${itemData.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        props.onHide();
        resetFormFields();
      } else {
        console.error('Item deleting failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onShow={handleModalShow}
    >
      {`selectedFile: ${selectedFile}\n`}
      {`fileInput: ${fileInput}`}
      <Modal.Header closeButton>
        <h3>{itemData ? 'Редагувати новину' : 'Створити новину'}</h3>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <Form.Label>Заголовок:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Заголовок"
            className="mb-3"
            onChange={handleTitleChange}
            value={title}
          />
          <Form.Label>Текст Новини:</Form.Label>
          <Form.Control
            required
            as="textarea"
            row={3}
            placeholder="Текст Новини"
            className="mb-3"
            onChange={handleTextChange}
            value={text}
          />
          <Form.Group>
            <Form.Label>Додати фото:</Form.Label>
            <Form.Control
              required={!itemData}
              className="mb-3"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Дата події:</Form.Label>
            <Form.Control
              required
              type="datetime-local"
              onChange={handleDateTimeChange}
              value={dateTime}
            />

          </Form.Group>
          <Form.Group className="mt-3">
            <Button type="submit">Зберегти</Button>
            <Button className="ms-3" onClick={resetFormFields}>Очистити</Button>
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        {itemData ? <Button className="me-auto" variant="danger" onClick={() => handleDeleteItem(itemData.id)}>Видалити новину</Button> : ''}
        <Button onClick={handleModalClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewsCreateModal
