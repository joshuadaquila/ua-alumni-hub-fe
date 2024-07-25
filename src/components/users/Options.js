import { faEye, faEyeSlash, faPenSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Options({ msgid, hidden, hideMessage, edit }) {
  return (
    <div className='absolute right-4 top-8 bg-white shadow-sm rounded-sm p-2 flex flex-col'>
      <div className='flex items-center hover:bg-slate-900 hover:text-white cursor-pointer p-1' onClick={edit}>
        <FontAwesomeIcon icon={faPenSquare} className='mr-2' />
        <p>Edit</p>
      </div>
      
      <div className='flex items-center hover:bg-slate-900 hover:text-white cursor-pointer p-1'>
        <FontAwesomeIcon icon={faTrashCan} className='mr-2' />
        <p>Delete</p>
      </div>

      <div className='flex items-center hover:bg-slate-900 hover:text-white cursor-pointer p-1' onClick={hideMessage}>
        {hidden ? <FontAwesomeIcon icon={faEye} className='mr-2' /> : <FontAwesomeIcon icon={faEyeSlash} className='mr-2' />}
        <p>{hidden ? "Show" : "Hide"}</p>
      </div>
    </div>
  );
}

export default Options;
