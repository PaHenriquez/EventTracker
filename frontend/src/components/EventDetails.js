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

  return (
    <div className="event-details">
      <h4>{event.event_name}</h4>
      <p><strong>Date: </strong>{event.date}</p>
      <p><strong>Address: </strong>{event.address}</p>
      <p>{formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default EventDetails