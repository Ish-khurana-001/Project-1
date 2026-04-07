import React, { useEffect, useId, useRef } from 'react'

const Modal = ({children, isOpen, onClose, title}) => {
    const titleId = useId();
    const closeButtonRef = useRef(null);

    useEffect(() => {
        if(!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if(!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-slate-950/45 px-4 py-6'>
        <div className='relative w-full max-w-2xl'>
            {/* Modal Content */}
            <div
                className='relative overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.18)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-[0_24px_60px_rgba(2,6,23,0.65)]'
                role='dialog'
                aria-modal='true'
                aria-labelledby={titleId}
            >
                <div className='absolute inset-x-0 top-0 h-20 bg-[linear-gradient(90deg,_rgba(244,114,182,0.10),_rgba(56,189,248,0.08))] dark:bg-[linear-gradient(90deg,_rgba(192,38,211,0.18),_rgba(34,211,238,0.14))]' />
                {/*Modal header*/}

                <div className='relative flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800 md:p-6'>
                    <h3 id={titleId} className='font-accent text-xl font-bold text-slate-950 dark:text-white'>
                        {title}
                    </h3>

                    <button
                        ref={closeButtonRef}
                        type='button'
                        className='inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:border-fuchsia-200 hover:bg-fuchsia-50 hover:text-fuchsia-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-fuchsia-500/40 dark:hover:bg-fuchsia-500/10 dark:hover:text-fuchsia-200'
                        onClick={onClose}
                        aria-label={`Close ${title}`}
                    >
                        <svg className="w-3 h-3" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" fill='none' aria-hidden="true">
                            <path 
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth="2"
                                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                            />
                        </svg>
                    </button>
                </div>

                {/*Modal body*/}
                <div className='relative space-y-4 p-5 md:p-6'>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal
