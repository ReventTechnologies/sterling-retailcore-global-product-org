import { useCallback } from 'react'
import { ProductType } from 'Components/ProductType'

interface Props {
  data: any
  productIndex: number
  dragLeave: (ev: any) => void
  currentEditId: string
  setCurrentEditId: (ev: any) => void
  drop: (ev: any, passedId?: string) => void
  allowDrop: (ev: any, index: number) => void
  updateProductTypeName: (productDataIndex: number, productTypeId: string, productTypeIndex: number, productTypeName: string) => void
}

export const ProductFrame = ({
  data,
  currentEditId,
  productIndex,
  drop,
  dragLeave,
  allowDrop,
  setCurrentEditId,
  updateProductTypeName
}: Props) => {




  return (
    <div id={data.id}
      onDragLeave={(e) => dragLeave(e)}
      onDragOver={(e) => allowDrop(e, productIndex)}
      onDrop={(e) => drop(e)}
      className={`font-roboto flex flex-col h-[19.1rem] border border-[#AAAAAA] justify-evenly items-center rounded-[.5rem] p-5 gap-5 text-[#636363] font-bold text-[1rem] leading-5`}
    >
      <div className={`text-[1rem] leading-[1.1875rem] uppercase`}>{data?.product_category}</div>
      <div className={`grow border border-[#AAAAAA] w-full rounded-[0.5rem] p-5`}>
        {
          data.product_types.map((product, index) => (
            <ProductType
              currentEditId={currentEditId}
              setCurrentEditId={setCurrentEditId}
              key={index}
              product={product}
              updateProductTypeName={updateProductTypeName}
              index={index}
              productIndex={productIndex}
            />
          ))
        }

      </div>
    </div>
  )
}
