import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAuthContext } from '../hooks/useAuthContext'

const localizer = momentLocalizer(moment)

const MyCalendar = ({events}) => { 
  const { user } = useAuthContext()
  const mapToRBCFormat = e => Object.assign({}, e, {
    start: new Date(e.Date),
    end: new Date(e.Date), 
    name: events.name
})
 //if user has no value, return and skip the api response
    if (!user) {
      return
    }
  
  return(

        <div>
          <Calendar
            events={events && events.map(mapToRBCFormat)}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
)
}
export default MyCalendar