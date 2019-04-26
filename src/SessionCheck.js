import React, { useState, useEffect } from 'react'
import { silentAuth } from './auth'

export const SessionCheck = ({children}) => {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    silentAuth(handleCheckSession)
  }, []);
  
  const handleCheckSession = () => {
    setLoading(false)
  }

  return loading === false && <>{children}</>
}
