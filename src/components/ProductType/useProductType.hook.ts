import { saveProductTypeName } from 'Redux/actions/ProductCategories'
import { SaveProductTypeNameType } from 'Redux/reducers/ProductCategories'
import { ReducersType } from 'Redux/store'
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function useProductType(product, index, productIndex, setCurrentEditId) {
  const dispatch: any = useDispatch()
  const saveButtonRef = useRef<HTMLElement>(null)

  const { loading: saveProductTypeNameLoading, success: saveProductTypeNameSuccess } = useSelector<ReducersType>(
    (state) => state.SaveProductTypeName
  ) as SaveProductTypeNameType
  const [name, setName] = useState<string>(product.name)

  useEffect(() => {
    if (saveProductTypeNameSuccess) {
      setCurrentEditId(null)
    }
  }, [saveProductTypeNameSuccess])

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
    },
    [name, index, productIndex, product]
  )

  return { drag, name, onNameChange, saveProductTypeName, saveProductTypeNameLoading, saveButtonRef, onSaveChange, onkeyup, onblur }
}
