import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = ({events}) => { 
const localizer = momentLocalizer(moment)


// const events = [
//     {
//         title: "Big Meeting",
//         allDay: true,
//         start: new Date(2022, 12, 0),
//         end: new Date(2022, 12, 0),
//     },
//     {
//         title: "Vacation",
//         start: new Date(2022, 12, 7),
//         end: new Date(2022, 12, 10),
//     },
//     {
//         title: "Conference",
//         start: new Date(2021, 12, 20),
//         end: new Date(2021, 12, 23),
//     }
// ];

console.log(events)
  return(

        <div>
          <Calendar
            // events={events}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
)
}
export default MyCalendar