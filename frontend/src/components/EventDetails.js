import { useEventsContext } from '../hooks/useEventsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const EventDetails = ({ event }) => {
  const { dispatch } = useEventsContext()
  const { user } = useAuthContext()

  //when button is clicked, handleClick function is called
  const handleClick = async () => {

    //if user has no value, return and skip the api response
    if (!user) {
      return
    }

    const response = await fetch('/api/events/' + event._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_EVENT', payload: json})
    }
  }
  
// for start date
  //first convert from UTC to local time using Date()
  var formatted_date_start = new Date(event.start)
  if (formatted_date_start) {
    //used to display date and time separately
    //formatted_date_start has both date and time in its format
    var sliced_date_start = formatted_date_start.toLocaleDateString()
    var sliced_time_start = formatted_date_start.toLocaleTimeString()
  }

// for end date 
    //first convert from UTC to local time using Date()
  var formatted_date_end = new Date(event.end)
  if (formatted_date_end) {
    //used to display date and time separately
    //formatted_date_end has both date and time in its format
    var sliced_date_end = formatted_date_end.toLocaleDateString()
    var sliced_time_end = formatted_date_end.toLocaleTimeString()
    //console.log(sliced_date)
    //console.log(sliced_time)
  }
  return (
    <div className="event-details">
      <h4>{event.title}</h4>
      <p><strong>Start Date: </strong>{sliced_date_start}</p>
      <p><strong>Start Time: </strong>{sliced_time_start}</p>
      <p><strong>End Date: </strong>{sliced_date_end}</p>
      <p><strong>End Time: </strong>{sliced_time_end}</p>
      <p><strong>Address: </strong>{event.address}</p><br></br>
      <p align="right" >created {formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default EventDetails