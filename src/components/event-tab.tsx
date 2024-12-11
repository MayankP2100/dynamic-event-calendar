import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import EventForm from "./event-add";
import EventList from "./event-edit";

interface EventTabProps {
  title: string;
  setTitle: (title: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
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
  selectedDate: Date;
  selectedDateEvents: any[];
  handleDeleteEvent: (event: any) => void;
  startEditing: (event: any) => void;
}

const EventTab: React.FC<EventTabProps> = ({
  title,
  setTitle,
  activeTab,
  setActiveTab,
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
  selectedDate,
  selectedDateEvents,
  handleDeleteEvent,
  startEditing,
}) => (
  <Tabs
    value={activeTab}
    onValueChange={(val) => setActiveTab(val)}
    className="w-full"
  >
    <TabsList>
      <TabsTrigger value="add">
        {isEditing ? "Update selected event" : "Add new event"}
      </TabsTrigger>
      <TabsTrigger value="edit">Edit events</TabsTrigger>
    </TabsList>
    <TabsContent value="add">
      <p>
        {isEditing
          ? "Edit event"
          : `Add event for date: ${selectedDate?.toDateString()}`}
      </p>
      <EventForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        isFormValid={isFormValid}
        isEditing={isEditing}
        handleAddEvent={handleAddEvent}
        handleUpdateEvent={handleUpdateEvent}
      />
    </TabsContent>
    <TabsContent value="edit">
      <p>Edit events for date: {selectedDate?.toDateString()}</p>
      <EventList
        selectedDateEvents={selectedDateEvents}
        startEditing={startEditing}
        handleDeleteEvent={handleDeleteEvent}
      />
    </TabsContent>
  </Tabs>
);

export default EventTab;
