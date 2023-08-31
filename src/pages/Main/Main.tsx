import { NavigationIcon, info } from 'Assets/svgs'
import { Button } from 'Components/Button'
import GoBack from 'Components/MainScreenLayout/GoBack'
import { ProductFrame } from 'Components/ProductFrame'
import AlertModal from 'Components/Shareables/AlertModal'
import useMain from './useMain.hook'

export const Main = () => {
  const {
    breadCrumbsList,
    disabled,
    allowDrop,
    dragLeave,
    onDiscardChanges,
    closeSaveGPOModal,
    drop,
    onSaveGPO,
    productData,
    currentEditId,
    setCurrentEditId,
    productCategoriesLoading,
    saveModalLoading,
    saveGPOLoading,
    saveGPOSuccess,
    saveGPOError,
    saveGPOMessage,
    userProfileData,
  } = useMain()

  return (
    <>
      <nav>
        <GoBack headerText={'GLOBAL PRODUCT ORGANIZATION'} breadCrumbsList={[...breadCrumbsList]} />
      </nav>

      <main
        className={
          'relative flex py-[1.25rem] px-8 gap-x-[1.25rem] h-screen w-full text-[1rem] bg-[#E5E9EB] leading-4 text-[#636363] font-Inter justify-center'
        }
      >
        <section className={'relative w-full'}>
          <div
            className={
              ' relative flex rounded-lg text-[#636363] font-[Inter] w-full h-full  min:h-full max:h-full overflow-y-auto bg-white pb-10 pt-20'
            }
          >
            <div className={'w-full mb-10 mx-10'}>
              <div className={'w-full text-center flex justify-center items-center px-2 gap-2'}>
                <img src={info} alt='info' />
                Drag and drop products across the verticals to rearrange products
              </div>
              <div className={'grow w-full flex justify-center items-center mt-5'}>
                <div className={'relative  grid md:grid-cols-[24rem_24rem] grid-cols-[100%] justify-center items-center gap-12 w-[70%] h-full'}>
                  <div className={'absolute justify-center items-center w-fit h-fit left-0 right-0 top-0 bottom-0 m-auto hidden md:flex'}>
                    <NavigationIcon />
                  </div>
                  <>
                    {productData?.map((data, index) => (
                      <ProductFrame
                        data={data}
                        allowDrop={allowDrop}
                        dragLeave={dragLeave}
                        drop={drop}
                        productIndex={index}
                        currentEditId={currentEditId}
                        setCurrentEditId={setCurrentEditId}
                        key={data?.product_category_id}
                      />
                    ))}
                  </>
                </div>
              </div>

              <div className={'flex justify-center gap-x-5 mt-10'}>
                <Button
                  className={'bg-transparent border border-[#AAAAAA] text-[#636363_!important] w-fit disabled:text-white'}
                  onClick={onDiscardChanges}
                  disabled={disabled()} // disabled={false}
                >
                  <span className={'hover:text-white'}>Discard Changes</span>
                </Button>
                <Button
                  className={'bg-primay-main text-[white_!important] '}
                  onClick={onSaveGPO}
                  disabled={disabled()} // disabled={false}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </section>
        <AlertModal isOpen={productCategoriesLoading} closeModal={undefined} loading={productCategoriesLoading} loadingMessage={'Fetching'} />

        <AlertModal
          isOpen={saveModalLoading}
          loading={saveGPOLoading}
          leftClick={() => {
            window.location.replace('/configuration/dashboard')
          }}
          closeModal={closeSaveGPOModal}
          status={saveGPOSuccess ? 'success' : saveGPOError ? 'error' : 'warning'}
          loadingMessage={'Saving'}
          message={
            saveGPOError
              ? 'An Error occurred please try again!'
              : saveGPOSuccess && userProfileData?.tenant_admin
              ? 'Configuration Saved Successfully!'
              : saveGPOMessage
          }
        />
      </main>
    </>
  )
}

export default Main
