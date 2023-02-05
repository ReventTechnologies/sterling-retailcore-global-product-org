import { useCallback, useState } from 'react'
import { dots } from 'Assets/svgs'
import { EditIcon } from 'Assets/svgs/EditIcon'


interface Props {
  product: any
  updateProductTypeName: (productDataIndex: number, productTypeId: string, productTypeIndex: number, productTypeName: string) => void
  index: number
  productIndex: number
}
export const ProductType = ({ product, index, updateProductTypeName, productIndex }: Props) => {
  const [allowEdit, setAllowEdit] = useState<boolean>(false)
  const [name, setName] = useState<string>(product.name)
  const drag = useCallback((ev: any, product: any) => {
    // set the behaviour config for the event
    ev.dataTransfer.setData("productId", product.product_type_id);
  }, [])

  const onNameChange = useCallback((ev: any) => {
    setName(ev.target.value)
  }, [name])

  const onSaveChnage = useCallback(() => {
    updateProductTypeName(productIndex, product.product_type_id, index, name)
    setAllowEdit(false)
  }, [name, allowEdit, index, productIndex, product])

  return (
    <div
      draggable
      onDragStart={(e) => drag(e, product)}
      id={product.id}
      className={`flex justify-center shadow-md items-center w-full h-[2.125rem] px-5 gap-x-5 rounded-[0.3125rem] mb-2 bg-white border border-[#AAAAAA] font-normal`}
    >
      <img src={dots} />
      {
        allowEdit ? <span className={`grow`}>

          <input type="text" className={`w-full border rounded-md text-[.875rem]`} value={name} onChange={onNameChange} />
        </span>
          :
          <span className={`grow text-[.875rem]`}>{product.name}</span>
      }
      {
        allowEdit ?
          <button className={`text-[.75rem]`} onClick={onSaveChnage}>Save</button>
          :
          <button onClick={() => setAllowEdit(true)}><EditIcon /></button>
      }
    </div>
  )
}

// {"data":[
// 	{
// 	"product_category": "Payment",
// 	"recently_updated_column": "product_category",
// 	"description": "Payment product"
// 	},
// 	{
// 	"product_category": "Deposit",
// 	"recently_updated_column": "product_category",
// 	"description": "Deposit product"
// 	},
// 	{
// 	"product_category": "Credit",
// 	"recently_updated_column": "product_category",
// 	"description": "Credit product"
// 	},
// 	{
// 	"product_category": "Investment",
// 	"recently_updated_column": "product_category",
// 	"description": "Investment product"
// 	}
// ],
//  "created_by_id": "b5fee30d-b6dc-457e-850e-d60a3c9ff8c5",
// 	"created_by": "Gideon"
// }