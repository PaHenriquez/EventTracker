import { useEffect }from 'react'
import { useEventsContext } from "../hooks/useEventsContext"
import { useAuthContext } from "../hooks/useAuthContext"


// components
import EventDetails from '../components/EventDetails'
import EventForm from '../components/EventForm'
import MyCalendar from '../components/MyCalendar'

const Home = () => {
  const {events, dispatch} = useEventsContext()
  const {user} = useAuthContext()

  const backup_events = [
    {
        title: "Back up events",
        start: new Date(2022, 12, 12),
        end: new Date(2022, 12, 12),
    },
  
];

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_EVENTS', payload: json})
      }
    }

    //only if user has a value, we will call the function
    if (user) {
      fetchEvents()
    }

  }, [dispatch, user])

  return (

    <>
      
    <div className="home">
      <div className="events">
     
        {events && events.map((event) => (
          <EventDetails key={event._id} event={event} />
        ))}
        {events != null ? (
          <MyCalendar  events= {events} />
        ):
        (
          <MyCalendar  events= {backup_events} />
        )}
          
      </div>
      
      <EventForm />
    </div>
    </>
  )
}

export default Home