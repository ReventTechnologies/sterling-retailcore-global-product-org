import { arrow } from 'Assets/svgs'
import React, { memo, useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import BreadCrumb from './Goback/BreadCrumb'

export const sampleBreadCrumbs = [
  {
    text: 'CONFIGURATION ENGINE',
    link: '/config',
  },
  {
    text: 'FORMS CONFIGURATIONS',
    link: '/form',
  },
]

export type BreadCrumbsListItemType = {
  text: string
  link: string
}

type Props = {
  headerText: string
  breadCrumbsList: Array<BreadCrumbsListItemType>
}

const GoBack = memo(({ breadCrumbsList, headerText }: Props) => {
  const [breadCrumbsListLength, setBreadCrumbsListLength] = useState<number>(null)

  useEffect(() => {
    setBreadCrumbsListLength(breadCrumbsList.length - 1)
  }, [breadCrumbsList])

  return (
    <div
      className='px-8  flex flex-col justify-center gap-4  h-28 lg:h-32'
      style={{
        boxShadow: '0 2px 1px  #eeeeee',
      }}
    >
      <h1 className='text-xl font-bold leading-8 uppercase text-[#747373]'>{headerText}</h1>

      <div className='flex gap-4'>
        {/* <Link to={"/"}> */}
        <img src={arrow} title='Go back' />
        {/* </Link> */}
        {breadCrumbsList?.map((item: BreadCrumbsListItemType, index: number) => {


          return (
            <BreadCrumb
              link={item.link}
              text={item.text}
              isLastItem={breadCrumbsList ? index === breadCrumbsListLength : false}
              key={item.link}
            />
          )
        })}
      </div>
    </div>
  )
})

export default GoBack
