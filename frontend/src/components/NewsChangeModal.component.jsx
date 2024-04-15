import { useState, useRef, useEffect } from 'react';
import { Modal, Alert, Form, Button } from 'react-bootstrap';

import { dtFormat } from '../utility/dataAppearance';


const NewsChangeModal = (_props) => {
  // Extract custom props
  const { setIsShown, itemData, ...props } = _props;

  // Form control states
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [dateTime, setDateTime] = useState('');

  // UI states
  const [showSentError, setShowSentError] = useState(false);

  // Form control Refs
  const formRef = useRef();
  const fileInputRef = useRef();

  // Utility components
  const sendErrorAlert = (
    <Alert className="mt-3" variant="danger">
      Збій відправки данних!
    </Alert>
  )

  // Utility Functions
  const resetStates = () => {
    setTitle('');
    setText('');
    setImageFile(null);
    setDateTime('');
    setShowSentError(false);
  }

  const sendChanges = async () => {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('text', text);
    if (imageFile) formData.append('image', imageFile, imageFile.name);
    formData.append('date', dateTime);

    try {
      const response = await fetch(`/api/news/${itemData.id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        return 0

      } else {
        console.error('Form submission failed');
        return 1
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      return 1
    }
  }

  // Handle Modal show/hide
  useEffect(() => {
    if (props.show) {
      // Set form fields according to item data
      setTitle(itemData.title);
      setText(itemData.text);
      setDateTime(itemData.date);
    } else {
      // Reset form fields on modal close
      setTitle('');
      setText('');
      setImageFile(null);
      setDateTime('');
    }

  }, [props.show])

  // Modal show/hide handlers
  const handleModalShow = () => {

  }

  // Form controls two way bandling handlers
  const formOnSubmitHandler = async () => {
    const result = await sendChanges();
    if (result === 1) {
      setShowSentError(true);
    }
  }

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  }

  const textChangeHandler = (e) => {
    setText(e.target.value);
  }

  const inputFileChangeHandler = (e) => {
    setImageFile(e.target.files[0]);
  }

  const dateTimeChangeHandler = (e) => {
    setDateTime(e.target.value);
  }

  const clearClickHandler = () => {

  }

  const deleteClickHandler = () => {

  }

  const closeClickHandler = () => {
    resetStates();
    setIsShown(false);
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onShow={handleModalShow}
    >
      <Modal.Header closeButton>
        <h3>{itemData ? 'Редагувати новину' : 'Створити новину'}</h3>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formOnSubmitHandler} ref={formRef}>
          <Form.Label>Заголовок:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Заголовок"
            className="mb-3"
            onChange={titleChangeHandler}
            value={title}
          />
          <Form.Label>Текст Новини:</Form.Label>
          <Form.Control
            as="textarea"
            row={3}
            placeholder="Текст Новини"
            className="mb-3"
            onChange={textChangeHandler}
            value={text}
          />
          <Form.Group>
            <Form.Label>Додати фото:</Form.Label>
            <Form.Control
              className="mb-3"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={inputFileChangeHandler}
              ref={fileInputRef}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Дата події:</Form.Label>
            <Form.Control
              type="datetime-local"
              onChange={dateTimeChangeHandler}
              value={dateTime}
            />

            {showSentError ? sendErrorAlert : ''}

          </Form.Group>
          <Form.Group className="mt-3">
            <Button type="submit">Зберегти</Button>
            <Button className="ms-3" onClick={clearClickHandler}>Очистити</Button>
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        {itemData ? <Button className="me-auto" variant="danger" onClick={deleteClickHandler}>Видалити новину</Button> : ''}
        <Button onClick={closeClickHandler}>Close</Button>
      </Modal.Footer>
    </Modal >
  )
}

export default NewsChangeModal
