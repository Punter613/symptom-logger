import {useState,useEffect} from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function App(){
  const [entries,setEntries]=useState([]);

  useEffect(()=>{axios.get(`${API}/api/entries`).then(r=>setEntries(r.data));},[]);

  return (
    <div style={{color:"white",fontFamily:"sans-serif"}}>
      <h1>Symptom Logger XL</h1>
      {entries.map(e=>(
        <div key={e.id}>
          <b>{e.date}</b> - {e.symptoms} ({e.severity})
        </div>
      ))}
    </div>
  )
}
