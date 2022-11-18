import { useState } from "react"
import { useEventsContext } from "../hooks/useEventsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const EventForm = () => {
  const { dispatch } = useEventsContext()
  const { user } = useAuthContext()

  const [event_name, setEvent] = useState('')
  const [address, setAddress] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    //if user has no value, return and skip the api response
    if (!user) {
      setError('You must be logged in')
      return
    }

    const event = {event_name, address, date}

    const response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEvent('')
      setAddress('')
      setDate('')
      setError(null)
      setEmptyFields([])
      console.log('new event added', json)
      dispatch({type: 'CREATE_EVENT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Event</h3>

      <label>Event Name:</label>
      <input 
        type="text"
        onChange={(e) => setEvent(e.target.value)}
        value={event_name}
        className={emptyFields.includes('event_name') ? 'error' : ''}
      />

      <label>Address:</label>
      <input 
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        className={emptyFields.includes('address') ? 'error' : ''}
      />

      <label>Event Date:</label>
      <input 
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        className={emptyFields.includes('date') ? 'error' : ''}
      />

      <button>Add Event</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default EventForm