import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { formatDate } from '../../utilities/formatDate'
import AssignedRoles from './AssignedRoles'

import { threeFriends, questionMark, user } from '../../assets/svgs'
import NotificationIcon from './NotificationIcon'

const TopNav = () => {
  const [majorRole, setMajorRole] = useState<string>('Super Admin')

  return (
    <div className='flex justify-between items-center h-full px-8 pt-1'>
      <div className='text-base leading-5 text-text-secondary tracking-wide font-medium'>
        {formatDate(new Date(), 'LT').toLowerCase().replace(' ', '')} {formatDate(new Date(), 'llll').slice(0, 17)}
      </div>
      <div>
        <AssignedRoles />
      </div>
      <div className='flex gap-8'>
        <Link to={"AppLinks.myTeam"} className={`flex text-base leading-6 gap-2 items-center`}>
          <div className='w-8 h-8 flex items-center'>
            <img src={threeFriends} alt='My team' width={31} height={22} />
          </div>
          <div>My Team</div>
        </Link>
        <NotificationIcon />
        <Link to={"AppLinks.help"} className='flex text-base leading-6 gap-2 items-center'>
          <div className='w-8 h-8 flex items-center'>
            <img src={questionMark} alt='Help' width={27} height={28} />
          </div>
          <div>Help</div>
        </Link>
        <Link to={"AppLinks.profile"} className='flex text-base leading-6 gap-2 items-center'>
          <div className='w-8 h-8 flex items-center'>
            <img src={user} alt='Role' width={27} height={28} />
          </div>
          <div>{majorRole}</div>
        </Link>
      </div>
    </div>
  )
}

export default TopNav
