import React, { ReactNode} from 'react';
import Image from 'next/image';
import error from '../images/error.png';
import ok from '../images/ok.png';

type notificationProps = {
    message:string
};

const ErrorNotification: React.FC<notificationProps>=  ({message}) => {
    return (
            <div className="mx-auto">
                <Image className="p-4 mx-auto w-32 h-32" src = {error} alt='Error symbol'></Image>
                <span className='mx-auto'>{message}</span>
            </div>
    );
};

const SuccessNotification: React.FC<notificationProps>=  ({message}) => {
    return (
            <div className="mx-auto">
                <Image className="p-4 mx-auto w-32 h-32" src = {ok} alt='Success symbol'></Image>
                <span className='mx-auto'>{message}</span>
            </div>
    );
};

const LoadingNotification: React.FC<notificationProps>=  ({message}) => {
    return (
            <div className="mx-auto">
                <img className="p-4 mx-auto w-32 h-32" src = "/loading.gif" alt='Loading symbol'></img>
                <span className='mx-auto'>{message}</span>
            </div>
    );
};


export {ErrorNotification, SuccessNotification, LoadingNotification};
