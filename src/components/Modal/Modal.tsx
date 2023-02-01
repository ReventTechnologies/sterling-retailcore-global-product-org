import React, { memo, ReactNode } from 'react';
import { alertClose } from 'Assets/svgs';

interface ClassTypes {
  modal: string,
  modalDialog: string,
  modalContent: string,
  modalHeader: string,
  modalTitle: string,
  modalBody: string,
  modalFooter: string,
  closeButtonClass: string,
  saveButtonClass: string,
}
interface Props {
  children: ReactNode,
  title: string,
  isOpen: boolean,
  modalCloseClick: () => void,
  modalHeader: boolean,
  classes: ClassTypes
}
const Modal = ({
  children,
  title,
  isOpen = false,
  modalCloseClick,
  modalHeader,
  classes
}: Props) => {


  return (
    <div
      style={{ zIndex: 100000002 }}
      className={`modal-holder bg-[#00000099] p-20 mt-5 items-center justify-center ${isOpen ? 'flex' : 'hidden'}`}>
      <div className={`shadow p-10 bg-white rounded-lg ${classes?.modalDialog}`}>
        {modalHeader &&
          <div className={`flex justify-between border-b pb-2`}>
            <h5 className="font-bold text-center text-lg uppercase">{title}</h5>
            <div className="modal-close" onClick={modalCloseClick}>
              <img src={alertClose} alt={`close icon`} />
            </div>
          </div>
        }

        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};


const ModalMemo = memo(Modal);
export { ModalMemo as Modal };
