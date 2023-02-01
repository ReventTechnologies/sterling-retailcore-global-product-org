import React from 'react'
import { Link } from 'react-router-dom'
import { bell } from '../../assets/svgs'

const NotificationIcon = () => {
  return (
    <Link to={"/AppLinks.notifications"} className='flex text-base leading-6 gap-2 items-center'>
      <div className='w-8 h-8 flex items-center'>
        <img src={bell} alt='notifications' width={25} height={28} />
        {/* <span>9+</span> */}
      </div>
      <span>Notifications</span>
    </Link>
  )
}

export default NotificationIcon
