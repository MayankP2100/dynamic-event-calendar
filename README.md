# Summary of the features
## Calendar Navigation
- **"Previous"** and **"Next"** buttons to navigate the calendar by months.
- Click on a day to manage events
  * **"Add new event"** tab allows users to add new events by specifying the event name, date, and description.
  * **"Edit event"** tab allows users to modify and delete existing events.

## Event Management
- Users can view a list of all events for a selected day by clicking on **"See All Events"** button.
<!-- - Events are color-coded based on their type (e.g., meeting, birthday, holiday). -->
- Users can search for events by name or date.

## Exporting Events
- Users can export events to a JSON or CSV file format.
- The exported JSON or CSV file includes formatted data for event name, date and description.
- Users can export events for a specific month from the calendar input.

## Event Indicators
- Green dots are displayed on calendar dates to indicate the number of events assigned to that date.
  * One green dot represents one event.
  * Multiple green dots represent multiple events.
- This visual indicator helps users quickly identify dates with scheduled events.
- Users can click on these dates to view detailed information about the events.

## Event Time Collision
- The system checks for time collisions when adding or editing events.
- If a time collision is detected, users are prompted with a warning message.
- This feature ensures that no two events overlap in time, helping users manage their schedules more effectively.

## Responsiveness
- The calendar is fully responsive and adapts to various screen sizes.
- On smaller screens, the calendar layout adjusts to ensure usability and readability.
- Buttons and interactive elements are optimized for touch devices.
- The design ensures that users have a consistent experience across desktops, tablets, and smartphones.

# Instructions to Run the App Locally

1. **Clone the repository:**
  ```sh
  git clone https://github.com/MayankP2100/dynamic-event-calendar.git
  cd dynamic-event-calendar
  ```

2. **Install dependencies:**
  ```sh
  npm install
  ```

3. **Start the development server:**
  ```sh
  npm run dev
  ```

4. **Open your browser and navigate to:**
  ```
  http://localhost:8000
  ```

5. **Build the app for production:**
  ```sh
  npm run build
  ```

6. **Preview the app:**
  ```sh
  npm run preview
  ```

These steps will help you set up, run, and preview the dynamic event calendar application on your local machine.

# Access the Deployed App

You can access the deployed version of the dynamic event calendar application at the following link:

[Dynamic Event Calendar](https://dynamic-event-calendar-o48q.vercel.app/)