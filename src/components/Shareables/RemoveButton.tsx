import { memo } from 'react'
import { times } from '../../assets/svgs'

type RemoveButtonProps = {
  showRemoveButton: boolean
  onClick: (item: any) => any
}
const RemoveButton = memo(({ showRemoveButton, onClick }: RemoveButtonProps) => {
  return (
    <>
      {showRemoveButton && (
        <button className='absolute top-0 z-10 -right-1' onClick={onClick}>
          <img src={times} alt='' width={25} height={25} />
        </button>
      )}
    </>
  )
})

export default RemoveButton
