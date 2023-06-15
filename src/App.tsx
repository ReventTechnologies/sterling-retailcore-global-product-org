import { MainScreen } from './screens'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getRolesAndPermissions, getUserProfile } from 'Redux/actions/UserPersmissions'
import configureInterceptor from 'Utilities/apiClient'

type Props = {}

configureInterceptor()
const App = ({}: Props) => {
  const dispatch: any = useDispatch()

  useEffect(() => {
    dispatch(getUserProfile())
    dispatch(getRolesAndPermissions())
  }, [])

  return <MainScreen />
}

export default App
