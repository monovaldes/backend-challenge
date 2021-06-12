import React from "react";
import { useIsAuthenticated, useAuthHeader } from 'react-auth-kit'
import { Redirect } from "react-router-dom";

export default function Home() {
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();
  if(!isAuthenticated()) {
    return (<Redirect to="/login" />)
  }
  
  return (<span>{authHeader()}</span>);
} 