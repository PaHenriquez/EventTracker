import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = ({events}) => { 
const localizer = momentLocalizer(moment)

console.log("My calandar event",events)

//converting string end and start time to obj aka "12/11/22" to Date("12/11/22")
const obj_events = events.map((event) => ({ "title": event.title, "start": new Date(event.start), "end":new Date(event.end) }));
  return(

        <div>
          <Calendar
            events= {obj_events}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            views={{ month: true, week: true, day: true, agenda: true}}
          />
        </div>
)   
}
export default MyCalendar