"use client"
import { useState } from "react";
import Modal from "@/components/modal";
import ToggleSwitchMagnify from "@/components/toggleSwitchMagnify";

const data = [
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
  },
  {
      id: 3,
      status: {
        msg: "",
      },
      image: "https://res.cloudinary.com/ds09jj0fe/image/upload/v1690464203/750938_rtwxr5.png"
  },
  {
      id: 4,
      status: {
        msg: "",
      },
      image: "https://res.cloudinary.com/ds09jj0fe/image/upload/v1690464203/750938_rtwxr5.png"
  },
];

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [showMag, setShowMag] = useState(false);

  const handleMag = () => {
    setShowMag(!showMag);
    console.log("now set to", showMag);
  }

  const handleOpen = () => {
    setCurrentSlide(0);
    setOpenModal(true);
  }

  const closeHandler = () => {
    setOpenModal(false);
  }

  return (
    <div>
        <div className="flex flex-row w-full h-[540px] gap-3 relative max-xl:flex-col max-xl:h-auto">
          <div className="fixed bg-red-300 flex flex-col z-50 gap-3 max-xl:flex-row max-xl:w-auto">
            <span onClick={handleOpen}>Open Modal</span>
          </div>

        {openModal && (
          <Modal 
            currentImage={currentSlide}
            images={data}
            onClose={closeHandler}
            zoomIn={showMag}
          />
        )}
      </div>
      <div className="w-full h-full relative px-5 py-5 items-center justify-center flex flex-col">
            <div className="w-[50%] bg-purple-300 flex flex-col gap-3">
              <div className="pt-12 px-5 w-full flex items-end justify-end">
                <ToggleSwitchMagnify toggleHandler={handleMag} />
              </div>
              <p className="relative mx-12 my-12 text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra, mi ut sollicitudin varius, justo diam fringilla tellus, interdum feugiat erat arcu ut leo. In hac habitasse platea dictumst. Donec vel dapibus urna, nec lacinia massa. Curabitur egestas diam sit amet turpis ullamcorper, a blandit purus placerat. In augue ex, facilisis non ultrices sit amet, faucibus vitae eros. Morbi aliquam est sed sem dignissim, sed aliquam elit volutpat. Duis vitae magna ultricies, dapibus mi ut, dictum mi. Donec consectetur quam eget scelerisque aliquet. Aenean vel sem eu orci iaculis ultricies a a neque. Duis at nunc ut arcu luctus euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor et mi nec semper. Quisque maximus vehicula odio eu ornare. Sed gravida posuere sem.
              </p>
              <p className="relative mx-12 my-12 text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra, mi ut sollicitudin varius, justo diam fringilla tellus, interdum feugiat erat arcu ut leo. In hac habitasse platea dictumst. Donec vel dapibus urna, nec lacinia massa. Curabitur egestas diam sit amet turpis ullamcorper, a blandit purus placerat. In augue ex, facilisis non ultrices sit amet, faucibus vitae eros. Morbi aliquam est sed sem dignissim, sed aliquam elit volutpat. Duis vitae magna ultricies, dapibus mi ut, dictum mi. Donec consectetur quam eget scelerisque aliquet. Aenean vel sem eu orci iaculis ultricies a a neque. Duis at nunc ut arcu luctus euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor et mi nec semper. Quisque maximus vehicula odio eu ornare. Sed gravida posuere sem.
              </p>
              <p className="relative mx-12 my-12 text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra, mi ut sollicitudin varius, justo diam fringilla tellus, interdum feugiat erat arcu ut leo. In hac habitasse platea dictumst. Donec vel dapibus urna, nec lacinia massa. Curabitur egestas diam sit amet turpis ullamcorper, a blandit purus placerat. In augue ex, facilisis non ultrices sit amet, faucibus vitae eros. Morbi aliquam est sed sem dignissim, sed aliquam elit volutpat. Duis vitae magna ultricies, dapibus mi ut, dictum mi. Donec consectetur quam eget scelerisque aliquet. Aenean vel sem eu orci iaculis ultricies a a neque. Duis at nunc ut arcu luctus euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor et mi nec semper. Quisque maximus vehicula odio eu ornare. Sed gravida posuere sem.
              </p>
              <p className="relative mx-12 my-12 text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra, mi ut sollicitudin varius, justo diam fringilla tellus, interdum feugiat erat arcu ut leo. In hac habitasse platea dictumst. Donec vel dapibus urna, nec lacinia massa. Curabitur egestas diam sit amet turpis ullamcorper, a blandit purus placerat. In augue ex, facilisis non ultrices sit amet, faucibus vitae eros. Morbi aliquam est sed sem dignissim, sed aliquam elit volutpat. Duis vitae magna ultricies, dapibus mi ut, dictum mi. Donec consectetur quam eget scelerisque aliquet. Aenean vel sem eu orci iaculis ultricies a a neque. Duis at nunc ut arcu luctus euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam auctor et mi nec semper. Quisque maximus vehicula odio eu ornare. Sed gravida posuere sem.
              </p>
            </div>
      </div>
    </div>
  );
}
