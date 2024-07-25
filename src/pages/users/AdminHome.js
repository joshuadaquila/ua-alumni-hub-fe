import React from 'react'
import Sidebar from '../../components/users/Sidebar'

function AdminHome() {
  return (
    <div className='minbackground h-screen w-screen flex '>
      <div className='flex-1'>
          <Sidebar/>  
      </div>
      <div className='h-screen w-screen'>

      </div>
    </div>
  )
}

export default AdminHome