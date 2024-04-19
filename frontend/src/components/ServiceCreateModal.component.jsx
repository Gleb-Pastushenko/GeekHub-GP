import { useState, useRef } from 'react';
import { Modal, Alert, Form, Button } from 'react-bootstrap';


const ServiceCreateModal = (_props) => {
  // Extract custom props
  const { setIsShown, setIsRefreshRequired, ...props } = _props;

  // Form control states
  const [formValidated, setFormValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // UI states
  const [showSentError, setShowSentError] = useState(false);

  // Form control Refs
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
    setShowSentError(false);
  }

  const sendData = async () => {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('text', text);
    if (imageFile) formData.append('image', imageFile, imageFile.name);

    try {
      const response = await fetch(`/api/services/`, {
        method: 'POST',
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

  // Modal show/hide handlers
  const modalShowHandler = () => {
    resetStates();
  }

  // Form controls two way bandling handlers
  const formOnSubmitHandler = async (e) => {
    const form = e.currentTarget;

    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      setFormValidated(true);
    } else {
      const result = await sendData();
      if (result === 1) {
        setShowSentError(true);
      } else {
        resetStates();
        setIsRefreshRequired(true);
        setIsShown(false);
      }
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
      onShow={modalShowHandler}
    >
      <Modal.Header closeButton>
        <h3>Створити послугу</h3>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate validated={formValidated} onSubmit={formOnSubmitHandler} id="change-item-form">
          <Form.Group className="mb-3">
            <Form.Label>Заголовок:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Заголовок"
              onChange={titleChangeHandler}
              value={title}
              maxLength={100}
            />
            <Form.Text>Залишилось {100 - title.length}</Form.Text>
            <Form.Control.Feedback type="invalid">Обов'язкове поле!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Опис послуги:</Form.Label>
            <Form.Control
              required
              as="textarea"
              row={3}
              placeholder="Опис послуги"

              onChange={textChangeHandler}
              value={text}
              maxLength={500}
            />
            <Form.Text>Залишилось {500 - text.length}</Form.Text>
            <Form.Control.Feedback type="invalid">Обов'язкове поле!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Додати фото:</Form.Label>
            <Form.Control
              required
              className="mb-3"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={inputFileChangeHandler}
              ref={fileInputRef}
            />
            <Form.Control.Feedback type="invalid">Обов'язкове поле!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            {showSentError ? sendErrorAlert : ''}
          </Form.Group>

          <Form.Group className="mt-3">
            <Button type="submit" name="save-button">Зберегти</Button>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={closeClickHandler}>Закрити</Button>
      </Modal.Footer>
    </Modal >
  )
}

export default ServiceCreateModal
