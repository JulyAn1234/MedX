import React, { ReactNode} from 'react';
import Modal from './modal';

type ModalProps = {
    modalTitle: string;
    isOpen: boolean;
    onClear: () => void;
    onClose: () => void;
    onAccept: ( ) => void;
    children: ReactNode;
};

const FormModal: React.FC<ModalProps> = ({ isOpen, modalTitle, onClear,onAccept, onClose, children }) => {
    //father modal props
    const fatherModalProps = {
        modalTitle: modalTitle,
        isNotification: false,
        isConfirmation: false,
        buttonsActive: true,
        isOpen: isOpen,
        onClear: onClear,
        onClose: onClose,
        onAccept: onAccept,
        children: children
    } 
    return (
        <Modal {...fatherModalProps}>
            {children}
        </Modal>
    );
};

export default FormModal;
