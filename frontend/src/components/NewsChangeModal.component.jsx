import { useState, useRef, useEffect } from 'react';
import { Modal, Alert, Form, Button } from 'react-bootstrap';


const NewsChangeModal = (_props) => {
  // Extract custom props
  const { setIsShown, setIsRefreshRequired, itemData, ...props } = _props;

  // Form control states
  const [formValidated, setFormValidated] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [dateTime, setDateTime] = useState('');

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
        return 0

      } else {
        return 1
      }

    } catch (error) {
      return 1
    }
  }

  const deleteItem = async () => {
    try {
      const response = await fetch(`/api/news/${itemData.id}`, {
        method: 'DELETE',
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
      setDateTime(itemData.date.slice(0, -6));
    } else {
      // Reset form fields on modal close
      setTitle('');
      setText('');
      setImageFile(null);
      setDateTime('');
    }
  }, [props.show])

  // Form controls two way bandling handlers
  const formOnSubmitHandler = async (e) => {
    const form = e.currentTarget;
    const submitter = e.nativeEvent.submitter;

    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      setFormValidated(true);
    } else {
      const result = (submitter.name === "save-button") ? await sendChanges() : await deleteItem();
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

  const dateTimeChangeHandler = (e) => {
    setDateTime(e.target.value);
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
      onShow={() => { }}
    >
      <Modal.Header closeButton>
        <h3>Редагувати новину</h3>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate validated={formValidated} onSubmit={formOnSubmitHandler} id="change-item-form" >

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
            <Form.Label>Текст Новини:</Form.Label>
            <Form.Control
              required
              as="textarea"
              row={3}
              placeholder="Текст Новини"
              onChange={textChangeHandler}
              value={text}
              maxLength={500}
            />
            <Form.Text>Залишилось {500 - text.length}</Form.Text>
            <Form.Control.Feedback type="invalid">Обов'язкове поле!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Додати фото:</Form.Label>
            <Form.Control
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={inputFileChangeHandler}
              ref={fileInputRef}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Дата події:</Form.Label>
            <Form.Control
              required
              type="datetime-local"
              onChange={dateTimeChangeHandler}
              value={dateTime}
            />
            {showSentError ? sendErrorAlert : ''}
          </Form.Group>

          <Form.Group>
            <Button type="submit" name="save-button">Зберегти</Button>
          </Form.Group>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="change-item-form" name="delete-button" className="me-auto" variant="danger">Видалити новину</Button>
        <Button onClick={closeClickHandler}>Закрити</Button>
      </Modal.Footer>
    </Modal >
  )
}

export default NewsChangeModal
