import { useCallback, useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { dots } from 'Assets/svgs'
import { EditIcon } from 'Assets/svgs/EditIcon'


interface Props {
  product: any
  index: number
  currentEditId: string
  productIndex: number
  setCurrentEditId: (ev: any) => void
  updateProductTypeName: (productDataIndex: number, productTypeId: string, productTypeIndex: number, productTypeName: string) => void
}
export const ProductType = ({
  product,
  index,
  currentEditId,
  productIndex,
  setCurrentEditId,
  updateProductTypeName,
}: Props) => {
  const saveButtonRef = useRef<HTMLElement>(null)
  const editButtonRef = useRef<HTMLElement>(null)
  const editButtonId = uuidv4({ namespace: 'EditButton' })

  const [allowEdit, setAllowEdit] = useState<boolean>(false)
  const [name, setName] = useState<string>(product.product_type)
  const drag = useCallback((ev: any, product: any) => {
    // set the behaviour config for the event
    ev.dataTransfer.setData("productId", product.product_type_id);
  }, [])

  const onNameChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setName(ev.target.value)
  }, [name])

  const onkeyup = useCallback((ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter') {
      // onNameChange(ev)
      onSaveChange(ev?.currentTarget?.value, ev?.key)
    }
  }, [])

  const onblur = useCallback((e) => {
    if (!saveButtonRef.current || !saveButtonRef.current.id || !(saveButtonRef.current.id === (e.target as Element).id)) {
      setCurrentEditId(null)
    }
  }, [])

  const onSaveChange = useCallback((value?: string, key?: string) => {
    if (key === "Enter") {
      updateProductTypeName(productIndex, product.product_type_id, index, value)
    } else {
      updateProductTypeName(productIndex, product.product_type_id, index, name)
    }
    // console.log(name)
    // setAllowEdit(false)
  }, [name, allowEdit, index, productIndex, product])

  return (
    <div
      draggable
      onDragStart={(e) => drag(e, product)}
      id={product.product_type_id}
      className={`flex justify-center shadow-md items-center w-full h-[2.125rem] px-5 gap-x-5 rounded-[0.3125rem] mb-2 bg-white border border-[#AAAAAA] font-normal`}
    >
      <img src={dots} />
      {
        currentEditId === product?.product_type_id ? <span className={`grow`}>

          <input
            type="text"
            className={`w-full border rounded-md text-[.875rem]`}
            value={name}
            onChange={onNameChange}
            onKeyUp={onkeyup}
            onBlur={onblur}
          />
        </span>
          :
          <span className={`grow text-[.875rem]`}>{product.product_type}</span>
      }
      {
        currentEditId === product?.product_type_id ?
          <button
            ref={(ref) => {
              saveButtonRef.current = ref
            }}
            id={product?.product_type_id}
            className={`text-[.75rem] h-full m-0 z-50`} onClick={() => onSaveChange()}>Save</button>
          :
          <button
            onClick={() => setCurrentEditId(product?.product_type_id)}><EditIcon /></button>
      }
    </div>
  )
}