import { dots, info, NavigationIcon } from 'Assets/svgs'
import { EditIcon } from 'Assets/svgs/EditIcon'
import { Button } from 'Components/Button'
import GoBack from 'Components/MainScreenLayout/GoBack'
import AlertModal from 'Components/Shareables/AlertModal'
import React from 'react'
import { gpoData } from 'Utilities/data'

const breadCrumbsList = [{
  text: 'CONFIGURATION ENGINE',
  link: '/config',
},
{
  text: 'GLOBAL PRODUCT ORGANIZATION',
  link: '/form',
}]
interface Props {

}

export const Main = ({ }: Props) => {

  return (
    <>
      <nav><GoBack headerText={`GLOBAL PRODUCT ORGANIZATION`} breadCrumbsList={[...breadCrumbsList]} /></nav>

      <main className={`relative flex py-[1.25rem] px-8 gap-x-[1.25rem] h-screen w-full text-[1rem] bg-[#E5E9EB] leading-4 text-[#636363] font-Inter justify-center`}>
        <section className={`relative w-full`}>
          <div className={` relative flex flex-col rounded-lg text-[#636363] font-[Inter] w-full h-full  min:h-full max:h-full overflow-y-auto bg-white pb-10 pt-20`}>

            <div className={`w-full h-full mb-10 pb-10 mx-10  `}>

              <div className={`w-full text-center flex justify-center items-center px-2 gap-2`}>
                <img src={info} />
                Drag and drop products across the verticals to rearrange products
              </div>
              <div className={`grow w-full flex justify-center items-center mt-5`}>
                <div className={`relative  grid md:grid-cols-[24rem_24rem] grid-cols-[100%] justify-center items-center gap-12 w-[70%] h-full`}>
                  <div className={`absolute justify-center items-center w-fit h-fit left-0 right-0 top-0 bottom-0 m-auto hidden md:flex`}>

                    <NavigationIcon />
                  </div>
                  <>
                    {
                      gpoData.map((data) => (
                        <div id={data.id}
                          onDrop={() => { }}
                          className={`font-roboto flex flex-col h-[19.1rem] border border-[#AAAAAA] justify-evenly items-center rounded-[.5rem] p-5 gap-5 text-[#636363] font-bold text-[1rem] leading-5`}
                        >
                          <div>{data.name}</div>
                          <div className={`grow border border-[#AAAAAA] w-full rounded-[0.5rem] p-5`}>
                            {
                              data.products.map((product) => (
                                <div
                                  draggable
                                  id={product.id}
                                  className={`flex justify-center items-center w-full h-[2.125rem] px-5 gap-x-5 rounded-[0.3125rem] mb-2 bg-white border border-[#AAAAAA] font-normal`}
                                >
                                  <img src={dots} /> <span className={`grow`}>{product.name}</span> <EditIcon />
                                </div>
                              ))
                            }

                          </div>
                        </div>
                      ))
                    }
                  </>
                </div>
              </div>

              <div className={`flex justify-center gap-x-5 mt-10`}>
                <Button
                  className={`bg-transparent border border-[#AAAAAA] text-[#636363_!important] w-fit`}
                  onClick={undefined} disabled={false}        // disabled={false}
                ><span className={`hover:text-white`}>
                    Discard Changes
                  </span>

                </Button>
                <Button
                  onClick={undefined} disabled={true}        // disabled={false}
                >
                  Save
                </Button>

              </div>
            </div>
          </div>
        </section>
        {/* <AlertModal
   
  />
  <AlertModal
   
  /> */}
      </main>
    </>
  )
}
