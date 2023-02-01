import React from 'react'

type Props = {
  text: string
  setValue: (value: any) => void
  checked: boolean
  trackingName: string
}

const RadioButton = ({ text, setValue, trackingName, checked }: Props) => {
  return (
    <div className='form-check font-roboto'>
      <input
        className='form-check-input appearance-none rounded-full h-4 w-4 border border-[#CF2A2A] bg-white checked:bg-[#CF2A2A] checked:border-[#CF2A2A] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-4'
        name={trackingName}
        type='radio'
        onChange={(e) => {
          setValue(text)
        }}
        id={text}
        style={{
          boxShadow: `0px 0px 0px 2px white inset`,
        }}
        checked={checked}
      />
      <label className='inline-block text-gray-800 capitalize opacity-50 form-check-label' htmlFor={text}>
        {text}
      </label>
    </div>
  )
}

export default RadioButton
