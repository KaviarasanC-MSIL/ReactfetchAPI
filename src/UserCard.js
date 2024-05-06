import React from 'react'



export const UserCard = ({name,email,image}) => {
  return (
   <>
  <div className="user-card">
<img src={image} alt="./logo.svg" />
<div>
    <h2>{name}</h2>
    <p>{email}</p>
</div>

  </div>
   </>
  )
}

