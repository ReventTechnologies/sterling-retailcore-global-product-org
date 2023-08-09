import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getRolesAndPermissions, getUserProfile } from 'Redux/actions/UserPersmissions'
import configureInterceptor from 'Utilities/apiClient'
import { Main } from './pages'

configureInterceptor()
const App = () => {
  const dispatch: any = useDispatch()

  useEffect(() => {
    dispatch(getUserProfile())
    dispatch(getRolesAndPermissions())
  }, [])

  return <Main />
}

export default App
