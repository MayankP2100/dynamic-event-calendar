"use client";

import "./App.css";
import EventCalendar from "@/components/event-calendar";
import AllEventsModal from "@/components/all-events-modal";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";

interface Event {
  date: Date;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
}

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), "yyyy-MM")
  );
  const [fileFormat, setFileFormat] = useState<string>("json");

  // Load events from local storage on initial render
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(
        JSON.parse(storedEvents).map((event: any) => ({
          ...event,
          date: new Date(event.date),
        }))
      );
    }
  }, []);

  // Save events to local storage whenever the events state changes
  useEffect(() => {
    if (events?.length) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  // Add a new event to the events state
  const addEvent = (newEvent: Event) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  // Update an existing event in the events state
  const updateEvent = (updatedEvent: Event) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.date === updatedEvent.date ? updatedEvent : event
      )
    );
  };

  // Delete an event from the events state
  const deleteEvent = (eventToDelete: Event) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event !== eventToDelete)
    );
  };

  // Export events to a file
  const exportEvents = () => {
    const [year, month] = selectedMonth.split("-");
    const filteredEvents = events.filter(
      (event) =>
        event.date.getFullYear() === parseInt(year) &&
        event.date.getMonth() === parseInt(month) - 1
    );

    if (fileFormat === "json") {
      const dataStr = JSON.stringify(filteredEvents, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `events-${selectedMonth}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } else if (fileFormat === "csv") {
      const csvRows = [
        ["Title", "Description", "Start Time", "End Time", "Date"],
        ...filteredEvents.map((event) => [
          event.title,
          event.description || "",
          event.startTime,
          event.endTime,
          format(event.date, "yyyy-MM-dd"),
        ]),
      ];
      const csvContent = csvRows.map((e) => e.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `events-${selectedMonth}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center w-screen py-2 min-h-svh">
        <h1 className="text-4xl lily-script-one-regular">
          Dynamic Event Calendar
        </h1>
        <div className="w-full flex flex-col items-center">
          <EventCalendar
            events={events}
            onAddEvent={addEvent}
            onUpdateEvent={updateEvent}
            onDeleteEvent={deleteEvent}
          />
          <AllEventsModal events={events} />
        </div>
        <div>
          <div className="mt-2 flex items-center">
            <div className="flex-col">
              <Label htmlFor="month">Select Month:</Label>
              <Input
                type="month"
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>
            <div className="flex-col">
              <Label htmlFor="format" className="mx-6">
                Select Format:
              </Label>
              <div>
                <select
                  id="format"
                  value={fileFormat}
                  onChange={(e) => setFileFormat(e.target.value)}
                  className="border px-3 py-1 rounded-md"
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </div>
          </div>
          <Button onClick={exportEvents} className="mt-2 bg-blue-500">
            Export Events
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
