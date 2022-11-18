import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': 
            return { user: action.payload}
        case 'LOGOUT':
            return { user: null }
        default: 
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    //to keep global auth state in sync with user data from localstorage
    useEffect(() => {
        //need json.parse and turn data into an js object since localstorage holds json strings
        const user = JSON.parse(localStorage.getItem('user'))
        
        //if user already exists, update global state to match the user in localstorage 
        if (user) {
          dispatch({ type: 'LOGIN', payload: user }) 
        }
    }, [])

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value = {{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}