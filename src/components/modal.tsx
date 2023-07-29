import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useKeypress from 'react-use-keypress';
import type { ImageProps } from '../types/inspection';
import SharedModal from './sharedModal';
import { getScrollPosition } from '../utilities/getScrollPosition';

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

  //Handling scroll position when opening the dialog or changing images
  useEffect(() => {
    const scrollPosition = getScrollPosition();

    // Navigate to the desired page, preserving the scroll position
    router.push(`${pathname}/?photoId=${curIndex}`, { scroll: false });
    document.body.style.overflow = 'hidden';

    // After the push, reset the scroll position to the previously stored position
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);
  }, [curIndex, pathname, router])

  function handleClose() {
    onClose();
    router.replace(pathname, {scroll: false});

    document.body.style.overflow = 'auto';
  }

  function changePhotoId(newVal: number) {
    if (newVal > curIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);

    //using replace instead of push to prevent the page from resetting scroll offset
    router.replace(`${pathname}/?photoId=${newVal}`);
    return false; // prevent default
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
        className='fixed inset-0 z-50 opacity-50 backdrop-blur-md'
        style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      {zoomIn == true ? (
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
