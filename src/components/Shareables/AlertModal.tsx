import { error, warning, rightArrow, leftArrow, Close, Success } from 'Assets/svgs'
import Spinner from './Spinner'

type Props = {
  leftClick?: () => void
  leftClickText?: string
  rightClick?: () => void
  rightClickText?: string
  message?: string
  loadingMessage?: string
  closeModal: () => void
  loading: boolean
  status?: 'success' | 'error' | 'warning'
  isOpen: boolean
  showDate?: boolean
}
const AlertModal = ({
  leftClick,
  leftClickText = 'Return to Dashboard',
  rightClick,
  rightClickText,
  message,
  loadingMessage,
  closeModal,
  loading,
  status,
  isOpen,
  showDate = false
}: Props) => {
  return (
    <aside
      className={` ${isOpen ? 'fixed' : 'hidden'}  z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center  `}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div
        className={`${loading ? 'min-h-[6.25rem] min-w-[7.5rem]' : 'min-h-[18.75rem] min-w-[31.25rem]'}  ${loading ? 'flex justify-center items-center' : ''
          } bg-white p-6 rounded-2xl `}
      >
        {loading && (
          <div className='flex flex-col items-center justify-center p-2 text-text-secondary w-fit h-fit'>
            <Spinner size='large' />
            <h6 data-testid='loading-alert' className='m-auto mt-2'>{loadingMessage ? `${loadingMessage}...` : ''}</h6>
          </div>
        )}

        {!loading && (
          <div className=' w-full  min-h-[18.75rem] flex flex-col justify-between'>
            <div className='flex justify-end'>
              <button onClick={closeModal}>
                <img src={Close} alt='Close' />
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
            {
              showDate ?
                <div className='flex items-center justify-center font-light text-text-secondary'>
                  <h6>
                    DATE AND TIME: {new Date().toDateString()}[{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}]
                  </h6>
                </div>
                : null
            }

            <div className={`flex ${leftClickText && rightClickText ? "justify-between" : "justify-center"} text-text-secondary`}>
              {leftClickText && <button className='flex items-center justify-center' onClick={leftClick}>
                <img src={leftArrow} alt='' className='mr-2' />
                <span>{leftClickText}</span>
              </button>}
              {rightClickText &&
                <button className='flex items-center justify-center' onClick={rightClick}>
                  {rightClickText}
                  <img className='ml-2' src={rightArrow} alt='' />
                </button>}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default AlertModal
