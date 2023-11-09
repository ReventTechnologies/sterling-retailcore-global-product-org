import { greaterThan } from 'Assets/svgs'
import { BreadCrumbsListItemType } from './GoBack'

interface BreadCrumbProps extends BreadCrumbsListItemType {
  isLastItem: boolean
}

export default function BreadCrumb({ isLastItem, link, text }: BreadCrumbProps) {
  return (
    <div className='flex gap-3 items-center '>
      <a href={link} className={`text-base uppercase font-medium leading-4.5 ${isLastItem ? 'text-[#636363]' : 'text-[#8f8f8f]'}  whitespace-nowrap`}>
        {text}
      </a>
      {!isLastItem && (
        <div>
          <img src={greaterThan} className=' h-[.875rem] w-[.4375rem]' />
        </div>
      )}
    </div>
  )
}
