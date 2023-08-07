import './index.css'

export const Loader = () => {
  return <span data-testid='loader-spinner' className='spinner'></span>
}

export const BlockLoader = () => {
  return (
    <div className='flex justify-center mt-10 w-full' data-testid='block-loader'>
      <Loader />
    </div>
  )
}

export const InlineLoader = () => {
  return <span className='inline-loader' data-testid='loader-inline'></span>
}
