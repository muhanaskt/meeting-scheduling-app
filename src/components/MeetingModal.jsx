import React from "react";
import { useAtom } from "jotai";
import { Modal, Button, Form } from "react-bootstrap";
import { showModalAtom, newEventAtom } from "../atoms/calendarAtoms";
import useCalendar from "../hooks/useCalendar";
 
const MeetingModal = () => { 
    const [showModal, setShowModal] = useAtom(showModalAtom);
    const [newEvent, setNewEvent] = useAtom(newEventAtom);
    const { handleSaveEvent } = useCalendar();
 

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setNewEvent((prev) => ({
            ...prev,
            [name]: value,  
        }));
    };

 
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Schedule a Meeting</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSaveEvent}>
                    {/* Title */}
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

                    {/* Start Time */}
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

                    {/* End Time */}
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

                    {/* Select Project */}
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
                      {/* Description */}
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
                    {/* Buttons */}
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
