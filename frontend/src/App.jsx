import { useState } from 'react'

import Header from './components/header'
import Sidebar from './components/sidebar'
import ResultsPanel from './components/resultsPanel'


function App() {

  const [medications, setMedications] = useState([])
  const [allergies, setAllergies] = useState([])
  const [profile, setProfile] = useState({ age: '', sex: '' })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

//Function to analyze the data and get results from the backend 
  const analyze = async () => {
    setLoading(true)
    setResults(null)

    try {
      const response = await fetch('http://localhost:3000/interactions/check', {
        method: 'POST',
       headers: {
          'Content-Type': 'application/json',
       },
       body: JSON.stringify({ medications, allergies, profile }),
      })
      const data = await response.json()
      setResults(data)
      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }
  
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Header />

      {/* This div holds the sidebar and results panel side by side */}
      <div className="flex flex-1 overflow-hidden">

        {/*Sidebar is the left side panel where the user inputs*/}
        <Sidebar
          medications={medications}
          setMedications={setMedications}
          allergies={allergies}
          setAllergies={setAllergies}
          profile={profile}
          setProfile={setProfile}
          onAnalyze={analyze}
          loading={loading}
        />

        {/* ResultsPanel is the right panel where analysis results appear */}
        <ResultsPanel
          results={results}
          loading={loading}
          medications={medications}
        />

      </div>
    </div>
  )
}

export default App
