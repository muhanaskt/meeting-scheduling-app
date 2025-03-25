import { useAtom } from "jotai";
import {
  eventsAtom,
  showModalAtom,
  newEventAtom,
  selectedEventAtom,
  showEditModalAtom,
} from "../atoms/calendarAtoms";
// import { showLoginModalAtom } from "../atoms/authAtoms";
import { userAtom } from "../atoms/authAtoms";
import { useEffect } from "react";
import axios from "axios";

const useCalendar = () => {
  const [events, setEvents] = useAtom(eventsAtom);
  const [showModal, setShowModal] = useAtom(showModalAtom);
  const [newEvent, setNewEvent] = useAtom(newEventAtom);
  const [selectedEvent, setSelectedEvent] = useAtom(selectedEventAtom);
  const [showEditModal, setShowEditModal] = useAtom(showEditModalAtom);
  const [user] = useAtom(userAtom);
  // const [showLoginModal, setShowLoginModal] = useAtom(showLoginModalAtom);

  // Fetch events from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, [setEvents]);

  const handleSaveEvent = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:5000/api/events", newEvent)
      .then((res) => {
        setEvents([...events, res.data]);
        setShowModal(false);
      })
      .catch((err) => console.error("Error saving event:", err));
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  const handleSelectSlot = ({ start }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) return;

    const selectedDate = new Date(start);
    selectedDate.setHours(0, 0, 0, 0);

    setNewEvent({
      title: "",
      date: selectedDate,
      startTime: "",
      endTime: "",
    });

    setShowModal(true);
  };

  const handleSaveEditedEvent = async (updatedEvent) => {
    const { _id, ...eventData } = updatedEvent;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/events/${_id}`,
        eventData
      );

      // Update the local state
      setEvents(
        events.map((event) =>
          event._id === updatedEvent._id ? response.data : event
        )
      );
      setSelectedEvent(response.data);
      setShowEditModal(false);
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;

    axios
      .delete(`http://localhost:5000/api/events/${selectedEvent._id}`)
      .then(() => {
        setEvents(events.filter((event) => event._id !== selectedEvent._id));
        setSelectedEvent(null);
        setShowEditModal(false);
      })
      .catch((err) => console.error("Error deleting event:", err));
  };

  return {
    events,
    showModal,
    newEvent,
    selectedEvent,
    handleSaveEvent,
    handleSelectEvent,
    handleSelectSlot,
    setShowModal,
    setNewEvent,
    handleDeleteEvent,
    handleSaveEditedEvent,
  };
};

export default useCalendar;
