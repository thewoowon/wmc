import React from 'react'

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="py-36">{children}</div>
}

export default Wrapper
