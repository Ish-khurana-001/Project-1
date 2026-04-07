import React, { useEffect, useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({image, setImage}) => {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file){
            //update the image state
            setImage(file);

            //generate preview url from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    const onChooseFile = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

  return (
    <div className='flex justify-center mb-6'>
        <input 
            type = "file"
            accept='image/*'
            ref={inputRef}
            onChange={handleImageChange}
            className='hidden'
            aria-label='Choose profile photo'
        />

        {!image ? (
            <div className='relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-fuchsia-100 bg-gradient-to-br from-fuchsia-50 via-white to-sky-50'>
                <LuUser className='text-4xl text-primary' />

                    <button 
                        type='button'
                        className='absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-sm'
                        onClick={onChooseFile}
                        aria-label='Upload profile photo'
                    >
                        <LuUpload />
                    </button>
            </div>
        ) : (
            <div className='relative'>
                <img 
                    src={previewUrl}
                    alt='Selected profile preview'
                    className='h-24 w-24 rounded-[28px] object-cover shadow-sm'
                />
                <button 
                    type="button"
                    className='absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm'
                    onClick={handleRemoveImage}
                    aria-label='Remove profile photo'
                >
                    <LuTrash />
                </button>
            </div>
        )}
    </div>
  )
}

export default ProfilePhotoSelector
