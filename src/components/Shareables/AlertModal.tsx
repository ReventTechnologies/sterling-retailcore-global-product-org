import React from 'react'

import { error, warning, rightArrow, leftArrow, Close, Success } from 'Assets/svgs'
import Spinner from './Spinner'

type Props = {
  leftClick?: () => void
  leftClickText?: string
  rightClick?: () => void
  rightClickText?: string
  message?: string
  closeModal: () => void
  loading: boolean
  status?: 'success' | 'error' | 'warning'
  isOpen: boolean
}
const AlertModal = ({
  leftClick,
  leftClickText = 'Return to Dashboard',
  rightClick,
  rightClickText = 'Configure another form',
  message,
  closeModal,
  loading,
  status,
  isOpen,
}: Props) => {
  return (
    <aside
      className={` ${isOpen ? 'fixed' : 'hidden'}  z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div
        className={`${loading ? 'min-h-[100px] min-w-[120px]' : 'min-h-[300px] min-w-[500px]'}  ${
          loading ? 'flex justify-center items-center' : ''
        } bg-white p-6 rounded-2xl `}
      >
        {loading && (
          <div className='flex flex-col items-center justify-center p-2 text-text-secondary w-fit h-fit'>
            <Spinner size='large' />
            <h6 className='m-auto'>Saving...</h6>
          </div>
        )}

        {!loading && (
          <div className=' w-full  min-h-[300px] flex flex-col justify-between'>
            <div className='flex justify-end'>
              <button onClick={closeModal}>
                <img src={Close} />
              </button>
            </div>

            {status && (
              <div className='flex items-center justify-center '>
                {status === 'success' ? <img src={Success} alt='' /> : null}
                {status === 'error' ? <img width={'100'} src={error} alt='' /> : null}
                {status === 'warning' ? <img width={'100'} src={warning} alt='' /> : null}
              </div>
            )}
            <div className='flex items-center justify-center font-light text-text-secondary'>
              <h6>{message}</h6>
            </div>

            <div className='flex items-center justify-center font-light text-text-secondary'>
              <h6>
                DATE AND TIME: {new Date().toDateString()}[{new Date().toLocaleTimeString('en-US', { hour12: true })}]
              </h6>
            </div>

            <div className='flex justify-between text-text-secondary'>
              <button className='flex items-center justify-center' onClick={leftClick}>
                <img src={leftArrow} alt='' className='mr-2' />
                <span>{leftClickText}</span>
              </button>
              <button className='flex items-center justify-center' onClick={rightClick}>
                {rightClickText}
                <img className='ml-2' src={rightArrow} alt='' />
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default AlertModal
