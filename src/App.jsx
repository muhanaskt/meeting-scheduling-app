import { useState } from 'react'
import MeetingCalendar from './components/MeetingCalendar'
import AuthProvider from './AuthProvider'
import { Provider } from 'jotai'

 
 

function App() {
 

  return (
    <>
      <Provider>


      <AuthProvider>
     <MeetingCalendar />
     </AuthProvider>
      </Provider>
     </>
  )
}

export default App
