/* eslint-disable no-unused-vars */
export interface ImageProps {
    id: number
    height: string
    width: string
    status: object  
    image: string
  }
  
  export interface SharedModalProps {
    index: number
    images?: ImageProps[]
    currentPhoto?: ImageProps
    changePhotoId: (newVal: number) => void
    closeModal: () => void
    navigation: boolean
    direction?: number
    magEnabled: boolean
  }
  