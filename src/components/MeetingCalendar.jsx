import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import MeetingModal from "./MeetingModal";
import useCalendar from "../hooks/useCalendar";
import EditEventModal from "./EditEventModal";

const localizer = momentLocalizer(moment);

const MeetingCalendar = () => {
  const { handleSelectEvent, handleSelectSlot, events } = useCalendar();
  const dayPropGetter = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      return {
        style: {
          cursor: "not-allowed",
        },
      };
    }
    return {};
  };

  const formattedEvents = events.map((event) => {
    const eventDate = new Date(event.date);
    const eventDateStr = eventDate.toISOString().split("T")[0];
    return {
      title: event.title,
      _id: event._id,
      startTime: event.startTime,
      endTime: event.endTime,
      date: eventDateStr,
      project: event.project,
      description: event.description,
      email: event.email,
      location: event.location,
      start: new Date(`${eventDateStr}T${event.startTime}:00`),
      end: new Date(`${eventDateStr}T${event.endTime}:00`),
    };
  });

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        defaultDate={new Date()}
        dayPropGetter={dayPropGetter}
        views={["month", "week", "day"]}
        defaultView="month"
        style={{ height: "100vh" }}
      />
      <EditEventModal />
      <MeetingModal />
    </div>
  );
};

export default MeetingCalendar;
