import { dots } from 'Assets/svgs'
import { EditIcon } from 'Assets/svgs/EditIcon'
import { InlineLoader } from 'Components/Loader/Loader'
import useProductType from './useProductType.hook'

interface Props {
  product: any
  index: number
  currentEditId: string
  productIndex: number
  setCurrentEditId: (ev: any) => void
}
export const ProductType = ({ product, index, currentEditId, productIndex, setCurrentEditId }: Props) => {
  const { drag, name, onNameChange, onblur, onkeyup, saveProductTypeNameLoading, saveButtonRef, onSaveChange } = useProductType(
    product,
    index,
    productIndex,
    setCurrentEditId
  )

  console.log({currentEditId})

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
        <span className={`grow text-[.875rem]`}>{name === product.name ? product.name : name}</span>
      )}
      {currentEditId === product?.product_type_id && saveProductTypeNameLoading ? (
        <InlineLoader />
      ) : (
        <>
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
            <button data-testid={`edit-button${index}`} onClick={() => setCurrentEditId(() => product?.product_type_id)}>
              <EditIcon />
            </button>
          )}
        </>
      )}
    </div>
  )
}
