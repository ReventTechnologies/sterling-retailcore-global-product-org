import { dots } from 'Assets/svgs'
import { EditIcon } from 'Assets/svgs/EditIcon'
import { saveProductTypeName } from 'Redux/actions/ProductCategories'
import { ChangeEvent, KeyboardEvent, useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

interface Props {
  product: any
  index: number
  currentEditId: string
  productIndex: number
  setCurrentEditId: (ev: any) => void
}
export const ProductType = ({ product, index, currentEditId, productIndex, setCurrentEditId }: Props) => {
  const saveButtonRef = useRef<HTMLElement>(null)
  const dispatch: any = useDispatch()

  const [name, setName] = useState<string>(product.product_type)
  const drag = useCallback((ev: any, product: any) => {
    // set the behaviour config for the event
    ev.dataTransfer.setData('productId', product.product_type_id)
  }, [])

  const onNameChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      setName(ev.target.value)
    },
    [name]
  )

  const onkeyup = useCallback((ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      onSaveChange(ev?.currentTarget?.value, ev?.key)
    }
  }, [])

  const onblur = useCallback((e) => {
    if (!saveButtonRef.current.id || saveButtonRef.current.id !== (e.target as Element).id) {
      setCurrentEditId(null)
    }
  }, [])

  const onSaveChange = useCallback(
    (value?: string, key?: string) => {
      if (key === 'Enter') {
        dispatch(saveProductTypeName(product?.product_type_id, value))
      } else {
        dispatch(saveProductTypeName(product?.product_type_id, name))
      }
      setCurrentEditId(null)
    },
    [name, index, productIndex, product]
  )

  return (
    <div
      draggable
      onDragStart={(e) => drag(e, product)}
      id={product.product_type_id}
      className={`flex justify-center shadow-md items-center w-full h-[2.125rem] px-5 gap-x-5 rounded-[0.3125rem] mb-2 bg-white border border-[#AAAAAA] font-normal`}
    >
      <img src={dots} />
      {currentEditId === product?.product_type_id ? (
        <span className={`grow`}>
          <input
            type='text'
            className={`w-full border rounded-md text-[.875rem]`}
            value={name}
            onChange={onNameChange}
            onKeyUp={onkeyup}
            onBlur={onblur}
          />
        </span>
      ) : (
        <span className={`grow text-[.875rem]`}>{name === product.product_type ? product.product_type : name}</span>
      )}
      {currentEditId === product?.product_type_id ? (
        <button
          ref={(ref) => {
            saveButtonRef.current = ref
          }}
          id={product?.product_type_id}
          className={`text-[.75rem] h-full m-0 z-50`}
          onClick={() => onSaveChange()}
        >
          Save
        </button>
      ) : (
        <button onClick={() => setCurrentEditId(() => product?.product_type_id)}>
          <EditIcon />
        </button>
      )}
    </div>
  )
}
