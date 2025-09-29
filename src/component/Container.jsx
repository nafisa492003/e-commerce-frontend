import React from 'react'

const Container = ({children}) => {
  return (
    <div className='px-3 mx-auto max-w-container lg:px-2'>{children}</div>
  )
}

export default Container