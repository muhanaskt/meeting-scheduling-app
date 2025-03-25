import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAtom } from "jotai";
import { showEditModalAtom, selectedEventAtom } from "../atoms/calendarAtoms";
import useCalendar from "../hooks/useCalendar";
import { eventsAtom } from "../atoms/calendarAtoms";

const EditEventModal = () => {
  const [showEditModal, setShowEditModal] = useAtom(showEditModalAtom);
  const [selectedEvent] = useAtom(selectedEventAtom);
  const [events, setEvents] = useAtom(eventsAtom);

  const { handleDeleteEvent, handleSaveEditedEvent } = useCalendar();

  const [isEditing, setIsEditing] = useState(false); 
  const [editedEvent, setEditedEvent] = useState(selectedEvent || {});
  
    useEffect(() => {
      if (selectedEvent) {
        setEditedEvent(selectedEvent);
      }
    }, [selectedEvent]);
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = () => { 
    handleSaveEditedEvent(editedEvent);
    setIsEditing(false);
  };


  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={editedEvent?.title}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="date">Scheduled Start Date*</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={editedEvent?.date}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label htmlFor="startTime">Start Time*</label>
            <input
              type="time"
              className="form-control"
              id="startTime"
              name="startTime"
              value={editedEvent?.startTime}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="endTime">End Time*</label>
            <input
              type="time"
              className="form-control"
              id="endTime"
              name="endTime"
              value={editedEvent?.endTime}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={ editedEvent?.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          </div>
            <div>
              <label htmlFor="project">Project</label>
              <input
                type=""
                className="form-control"
                id="color"
                name="color"
                value={editedEvent?.project}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          <div>
            <label htmlFor="description">Description*</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={editedEvent?.description}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={editedEvent?.location}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancel
        </Button>

        {isEditing ? (
          <Button variant="success" onClick={handleSubmit}>
            Save Changes
          </Button>
        ) : (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
        <Button
          variant="danger"
          onClick={() => handleDeleteEvent(selectedEvent._id)}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEventModal;
