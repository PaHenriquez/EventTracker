import { useState } from "react"
import { useEventsContext } from "../hooks/useEventsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const EventForm = () => {
  const { dispatch } = useEventsContext()
  const { user } = useAuthContext()

  const [title, setEventTitle] = useState('')
  const [address, setAddress] = useState('')
  const [start, setStartDate] = useState('')
   const [end, setEndDate] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    //if user has no value, return and skip the api response
    if (!user) {
      setError('You must be logged in')
      return
    }

    const event = {title, address, start, end}

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
      setEventTitle('')
      setAddress('')
      setStartDate('')
      setEndDate('')
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
        onChange={(e) => setEventTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}

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
        type="datetime-local"
        onChange={(e) => setStartDate(e.target.value)}
        value={start}
        className={emptyFields.includes('start') ? 'error' : ''}
      />
      <input 
        type="datetime-local"
        onChange={(e) => setEndDate(e.target.value)}
        value={end}
        className={emptyFields.includes('end') ? 'error' : ''}
      />
      <button>Add Event</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default EventForm