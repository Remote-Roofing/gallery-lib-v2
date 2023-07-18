"use client"
import { useState } from "react";
import Modal from "@/components/modal";

const data = [
  {
    id: 0,
    status: {
        msg: "urgent",
        type: "urgent",
    },
    image: "https://res.cloudinary.com/ds09jj0fe/image/upload/v1688535481/roof_zyyvfh.png"
  },
  {
      id: 1,
      status: {
          msg: "fair",
          type: "default"
      },
      image: "https://res.cloudinary.com/ds09jj0fe/image/upload/v1688535481/roof2_ypmd66.png"
  },
  {
      id: 2,
      image: "https://res.cloudinary.com/ds09jj0fe/image/upload/v1688535481/roof4_lysvh1.png"
  },
  {
      id: 3,
      status: {
          msg: "good",
          type: "success"
      },
      image: "https://res.cloudinary.com/ds09jj0fe/image/upload/v1688535481/roof3_xqheck.png"
  },
  {
      id: 4,
      status: {
          msg: "emergency",
          type: "emergency"
      },
      image: "https://res.cloudinary.com/ds09jj0fe/image/upload/v1688535481/roof5_hz0ruo.png"
  },
  {
      id: 5,
      status: {
          msg: "fair",
          type: "default"
      },
      image: "https://res.cloudinary.com/ds09jj0fe/image/upload/v1688535481/roof5_hz0ruo.png"
  }
];

const moreData = [
  {
    id: 0,
    status: {
        msg: "good",
        type: "success",
    },
    image: "https://res.cloudinary.com/ds09jj0fe/image/upload/v1687169945/animals/the_old_fashioned_way-wallpaper-1920x1200_dtfkig.jpg"
  },
  {
      id: 1,
      status: {
          msg: "fair",
          type: "default"
      },
      image: "https://res.cloudinary.com/ds09jj0fe/image/upload/v1687169945/animals/city_reflection_night-wallpaper-1920x1200_zkziyp.jpg"
  },
  {
      id: 2,
      image: "https://res.cloudinary.com/ds09jj0fe/image/upload/v1687169945/animals/space_love-wallpaper-1920x1200_rblspd.jpg"
  }
];

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalTwo, setOpenModalTwo] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="flex flex-row w-full h-[540px] gap-3 relative max-xl:flex-col max-xl:h-auto">
      <div className="flex flex-col w-full h-full gap-3 max-xl:flex-row max-xl:w-auto">
        <span onClick={() => {
          setCurrentSlide(4);
          setOpenModal(true);
        }}>Open Modal</span>

        <span onClick={() => {
          setCurrentSlide(0);
          setOpenModalTwo(true);
        }}>Open Second Modal</span>
      </div>
      
      {openModal && (
        <Modal 
          currentImage={currentSlide}
          images={data}
          onClose={() => {setOpenModal(false)}}
          zoomIn={true}
        />
      )}

      {openModalTwo && (
        <Modal 
          currentImage={currentSlide}
          images={moreData}
          onClose={() => {setOpenModalTwo(false)}}
          zoomIn={true}
        />
      )}
    </div>
  );
}
