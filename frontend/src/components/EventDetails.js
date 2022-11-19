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

  //first convert from UTC to local time using Date()
  var formatted_date = new Date(event.date)
  if (formatted_date) {
    //used to display date and time separately
    //formatted_date has both date and time in its format
    var sliced_date = formatted_date.toLocaleDateString()
    var sliced_time = formatted_date.toLocaleTimeString()
    //console.log(sliced_date)
    //console.log(sliced_time)
  }

  return (
    <div className="event-details">
      <h4>{event.event_name}</h4>
      <p><strong>Date: </strong>{sliced_date}</p>
      <p><strong>Time: </strong>{sliced_time}</p>
      <p><strong>Address: </strong>{event.address}</p><br></br>
      <p align="right" >created {formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default EventDetails