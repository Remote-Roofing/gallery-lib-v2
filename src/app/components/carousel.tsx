'use client';

import type { ImageProps } from '@/types/inspection';
import { useLastViewedPhoto } from '@/utils/useLastViewedPhoto';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SharedModal from './sharedModal';
import { RefObject, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import useKeypress from 'react-use-keypress';
import { motion } from 'framer-motion';

export default function Carousel({
  index,
  currentPhoto,
  images,
}: {
  index: number;
  currentPhoto: ImageProps;
  images: any;
}) {
  const router = useRouter();
  const [, setLastViewedPhoto] = useLastViewedPhoto();

  const overlayRef = useRef<HTMLDivElement | null>(null);

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function changePhotoId(newVal: number) {
    console.log('change photo id function: ', newVal);
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);
    router.push(`/p/${newVal}`, undefined);
  }

  useKeypress('ArrowRight', () => {
    if (index + 1 < images.length) {
      changePhotoId(index + 1);
    }
  });

  useKeypress('ArrowLeft', () => {
    if (index > 0) {
      changePhotoId(index - 1);
    }
  });

  function handleClose() {
    setLastViewedPhoto(null); //change currentPhoto.id -> null
    router.push('/inspections/details/', undefined);
  }

  useKeypress('Escape', handleClose);

  return (
    <Dialog
      static
      open={false}
      onClose={handleClose}
      initialFocus={overlayRef}
      className='fixed pl-72 p-5 max-lg:pl-5 max-lg:p-5 inset-0 flex items-center justify-center'
    >
      <Dialog.Overlay
        ref={overlayRef as RefObject<HTMLDivElement>}
        className='absolute inset-0 z-30 cursor-default bg-black backdrop-blur-4xl'
        onClick={handleClose}
        as={motion.div}
        key='backdrop'
      >
        <Image
          src={currentPhoto.image}
          className='pointer-events-none h-full w-full blur-md opacity-40'
          alt='blurred background'
          fill
          priority={true}
        />
      </Dialog.Overlay>
      <SharedModal
        index={curIndex}
        direction={direction}
        images={images}
        currentPhoto={images[curIndex]}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        navigation={true}
        magEnabled={true}
      />
    </Dialog>
  );
}
