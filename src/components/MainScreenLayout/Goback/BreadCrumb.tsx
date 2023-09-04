import { greaterThan } from 'Assets/svgs'
import { BreadCrumbsListItemType } from './GoBack'

interface BreadCrumbProps extends BreadCrumbsListItemType {
  isLastItem: boolean
}

const BreadCrumb = ({ isLastItem, link, text }: BreadCrumbProps) => {
  return (
    <div className='flex gap-3 items-center '>
      {text}
      {!isLastItem && (
        <div>
          <img src={greaterThan} alt='greaterThan' />
        </div>
      )}
    </div>
  )
}

export default BreadCrumb
