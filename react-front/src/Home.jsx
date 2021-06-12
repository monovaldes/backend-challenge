import React, { useEffect, useState } from "react";
import { useIsAuthenticated, useAuthHeader } from 'react-auth-kit'
import { Redirect } from "react-router-dom";
import axios from 'axios'
import NewMember from './NewMember.jsx'

export default function Home() {
  const [members, setMembers] = useState([]);
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();

  const updateMembers = () => {
    axios.get(`http://localhost:3000/members`, {headers: { 'Authorization': authHeader()}})
    .then((res)=>{
        if(res.status === 200){
          setMembers(res.data)
        }
    }).catch((e) => {
        console.error(e.message)
    })
  }
  
  useEffect(() => {
    updateMembers();
  }, [])

  if(!isAuthenticated()) {
    return (<Redirect to="/login" />)
  }

  const memberList = (
    <table className="table table-sm table-striped table-bordered">
      <thead>
        <tr><th>Name</th><th>Url</th><th>Total Friends</th></tr>
      </thead>
      <tbody>
        {members.map(m => (
          <tr key={m.id}>
            <td>{m.first_name} {m.last_name}</td>
            <td>{m.url_slug}</td>
            <td>{m.friend_count}</td>
          </tr>))}
      </tbody>
    </table>
  );
  
  return (
    <div className="container py-3">
      <div className="row justify-content-md-center">
        <div className="col col-md-8">
          <h3>Member List</h3>
          {memberList}
          <NewMember
            callback={updateMembers}
          />
        </div>
      </div>
    </div>
    
  );
}