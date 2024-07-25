import React from 'react'

function NotificationDot({ show }) {
  console.log("notificationdot; ", show);
  return (
    <div className={`${show? "flex" : "hidden"}`}>
      <div className={` bg-red-500 h-3 w-3 right-0 z-50 rounded-full absolute`}>
        <p className='hidden'>O</p>
      </div>
    </div>
  )
}

export default NotificationDot