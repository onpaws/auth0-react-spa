import React from 'react'
import { parseHashFromAuth0 } from './auth'

const Callback = () => {
  parseHashFromAuth0()

  return <p>Loading...</p>
}

export default Callback