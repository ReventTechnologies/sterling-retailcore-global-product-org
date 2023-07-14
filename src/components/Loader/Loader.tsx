import './index.css'

export const Loader = () => {
  return <span className='spinner'></span>
}

export const BlockLoader = () => {
  return (
    <div className='flex justify-center mt-10 w-full'>
      <Loader />
    </div>
  )
}

export const InlineLoader = () => {
  return <span className='inline-loader'></span>
}
