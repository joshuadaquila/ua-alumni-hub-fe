import { faEye, faEyeSlash, faFile, faPenSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Options({ msgid, hidden, hideMessage, edit, deleteEvent }) {
  return (
    <div className='absolute right-4 top-8 bg-white shadow-sm rounded-sm p-2 flex flex-col'>
      <div className='flex items-center hover:bg-slate-900 hover:text-white cursor-pointer p-1' onClick={edit}>
        <FontAwesomeIcon icon={faPenSquare} className='mr-2' />
        <p>Edit</p>
      </div>
      
      <div className='flex items-center hover:bg-slate-900 hover:text-white cursor-pointer p-1' onClick={() => deleteEvent(msgid)}>
        <FontAwesomeIcon icon={faTrashCan} className='mr-2' />
        <p>Delete</p>
      </div>

    </div>
  );
}

export default Options;
