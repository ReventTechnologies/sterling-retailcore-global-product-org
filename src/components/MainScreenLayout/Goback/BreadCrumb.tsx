import { greaterThan } from 'Assets/svgs'
import React from 'react'
import { Link } from 'react-router-dom'
import { BreadCrumbsListItemType } from '../GoBack'

interface BreadCrumbProps extends BreadCrumbsListItemType {
  isLastItem: boolean
}

const BreadCrumb = ({ isLastItem, link, text }: BreadCrumbProps) => {
  return (
    <div className='flex gap-3 items-center '>
      {/* <Link to={link} className={`text-base font-medium leading-4.5 ${isLastItem ? 'text-[#636363]' : 'text-[#8f8f8f]'}  whitespace-nowrap`}> */}
      {text}
      {/* </Link> */}
      {!isLastItem && (
        <div>
          <img src={greaterThan} />
        </div>
      )}
    </div>
  )
}

export default BreadCrumb
