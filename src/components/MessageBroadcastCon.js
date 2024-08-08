import React from 'react';

function MessageBroadcastCon({ id, username, usertype, date, content, accessing, edit, photo }) {
  const isAdmin = username === "Administrator";

  return (
    <div className={`flex ${isAdmin ? 'flex-row-reverse' : 'flex-row'} items-start mb-4 w-full`}>
      {/* Profile Image */}
      <img 
        src={photo} 
        className={`rounded-full w-12 h-12 ${isAdmin ? 'ml-2' : 'mr-2'}`} 
        alt='Profile' 
      />
      
      {/* Message Content */}
      <div className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'} ${isAdmin ? 'mr-2' : 'ml-2'}`}>
        {/* Username and Date */}
        <div className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}>
          <p className='font-bold'>{username}</p>
          <p className='text-xs opacity-80'>{date}</p>
        </div>
        
        {/* Message Bubble */}
        <div className='relative mt-1'>
          <div className={`bg-blue-200 p-3 rounded-lg max-w-xs w-max ${isAdmin ? 'text-right' : 'text-left'}`}>
            <p className='text-sm'>{content}</p>
          </div>
          <div 
            className={`absolute bottom-0 ${isAdmin ? 'right-0' : 'left-0'} w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-blue-200`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default MessageBroadcastCon;
