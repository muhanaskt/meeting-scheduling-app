import React, { useState } from "react";
import { useAtom } from "jotai";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { showModalAtom, newEventAtom } from "../atoms/calendarAtoms";
import useCalendar from "../hooks/useCalendar";

const MeetingModal = () => {
    const [showModal, setShowModal] = useAtom(showModalAtom);
    const [newEvent, setNewEvent] = useAtom(newEventAtom);
    const { handleSaveEvent, events } = useCalendar();
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setNewEvent((prev) => ({
            ...prev,
            [name]: value,  
        }));

        if (name === "startTime" || name === "endTime") {
            validateTime();
        }
    };

    const validateTime = () => {
        if (!newEvent.date || !newEvent.startTime || !newEvent.endTime) return;
    
        const selectedDateStr = new Date(newEvent.date).toISOString().split("T")[0];
    
        // Convert selected times to Date objects
        const selectedStart = new Date(`${selectedDateStr}T${newEvent.startTime}`);
        const selectedEnd = new Date(`${selectedDateStr}T${newEvent.endTime}`);
    
        if (selectedStart >= selectedEnd) {
            setError("End time must be after start time.");
            return;
        }
    
        const isConflict = events.some(event => {
            const eventDateStr = new Date(event.date).toISOString().split("T")[0];
    
            if (eventDateStr !== selectedDateStr || event.location !== newEvent.location) return false;
    
            const eventStart = new Date(`${eventDateStr}T${event.startTime}`);
            const eventEnd = new Date(`${eventDateStr}T${event.endTime}`);
    
            return (selectedStart < eventEnd && selectedEnd > eventStart); // Overlapping time check
        });
    
        if (isConflict) {
            setError("This time slot is already booked. Please select another time.");
        } else {
            setError("");
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (error) return;
        handleSaveEvent(e);
    };

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Schedule a Meeting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Meeting Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={newEvent.title || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            type="time"
                            name="startTime"
                            value={newEvent.startTime || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control
                            type="time"
                            name="endTime"
                            value={newEvent.endTime || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={newEvent.email || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Room</Form.Label>
                        <Form.Select
                            name="location"
                            value={newEvent.location || ""}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Choose a room</option>
                            <option value="Room 1">Room 1</option>
                            <option value="Room 2">Room 2</option>
                            <option value="Room 3">Room 3</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Project</Form.Label>
                        <Form.Select
                            name="project"
                            value={newEvent.project || ""}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Choose a project</option>
                            <option value="Project A">Project A</option>
                            <option value="Project B">Project B</option>
                            <option value="Project C">Project C</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={newEvent.description || ""}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default MeetingModal;
