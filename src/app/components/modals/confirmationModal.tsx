import React, { ReactNode} from 'react';
import Modal from './modal';

type ModalProps = {
    modalTitle: string;
    isOpen: boolean;
    onClose: () => void;
    onAccept: ( ) => void;
    children: ReactNode;
};

const ConfirmationModal: React.FC<ModalProps> = ({ isOpen, modalTitle, onAccept, onClose, children }) => {
    //father modal props
    const fatherModalProps = {
        modalTitle: modalTitle,
        buttonsActive: true,
        isNotification: false,
        isConfirmation: true,
        isOpen: isOpen,
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

export default ConfirmationModal;
