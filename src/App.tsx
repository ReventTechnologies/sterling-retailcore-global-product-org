import { getRolesAndPermissions, getUserProfile } from 'Redux/actions/UserPersmissions'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Main } from './pages'

const App = () => {
  const dispatch: any = useDispatch()

  useEffect(() => {
    dispatch(getUserProfile())
    dispatch(getRolesAndPermissions())
  }, [])

  return <Main />
}

export default App
