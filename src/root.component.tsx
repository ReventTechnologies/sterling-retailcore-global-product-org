import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'
import 'typeface-roboto'
import '@fontsource/inter'
import './styles/final.css'


export default function Root() {
  return (
    <>
      <Provider store={store}>
        <App />
    
      </Provider>
    </>
  )
}
