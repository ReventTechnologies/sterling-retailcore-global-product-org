import { add, Avatar, Close, customer360, Disable, Edit, GreenCheck } from 'Assets/svgs'
import { GreenCheckBig } from 'Assets/svgs/GreenCheckBig'
import { Dispatch, SetStateAction } from 'react'

type props = {
  setShowMatchModal: (isVisible: boolean) => void
  setFormCreationStarted: Dispatch<SetStateAction<boolean>>
  data: {
    percent: string
  }
}
const MatchModal = ({ setShowMatchModal, setFormCreationStarted, data }: props) => {
  const closeModal = () => {
    setShowMatchModal(false)
  }
  return (
    <div
      className={`fixed   z-50 top-0 right-0 left-0 bottom-0 flex items-center justify-center`}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
    >
      <div className={` min-h-[350px] min-w-[500px] bg-white  rounded-xl `}>
        <div className=' w-full  min-h-[300px] flex flex-col  '>
          <div className='flex border-b  justify-between  px-8  py-4'>
            <button className='ml-auto' onClick={closeModal}>
              {' '}
              <img src={Close} />
            </button>
          </div>
          <div className='flex flex-col text-center items-center mt-4'>
            <GreenCheckBig />
            <p className='text-[#2FB755] text-xl mt-2'>{data.percent}% match</p>
            {parseFloat(data.percent) < 10 ? (
              <p className='text-xl text-[#667085]'>
                Match too low please Rescan or <br /> Click skip to form
              </p>
            ) : (
              <>
                <p>match okay but fill other details</p>
                <button className='border border-[#E5E9EB] mt-5 py-1 px-6 rounded-md text-[#667085]' onClick={() => setFormCreationStarted(true)}>
                  Go to form
                </button>
              </>
            )}

            <button className='border border-[#E5E9EB] mt-5 py-1 px-6 rounded-md text-[#667085]' onClick={closeModal}>
              Rescan and upload
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatchModal
