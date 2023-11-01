// Every other modal will be a child of this one
import React, { ReactNode, useEffect } from 'react';

type ModalProps = {
    modalTitle: string;
    isNotification: boolean;
    isConfirmation: boolean;
    isOpen: boolean;
    buttonsActive: boolean;
    onClear?: () => void;
    onClose: () => void;
    onAccept: ( ) => void;
    children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, modalTitle, isConfirmation, buttonsActive,isNotification, onClose, onClear, onAccept, children }) => {

    //onClose is executed when the user clicks outside the modal or presses the escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background */}
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        {/*Modal main div*/}
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
                            {/* Modal Skeleton */}
                            <div className='p-6'>
                                {/* Modal Title */}
                                <h1 className='text-left text-3xl font-bold'>{modalTitle}</h1>
                                {/* Modal Content */}
                                <div className='py-8 px-4'>
                                    {children}    
                                </div>
                                <div className='flex space-x-8 justify-end'>
                                    {/* Modal Buttons */}
                                    {!isNotification && (
                                        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded" onClick={onClose}>
                                            {isConfirmation?(<p>No</p>):(<p>Cancelar</p>)}
                                        </button>
                                    )}

                                    {buttonsActive &&(
                                        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded" onClick={onAccept}>
                                            {isConfirmation?(<p>Si</p>):(<p>Aceptar</p>)}
                                        </button>
                                    )}
                                    {(onClear && !isNotification) && (
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={onClear}>
                                          Limpiar
                                      </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;