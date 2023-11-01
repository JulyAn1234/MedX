import React, { ReactNode} from 'react';
import Modal from './modal';

type ModalProps = {
    modalTitle: string;
    isOpen: boolean;
    buttonsActive: boolean;
    onClose: () => void;
    onAccept: ( ) => void;
    children: ReactNode;
};

const NotificationModal: React.FC<ModalProps> = ({ isOpen, buttonsActive,modalTitle, onAccept, onClose, children }) => {
    //father modal props
    const fatherModalProps = {
        modalTitle: modalTitle,
        isNotification: true,
        isConfirmation: false,
        isOpen: isOpen,
        buttonsActive: buttonsActive,
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

export default NotificationModal;
