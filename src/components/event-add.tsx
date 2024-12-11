import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface EventFormProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  startTime: string;
  setStartTime: (startTime: string) => void;
  endTime: string;
  setEndTime: (endTime: string) => void;
  isFormValid: string;
  isEditing: boolean;
  handleAddEvent: () => void;
  handleUpdateEvent: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  isFormValid,
  isEditing,
  handleAddEvent,
  handleUpdateEvent,
}) => (
  <div className="my-2 flex flex-col justify-center items-start">
    <Label className="my-2 mt-4">Event Name</Label>
    <Input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Complete Homework"
    />
    <Label className="my-2 mt-4">Event Description (Optional)</Label>
    <Input
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Math homework needs to be done within 3 hours"
    />
    <Label className="my-2 mt-4">Event Start Time (24-hours)</Label>
    <Input
      value={startTime}
      onChange={(e) => setStartTime(e.target.value)}
      type="time"
    />
    <Label className="my-2 mt-4">Event End Time (24-hours)</Label>
    <Input
      value={endTime}
      onChange={(e) => setEndTime(e.target.value)}
      type="time"
    />
    <Button
      className="mt-4 self-center"
      onClick={isEditing ? () => handleUpdateEvent() : handleAddEvent}
      disabled={!isFormValid}
    >
      {isEditing ? "Update Event" : "Add Event"}
    </Button>
  </div>
);

export default EventForm;
