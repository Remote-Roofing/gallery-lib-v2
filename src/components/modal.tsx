import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import useKeypress from 'react-use-keypress'
import type { ImageProps } from '@/types/inspection'
import SharedModal from './sharedModal'

export default function Modal({
  images,
  onClose,
  zoomIn,
  currentImage,
}: {
  images: ImageProps[]
  onClose: () => void
  zoomIn?: boolean 
  currentImage?: number
}) {
  let overlayRef = useRef<any>()
  const router = useRouter()

  const photoId = currentImage;
  let index = Number(photoId)

  const [direction, setDirection] = useState(0)
  const [curIndex, setCurIndex] = useState(index)

  function handleClose() {
    router.push('/')
    onClose()
  }

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1)
    } else {
      setDirection(-1)
    }
    setCurIndex(newVal)
    router.push(`/?photoId=${newVal}`)
  }

  useKeypress('ArrowRight', () => {
    if (index + 1 < images.length) {
      changePhotoId(index + 1)
    }
  })

  useKeypress('ArrowLeft', () => {
    if (index > 0) {
      changePhotoId(index - 1)
    }
  })

  useKeypress('Escape', () => {
    handleClose()
  })

  return (
    <Dialog
      static
      open={false}
      onClose={handleClose}
      initialFocus={overlayRef}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <Dialog.Overlay
        ref={overlayRef}
        as={motion.div}
        key="backdrop"
        className="fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      {zoomIn ?
        <SharedModal
          index={curIndex}
          direction={direction}
          images={images}
          changePhotoId={changePhotoId}
          closeModal={handleClose}
          navigation={true}
          magEnabled={true}
        /> :
        <SharedModal
          index={curIndex}
          direction={direction}
          images={images}
          changePhotoId={changePhotoId}
          closeModal={handleClose}
          navigation={true}
          magEnabled={false}
        />
      }
    </Dialog>
  )
}