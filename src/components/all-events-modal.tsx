import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface Event {
  date: Date;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
}

interface AllEventsModalProps {
  events: Event[];
}

const AllEventsModal: React.FC<AllEventsModalProps> = ({ events }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter events based on the search query
  const filteredEvents = events.filter((event) => {
    const query = searchQuery.toLowerCase();
    const dateStr = format(event.date, "yyyy-MM-dd").toLowerCase();
    return (
      event.title.toLowerCase().includes(query) ||
      (event.description && event.description.toLowerCase().includes(query)) ||
      event.startTime.includes(query) ||
      event.endTime.includes(query) ||
      dateStr.includes(query)
    );
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>See All Events</Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-2xl mb-2">All Events</h2>
        <Input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-2"
        />
        <div className="max-w-[90svw] px-2">
          {filteredEvents.map((event, idx) => (
            <div key={idx} className="mb-2 p-2 overflow-auto border rounded-md">
              <strong>{event.title}</strong>
              <p>{event.description}</p>
              <p>
                {event.startTime} - {event.endTime} on{" "}
                {event.date.toDateString()}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllEventsModal;
