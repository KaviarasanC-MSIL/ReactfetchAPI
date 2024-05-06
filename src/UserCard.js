import React from 'react'



export const UserCard = ({name,email}) => {
  return (
   <>
  <div className="user-card">
  <img src={`https://robohash.org/${name}.png?set=set1&size=150x150`} alt={name} />
<div>
    <h2>{name}</h2>
    <p>{email}</p>
</div>

  </div>
   </>
  )
}

