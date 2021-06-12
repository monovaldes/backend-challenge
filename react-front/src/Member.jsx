import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useAuthHeader } from 'react-auth-kit'
import { useParams } from 'react-router-dom';

export default function Member() {
  const [query, setQuery] = useState(null);
  const [member, setMember] = useState(null)
  const [results, setResults] = useState(null);
  const [friend, setFriend] = useState(null);
  const authHeader = useAuthHeader();
  let { id } = useParams();

  const updateMember = () => {
    axios.get(`http://localhost:3000/members/${id}`, {
      headers: { Authorization: authHeader() },
    })
      .then((res)=>{
          if(res.status === 200){
            setMember(res.data);
          }
      }).catch((e) => {
          console.error(e.message)
      })
  }

  useEffect(() => {
    updateMember()
  }, [])

  const showResults = () => {
    if(results === null || results === []) return (<span>No results found</span>);
    return(
      <table>
        <thead>
          <tr>
            <td>Header</td>
            <td>Route</td>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => {
            return(
              <tr key={r.header.id}>
                <td>{r.header.header}</td>
                <td>{r.route.map(friend => friend.first_name).join(' => ')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
    
  }

  const searchAuthor = () => {
    axios.get(`http://localhost:3000/members/${id}/search?query=${query}`, {
      headers: { Authorization: authHeader() },
    })
      .then((res)=>{
          if(res.status === 200){
            setResults(res.data);
          }
      }).catch((e) => {
          console.error(e.message)
      })
  };

  const addFriend = () => {
    if(friend === null) {return}

    axios.post(`http://localhost:3000/friendships`, {friendship: {member_id: id, friend_id: friend}},{
      headers: { Authorization: authHeader() },
    })
      .then((res)=>{
          if(res.status === 201){
            updateMember();
          }
      }).catch((e) => {
          console.error(e.message)
      })
  };

  const showFriends = () => {
    const fs = member.friends.map((f) => `${f.first_name} ${f.last_name}`)
    return(
      <>
        <h3>Friends</h3>
        <table>
          <tbody>
            {fs.map((f) => (<tr><td>{f}</td></tr>))}
          </tbody>
        </table>
        <select name="friend_adder" onChange={({target}) => setFriend(target.value)}>
          {member.non_friends.map((nf) => (<option key={nf.id} value={nf.id}>{nf.first_name}{nf.last_name}</option>))}
        </select>
        <button className="btn btn-sm btn-secondary" onClick={addFriend}>Add as Friend</button>
      </>
    )
  }

  if(member === null) {return(null)}

  return (
    <>
      <h3>{member.first_name} {member.last_name}</h3>
      {member.url} ({member.url_slug})

      {showFriends()}

      <h3>Author Query</h3>
      <div className="mb-1">
          <input type="text" className="form-control" onChange={({target}) => setQuery(target.value)} />
      </div>
      <button className="btn btn-primary" onClick={searchAuthor}>Search</button>
      {showResults()}
    </>
  );
} 