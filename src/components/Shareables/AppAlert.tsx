import React, { memo } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { generateID } from 'Utilities/generateId'

type Props = {
  message: string
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'
  alertType: 'info' | 'success' | 'warning' | 'error' | 'default'
  theme?: 'light' | 'dark' | 'colored'
  autoClose?: number
  closeOnClick?: boolean
  newestOnTop?: boolean
  draggable?: boolean
  pauseOnHover?: boolean
  hideProgressBar?: boolean
}

const AppAlert = memo(
  ({
    message,
    position = 'top-right',
    alertType = 'default',
    theme = 'colored',
    autoClose = 5000,
    closeOnClick = false,
    newestOnTop = false,
    draggable = true,
    pauseOnHover = true,
    hideProgressBar = false,
  }: Props) => {
    const id = generateID()

    const toastProps = {
      position,
      theme,
      autoClose,
      closeOnClick,
      draggable,
      pauseOnHover,
      hideProgressBar,
      toastId: id,
    }

    if (alertType === 'default') {
      toast(message)
    }

    if (alertType === 'info') {
      toast.info(message, toastProps)
    }

    if (alertType === 'error') {
      toast.error(message, toastProps)
    }

    if (alertType === 'success') {
      toast.success(message, toastProps)
    }

    if (alertType === 'warning') {
      toast.warning(message, toastProps)
    }

    return (
      <div>
        <ToastContainer
          position={position}
          autoClose={autoClose}
          closeOnClick={closeOnClick}
          newestOnTop={newestOnTop}
          draggable={draggable}
          pauseOnHover={pauseOnHover}
          hideProgressBar={hideProgressBar}
          style={{
            whiteSpace: 'break-spaces',
          }}
        />
      </div>
    )
  }
)

export default AppAlert
