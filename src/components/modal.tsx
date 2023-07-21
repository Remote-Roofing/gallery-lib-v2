import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useKeypress from 'react-use-keypress';
import type { ImageProps } from '../types/inspection';
import SharedModal from './sharedModal';

export default function Modal({
  images,
  onClose,
  zoomIn,
  currentImage,
}: {
  images: ImageProps[];
  onClose: () => void;
  zoomIn?: boolean;
  currentImage?: number;
}) {
  let overlayRef = useRef<any>();
  const router = useRouter();

  const photoId = currentImage;

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(Number(photoId));

  const pathname = usePathname();

  // useEffect(() => {
  //   // just for debugging
  //   console.log({ curIndex });
  // }, [curIndex]);

  function handleClose() {
    router.push(pathname);
    onClose();
  }

  function changePhotoId(newVal: number) {
    if (newVal > curIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);
    router.push(`${pathname}/?photoId=${newVal}`);
  }

  useKeypress('ArrowRight', () => {
    if (curIndex + 1 < images.length) {
      changePhotoId(curIndex + 1);
    }
  });

  useKeypress('ArrowLeft', () => {
    if (curIndex > 0) {
      changePhotoId(curIndex - 1);
    }
  });

  useKeypress('Escape', () => {
    handleClose();
  });

  return (
    <Dialog
      static
      open={false}
      onClose={handleClose}
      initialFocus={overlayRef}
      className='fixed inset-0 z-50 flex items-center justify-center'
    >
      <Dialog.Overlay
        ref={overlayRef}
        as={motion.div}
        key='backdrop'
        className='fixed inset-0 z-50 opacity-80 backdrop-blur-2xl'
        style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      {zoomIn ? (
        <SharedModal
          index={curIndex}
          direction={direction}
          images={images}
          changePhotoId={changePhotoId}
          closeModal={handleClose}
          navigation={true}
          magEnabled={true}
        />
      ) : (
        <SharedModal
          index={curIndex}
          direction={direction}
          images={images}
          changePhotoId={changePhotoId}
          closeModal={handleClose}
          navigation={true}
          magEnabled={false}
        />
      )}
    </Dialog>
  );
}
