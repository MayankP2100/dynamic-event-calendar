import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EventTab from "./event-tab";
import { format, isToday, isWeekend } from "date-fns";
import clsx from "clsx";

interface EventDialogProps {
  index: number;
  resetForm: () => void;
  day: Date;
  setSelectedDate: (date: Date) => void;
  todaysEvents: any[];
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
  selectedDate: Date | null;
  selectedDateEvents: any[];
  handleDeleteEvent: (event: any) => void;
  startEditing: (event: any) => void;
  handleUpdateEvent: () => void;
}

export function EventDialog({
  index,
  resetForm,
  day,
  setSelectedDate,
  todaysEvents,
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
  selectedDate,
  selectedDateEvents,
  handleDeleteEvent,
  startEditing,
  handleUpdateEvent,
}: EventDialogProps) {
  return (
    <Dialog
      key={index}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => setSelectedDate(day)}
          variant="outline"
          className={clsx(
            "border rounded-md p-2 w-full h-20 flex flex-col justify-between lily-script-one-regular text-lg",
            {
              "bg-blue-300": isWeekend(day),
              "bg-gray-200": isToday(day),
              "text-gray-900": isToday(day),
            }
          )}
        >
          {format(day, "d")}
          <div className="flex">
            {todaysEvents.map((event) => (
              <div
                key={event.title}
                className="bg-green-500 mx-[1px] rounded-md p-1 border border-gray-900"
              ></div>
            ))}
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full border">
        <EventTab
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
          selectedDate={selectedDate!}
          selectedDateEvents={selectedDateEvents}
          handleDeleteEvent={handleDeleteEvent}
          startEditing={startEditing}
          handleUpdateEvent={handleUpdateEvent}
        />
      </DialogContent>
    </Dialog>
  );
}
