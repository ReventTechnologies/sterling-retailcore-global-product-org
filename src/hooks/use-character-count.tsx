import React, { useState } from 'react'

 const useCharacterCount = () => {
  const [characterCount, setCharacterCount] = useState(0)
  const [character, setCharacter] = useState('')
  const characterLengthChangeHandler = (e) => {
    setCharacterCount(e.target.value.length)
    setCharacter(e.target.value)
  }
  return {
    characterLengthChangeHandler,
    characterCount,
    character
  }
}


export  {useCharacterCount}