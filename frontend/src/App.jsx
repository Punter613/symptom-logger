import { useEffect, useState } from "react"
import axios from "axios"

const API = import.meta.env.VITE_API_URL

export default function App() {
  const [entries, setEntries] = useState([])
  const [form, setForm] = useState({
    date: "",
    symptoms: "",
    severity: 0,
    duration: "",
    trigger: "",
    daily_impact: "",
    work_impact: "",
    medications: "",
    notes: ""
  })

  useEffect(() => {
    loadEntries()
  }, [])

  const loadEntries = async () => {
    try {
      const res = await axios.get(`${API}/api/entries`)
      setEntries(res.data.data || [])
    } catch (err) {
      console.error("Load failed:", err)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitEntry = async () => {
    try {
      await axios.post(`${API}/api/entry`, form)
      loadEntries()
    } catch (err) {
      console.error("Submit failed:", err)
    }
  }

  return (
    <div className="container">
      <h1>Symptom Logger XL</h1>

      <div className="form">
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <input name="symptoms" placeholder="Symptoms" onChange={handleChange} />
        <input type="number" name="severity" min="0" max="10" onChange={handleChange} />
        <input name="duration" placeholder="Duration" onChange={handleChange} />
        <input name="trigger" placeholder="Trigger" onChange={handleChange} />
        <input name="daily_impact" placeholder="Daily impact" onChange={handleChange} />
        <input name="work_impact" placeholder="Work impact" onChange={handleChange} />
        <input name="medications" placeholder="Medications" onChange={handleChange} />
        <textarea name="notes" placeholder="Notes" onChange={handleChange}></textarea>
        <button onClick={submitEntry}>Add Entry</button>
      </div>

      <h2>Previous Entries</h2>
      {entries.map(entry => (
        <div key={entry.id} className="entry">
          <strong>{entry.date}</strong>
          <p>{entry.symptoms}</p>
          <small>Severity: {entry.severity}</small>
        </div>
      ))}
    </div>
  )
}
