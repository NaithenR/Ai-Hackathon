import { useState } from 'react'

// We receive all the data and functions from App.jsx through props
function Sidebar({ medications, setMedications, allergies, setAllergies, profile, setProfile, onAnalyze, loading }) {

  // Local state just for the input fields
  const [medInput, setMedInput] = useState('')
  const [allergyInput, setAllergyInput] = useState('')

  // Add medication to the list
  const addMedication = () => {
    if (!medInput.trim()) return
    if (medications.includes(medInput.trim())) return
    setMedications([...medications, medInput.trim()])
    setMedInput('')
  }

  // Add allergy to the list
  const addAllergy = () => {
    if (!allergyInput.trim()) return
    if (allergies.includes(allergyInput.trim())) return
    setAllergies([...allergies, allergyInput.trim()])
    setAllergyInput('')
  }

  // Remove medication by index
  const removeMed = (index) => {
    setMedications(medications.filter((_, i) => i !== index))
  }

  // Remove allergy by index
  const removeAllergy = (index) => {
    setAllergies(allergies.filter((_, i) => i !== index))
  }

  return (
    <aside className="w-80 bg-white border-r border-gray-200 p-6 flex flex-col gap-6 min-h-screen">

      {/* Medications */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Medications
        </p>

        {/* Input row */}
        <div className="flex gap-2">
          <input
            type="text"
            value={medInput}
            onChange={(e) => setMedInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addMedication()}
            placeholder="e.g. Warfarin..."
            className="flex-1 border border-gray-200 rounded-lg px-3 h-10 text-sm focus:outline-none focus:border-green-500"
          />
          <button
            onClick={addMedication}
            className="w-10 h-10 bg-green-600 text-white rounded-lg text-xl hover:bg-green-700"
          >
            +
          </button>
        </div>

        {/* Medication tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {medications.map((med, index) => (
            <span key={index} className="flex items-center gap-1 bg-green-50 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
              {med}
              <button onClick={() => removeMed(index)} className="text-green-600 hover:text-green-900 ml-1">
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* divider */}
      <div className="border-t border-gray-100" />

      {/* patient profile */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Patient Profile <span className="normal-case font-normal text-gray-300">(optional)</span>
        </p>

        <div className="grid grid-cols-2 gap-2">
          {/* Age input */}
          <input
            type="number"
            value={profile.age}
            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
            placeholder="Age"
            className="border border-gray-200 rounded-lg px-3 h-10 text-sm focus:outline-none focus:border-green-500"
          />

          {/* Sex dropdown */}
          <select
            value={profile.sex}
            onChange={(e) => setProfile({ ...profile, sex: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 h-10 text-sm focus:outline-none focus:border-green-500 text-gray-600"
          >
            <option value="">Biological sex</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* divider */}
      <div className="border-t border-gray-100" />

      {/* allergies */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Known Allergies <span className="normal-case font-normal text-gray-300">(optional)</span>
        </p>

        {/* Input row */}
        <div className="flex gap-2">
          <input
            type="text"
            value={allergyInput}
            onChange={(e) => setAllergyInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addAllergy()}
            placeholder="e.g. Penicillin..."
            className="flex-1 border border-gray-200 rounded-lg px-3 h-10 text-sm focus:outline-none focus:border-yellow-500"
          />
          <button
            onClick={addAllergy}
            className="w-10 h-10 bg-yellow-500 text-white rounded-lg text-xl hover:bg-yellow-600"
          >
            +
          </button>
        </div>

        {/* Allergy tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {allergies.map((allergy, index) => (
            <span key={index} className="flex items-center gap-1 bg-yellow-50 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
              {allergy}
              <button onClick={() => removeAllergy(index)} className="text-yellow-600 hover:text-yellow-900 ml-1">
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* divider */}
      <div className="border-t border-gray-100" />

      {/* analyze button */}
      <button
        onClick={onAnalyze}
        disabled={medications.length === 0 || loading}
        className="w-full h-11 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Analyzing...' : 'Analyze Medications'}
      </button>

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Not a substitute for professional medical advice.
      </p>

    </aside>
  )
}

export default Sidebar