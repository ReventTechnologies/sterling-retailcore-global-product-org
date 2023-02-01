import React, { useEffect, useState } from 'react'

import { ellipse } from '../../assets/svgs'

const sampleRoles = ['super admin', 'others']
const AssignedRoles = () => {
  const [roles, setRoles] = useState<string[]>([''])
  const [showAllRoles, setShowAllRoles] = useState<Boolean>(false)

  useEffect(() => {
    setRoles(sampleRoles)
  }, [])

  return (
    <div className='flex bg-background-yellow-muted text-text-lightYellow font-bold leading-5 text-base px-2 py-2 gap-2 flex-col relative rounded-lg border border-border-muted-yellow'>
      <div className='flex gap-2 items-center'>
        <div className='w-4 h-4 flex items-center justify-center'>
          <img src={ellipse} alt='' width={16} height={15} />
        </div>
        <div>ASSIGNED ROLE(s): </div>{' '}
        {!showAllRoles && (
          <div className='cursor-pointer' onClick={() => setShowAllRoles(true)}>
            {' '}
            {roles[0].toUpperCase()} ...
          </div>
        )}
      </div>
      {showAllRoles && (
        <ol
          onClick={() => setShowAllRoles(false)}
          className=' flex cursor-pointer bg-background-yellow-muted w-full flex-col mt-6 absolute left-0 top-8 px-4'
        >
          {roles?.map((role, index) => {
            return <li key={index}>{role.toUpperCase()}</li>
          })}
        </ol>
      )}
    </div>
  )
}

export default AssignedRoles
