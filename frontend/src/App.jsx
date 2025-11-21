import { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"

const API = import.meta.env.VITE_API_URL

function App() {
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
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const res = await axios.get(`${API}/api/entries`)
      setEntries(res.data.data || [])
    } catch (err) {
      console.error("Fetch error:", err)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitEntry = async () => {
    try {
      await axios.post(`${API}/api/entry`, form)
      setForm({
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
      fetchEntries()
    } catch (err) {
      console.error("Submit failed:", err)
    }
  }

  return (
    <div className="container">
      <h1>Symptom Logger XL</h1>

      <div className="form">
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <input placeholder="Symptoms" name="symptoms" value={form.symptoms} onChange={handleChange} />
        <input type="number" name="severity" value={form.severity} onChange={handleChange} min="0" max="10" />
        <input placeholder="Duration" name="duration" value={form.duration} onChange={handleChange} />
        <input placeholder="Trigger" name="trigger" value={form.trigger} onChange={handleChange} />
        <input placeholder="Daily impact" name="daily_impact" value={form.daily_impact} onChange={handleChange} />
        <input placeholder="Work impact" name="work_impact" value={form.work_impact} onChange={handleChange} />
        <input placeholder="Medications" name="medications" value={form.medications} onChange={handleChange} />
        <textarea placeholder="Notes" name="notes" value={form.notes} onChange={handleChange}></textarea>

        <button onClick={submitEntry}>Add Entry</button>
      </div>

      <h2>Logged Entries</h2>
      <div className="entries">
        {entries.map(e => (
          <div key={e.id} className="entry">
            <strong>{e.date}</strong>
            <p>{e.symptoms}</p>
            <small>Severity: {e.severity}</small>
            <p>{e.notes}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
