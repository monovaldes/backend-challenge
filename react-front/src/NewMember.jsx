import React, { useState } from "react";
import axios from 'axios'
import { useAuthHeader } from 'react-auth-kit'

export default function NewMember(props) {
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [url, setUrl] = useState(null);
  const authHeader = useAuthHeader();

  const createMember = () => {
    const data = { member: { first_name: firstname, last_name: lastname, url: url} };
    axios.post(`http://localhost:3000/members`, data , {
      headers: { Authorization: authHeader() },
    })
      .then((res)=>{
          if(res.status === 201){
            props.callback()
          }
      }).catch((e) => {
          console.error(e.message)
      })
  };

  return (
    <div className="p-3 bg-light border rounded-3">
      <h3>New Members</h3>
        <div className="mb-1">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" onChange={({target}) => setFirstname(target.value)} />
        </div>
        <div className="mb-1">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" onChange={({target}) => setLastname(target.value)}/>
        </div>
        <div className="mb-1">
          <label className="form-label">URL</label>
          <input type="text" className="form-control" onChange={({target}) => setUrl(target.value)}/>
        </div>
        
        <button className="btn btn-primary" onClick={createMember}>Add Member</button>
    </div>
  );
} 