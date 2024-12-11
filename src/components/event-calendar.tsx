import { useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subMonths,
} from "date-fns";
import { useMemo } from "react";
import { Button } from "./ui/button";
import { EventDialog } from "./event-dialog";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Event {
  date: Date;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
}

interface EventCalendarProps {
  events: Event[];
  onAddEvent: (newEvent: Event) => void;
  onUpdateEvent: (updatedEvent: Event) => void;
  onDeleteEvent: (eventToDelete: Event) => void;
}

const EventCalendar = ({
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
}: EventCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState("add");

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  // Get all the days in the current month
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  // Get the index of the first day of the month (0-6)
  const startingDayIndex = getDay(firstDayOfMonth);

  // Memoize the events by date to avoid recalculating on every render
  const eventsByDate = useMemo(() => {
    return events.reduce((acc: { [key: string]: Event[] }, event) => {
      const dateKey = format(event.date, "yyyy-MM-dd");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [events]);

  const getNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const getPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  // Check if the new event has a time conflict with an existing event
  const hasTimeConflict = (
    newStartTime: string,
    newEndTime: string,
    excludeEvent?: Event
  ): boolean => {
    if (!selectedDate) return false;
    const selectedDateEvents =
      eventsByDate[format(selectedDate, "yyyy-MM-dd")] || [];
    return selectedDateEvents.some((event) => {
      if (excludeEvent && event === excludeEvent) return false;
      const startA = new Date(`1970-01-01T${newStartTime}:00`);
      const endA = new Date(`1970-01-01T${newEndTime}:00`);
      const startB = new Date(`1970-01-01T${event.startTime}:00`);
      const endB = new Date(`1970-01-01T${event.endTime}:00`);
      return startA < endB && startB < endA;
    });
  };

  const handleAddEvent = () => {
    if (selectedDate && !hasTimeConflict(startTime, endTime)) {
      const newEvent: Event = {
        date: selectedDate,
        title,
        description,
        startTime,
        endTime,
      };
      onAddEvent(newEvent);
      resetForm();
    } else {
      alert("Event times conflict with an existing event.");
    }
  };

  const handleUpdateEvent = () => {
    if (
      eventToEdit &&
      selectedDate &&
      !hasTimeConflict(startTime, endTime, eventToEdit)
    ) {
      const updatedEvent: Event = {
        ...eventToEdit,
        title,
        description,
        startTime,
        endTime,
      };
      onUpdateEvent(updatedEvent);
      resetForm();
    } else {
      alert("Event times conflict with an existing event.");
    }
  };

  const handleDeleteEvent = (event: Event) => {
    onDeleteEvent(event);
    resetForm();
  };

  // Populate the form fields with the selected event's data
  const startEditing = (event: Event) => {
    setTitle(event.title);
    setDescription(event.description || "");
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setIsEditing(true);
    setEventToEdit(event);
    setActiveTab("add");
  };

  // Reset the form fields and state
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStartTime("");
    setEndTime("");
    setIsEditing(false);
    setEventToEdit(null);
  };

  // Filter the events for the selected date
  const selectedDateEvents = selectedDate
    ? eventsByDate[format(selectedDate, "yyyy-MM-dd")] || []
    : [];

  const isFormValid = title && startTime && endTime;

  return (
    <div className="container p-4">
      <div className="mb-4 flex justify-between items-center">
        <Button onClick={getPreviousMonth}>Previous</Button>
        <h2 className="text-center">{format(currentDate, "MMMM yyyy")}</h2>
        <Button onClick={getNextMonth}>Next</Button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {WEEKDAYS.map((day) => (
          <div key={day} className="lily-script-one-regular text-center">
            {day}
          </div>
        ))}
        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="border rounded-md p-2 text-center"
          />
        ))}
        {daysInMonth.map((day, index) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const todaysEvents = eventsByDate[dateKey] || [];
          return (
            <EventDialog
              index={index}
              resetForm={resetForm}
              day={day}
              setSelectedDate={setSelectedDate}
              todaysEvents={todaysEvents}
              title={title}
              setTitle={setTitle}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              description={description}
              setDescription={setDescription}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              isFormValid={isFormValid}
              isEditing={isEditing}
              handleAddEvent={handleAddEvent}
              selectedDate={selectedDate}
              selectedDateEvents={selectedDateEvents}
              handleDeleteEvent={handleDeleteEvent}
              startEditing={startEditing}
              handleUpdateEvent={handleUpdateEvent}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
