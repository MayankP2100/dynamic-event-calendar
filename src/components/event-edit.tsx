import { Button } from "./ui/button";

interface EventListProps {
  selectedDateEvents: any[];
  startEditing: (event: any) => void;
  handleDeleteEvent: (event: any) => void;
}

const EventList: React.FC<EventListProps> = ({
  selectedDateEvents,
  startEditing,
  handleDeleteEvent,
}) => (
  <div className="max-h-[50svh] overflow-y-auto">
    {selectedDateEvents.map((event, idx) => (
      <div
        key={idx}
        className="mb-2 p-2 border rounded-md flex justify-between items-center"
      >
        <div className="text-left">
          <strong>
            <p className="w-[20svw] overflow-auto">{event.title}</p>
          </strong>
          <p className="w-[20svw] overflow-auto">{event.description}</p>
          <p>
            {event.startTime} - {event.endTime}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => startEditing(event)}>Edit</Button>
          <Button
            variant="destructive"
            onClick={() => handleDeleteEvent(event)}
          >
            Delete
          </Button>
        </div>
      </div>
    ))}
  </div>
);

export default EventList;
