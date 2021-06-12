import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useAuthHeader } from 'react-auth-kit'
import { useParams } from 'react-router-dom';

export default function Member() {
  const [query, setQuery] = useState(null);
  const [member, setMember] = useState(null)
  const [results, setResults] = useState(null);
  const authHeader = useAuthHeader();
  let { id } = useParams();

  useEffect(() => {
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
              <tr>
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
  // <h3>member.first_namename, website URL, shortening, website headings, and links to their friends</h3>
  if(member === null) {return(null)}

  return (
    <>
      <h3>{member.first_name} {member.last_name}</h3>
      {member.url} ({member.url_slug})
      <h3>Author Query</h3>
      <div className="mb-1">
          <input type="text" className="form-control" onChange={({target}) => setQuery(target.value)} />
      </div>
      <button className="btn btn-primary" onClick={searchAuthor}>Search</button>
      {showResults()}
    </>
  );
} 