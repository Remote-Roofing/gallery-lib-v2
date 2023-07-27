"use client";
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUturnLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "../utilities/animationVariants";
import downloadPhoto from "../utilities/downloadPhoto";
import { range } from "../utilities/range";
import type { ImageProps, SharedModalProps } from "../types/inspection";
import { Dot, Twitter } from "lucide-react";

import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import { Badge } from "./ui/badge";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function SharedModal({
  index,
  images,
  changePhotoId,
  closeModal,
  navigation,
  currentPhoto,
  direction,
  magEnabled,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);

  let filteredImages = images?.filter((img: ImageProps) =>
    range(index - 15, index + 15).includes(img.id),
  ) as any[];

  const imagesLength = images ? images.length : 0;

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < imagesLength - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  let currentImage: any = images ? images[index] : currentPhoto;

  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  const [zoomActive, setZoomActive] = useState(false);

  const [zoomPercentage, setZoomPercentage] = useState(100);
  const [magnifierSize] = useState(180);
  const [zoomLevel] = useState(2);

  const timerRef = useRef<any>(null);

  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

    return (
      <div className="absolute bottom-0 left-1 z-50 flex items-center gap-2 p-3">
        <button
          className="rounded-full bg-color-hover-badge p-2 text-white/75 backdrop-blur-lg transition hover:text-white"
          onClick={() => {
            zoomIn(1);
            if (zoomPercentage < 200) {
              setZoomPercentage(zoomPercentage + 25);
            }
          }}
          title="Zoom In"
        >
          <MagnifyingGlassPlusIcon className="h-6 w-6" />
        </button>
        <button
          className="rounded-full bg-color-hover-badge p-2 text-white/75 backdrop-blur-lg transition hover:text-white"
          onClick={() => {
            zoomOut(1);
            if (zoomPercentage > 100) {
              setZoomPercentage(zoomPercentage - 25);
            }
          }}
          title="Zoom Out"
        >
          <MagnifyingGlassMinusIcon className="h-6 w-6" />
        </button>
        <button
          className="rounded-full bg-color-hover-badge p-2 text-white/75 backdrop-blur-lg transition hover:text-white"
          onClick={() => {
            resetTransform();
            setZoomActive(false);
            setZoomPercentage(100);
          }}
          title="Reset Transform"
        >
          <ViewColumnsIcon className="h-6 w-6" />
        </button>
        <h1 className="text-md rounded-full bg-color-hover-badge p-2 px-4 text-white/75 backdrop-blur-lg transition hover:text-white">
          {zoomPercentage}%
        </h1>
      </div>
    );
  };

  useEffect(() => {
    if (zoomActive) {
      setShowMagnifier(false);
    } else {
      setShowMagnifier(true);
    }
  }, [zoomActive]);

  const gradingColorDictionary = {
    fair: {
      textColor: "text-[#667085]",
      backgroundColor: "bg-[#E7E7EA]",
    },
    urgent: {
      textColor: "text-[#E59D5A]",
      backgroundColor: "bg-[#FEF2E5]",
    },
    emergency: {
      textColor: "text-[#DA615D]",
      backgroundColor: "bg-[#F9E5E5]",
    },
    good: {
      textColor: "text-[#49945A]",
      backgroundColor: "bg-[#DCF4E4]",
    },
  };

  const gradingTypeDictionary = {
    default: {
      classNames: "bg-[#E7E7EA] text-[#667085]",
    },
    warning: {
      classNames: "bg-[#FEF2E5] text-[#E59D5A]",
    },
    error: {
      classNames: "bg-[#F9E5E5] text-[#DA615D]",
    },
    success: {
      classNames: "bg-[#DCF4E4] text-[#49945A]",
    },
  };


  const handleMouseMove = (event) => {
    const elem = event.currentTarget;
    const { top, left } = elem.getBoundingClientRect();

    const x = event.pageX - left - window.scrollX;
    const y = event.pageY - top - window.screenY;
    setXY([x, y]);

    // Debounce the state update using setTimeout
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setXY([x, y]);
      timerRef.current = null;
    }, 100);
  };


  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-5xl items-center wide:h-full xl:taller-than-854:h-auto"
        {...handlers}
      >
        {/* Main image */}
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute z-40 h-full w-full"
              >
                <div
                  style={{ position: "relative", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}
                  className="h-full w-full backdrop-blur-lg"
                  onClick={(e) => {
                    if (zoomPercentage < 200 && e.detail === 2) {
                      setZoomPercentage(zoomPercentage + 25);
                    }
                  }}
                >
                  <TransformWrapper
                    minScale={1}
                    maxScale={5}
                    disablePadding={true}
                    wheel={{ step: 1 }}
                    pinch={{ disabled: true }}
                    doubleClick={{ step: 1 }}
                    onTransformed={(e) => {
                      if (e.state.scale <= 1.02) {
                        setZoomActive(false);
                        setShowMagnifier(true);
                      } else if (e.state.scale >= 1.02) {
                        setZoomActive(true);
                        setShowMagnifier(false);
                      }
                    }}
                  >
                    <Controls />
                    <TransformComponent>
                      {magEnabled ? (
                        <Image
                          src={currentImage.image}
                          width={navigation ? 1280 : 1920}
                          height={navigation ? 853 : 1280}
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,${toBase64(
                            shimmer(
                              navigation ? 1280 : 1920,
                              navigation ? 853 : 1280,
                            ),
                          )}`}
                          priority
                          alt="Next.js Conf image"
                          onLoadingComplete={() => {
                            setLoaded(true);
                            setZoomPercentage(100);
                          }}
                          id="image"
                          style={{
                            marginLeft: "auto",
                            marginRight: "auto",
                            cursor: magEnabled
                              ? showMagnifier
                                ? "none"
                                : "auto"
                              : "auto",
                          }}
                          onMouseEnter={(e) => {
                            const elem = e.currentTarget;
                            const { width, height } =
                              elem.getBoundingClientRect();
                            setSize([width, height]);
                            setShowMagnifier(true);
                          }}
                          onMouseMove={handleMouseMove}
                          onMouseLeave={() => {
                            setShowMagnifier(false);
                          }}
                      />) : 
                      <Image
                        src={currentImage.image}
                        width={navigation ? 1280 : 1920}
                        height={navigation ? 853 : 1280}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(
                            navigation ? 1280 : 1920,
                            navigation ? 853 : 1280,
                          ),
                        )}`}
                        priority
                        alt="Next.js Conf image"
                        onLoadingComplete={() => {
                          setLoaded(true);
                          setZoomPercentage(100);
                        }}
                        id="image"
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          cursor: magEnabled
                            ? showMagnifier
                              ? "none"
                              : "auto"
                            : "auto",
                        }}
                      />}
                    </TransformComponent>
                  </TransformWrapper>

                  {currentImage.status ? (
                    <div className="absolute left-14 top-7 z-50 flex cursor-pointer items-center justify-center overflow-hidden rounded-md transition delay-150 ease-in-out">
                      <Badge
                        className={`text-md mt-2 font-medium 
                      hover:opacity-90
                      ${
                        currentImage.status.type
                          ? `${
                              gradingTypeDictionary[
                                currentImage.status
                                  .type as keyof typeof gradingTypeDictionary
                              ]?.classNames
                            }`
                          : null
                      }
                      ${
                        gradingColorDictionary[
                          currentImage.status
                            .msg as keyof typeof gradingColorDictionary
                        ]?.backgroundColor
                      } ${
                          gradingColorDictionary[
                            currentImage.status
                              .msg as keyof typeof gradingColorDictionary
                          ]?.textColor
                        }
                      pr-5 capitalize`}
                      >
                        <span className="mr-2">•</span>
                        {currentImage.status.msg}
                      </Badge>
                    </div>
                  ) : null}
                  {/* add magnifier if needed */}
                  {magEnabled ? (
                    <div
                      id="glass"
                      style={{
                        display: showMagnifier ? "" : "none",
                        position: "absolute",
                        pointerEvents: "none",
                        height: `${magnifierSize}px`,
                        width: `${magnifierSize}px`,
                        top: `${y - magnifierSize / 2}px`,
                        left: `${x - magnifierSize / 2}px`,
                        opacity: "1",
                        border: "4px solid #eee",
                        borderRadius: "50%",
                        cursor: "none !important",
                        backgroundColor: "transparent",
                        backgroundImage: `url('${currentImage.image}')`,
                        backgroundRepeat: "no-repeat",

                        backgroundSize: `${imgWidth * zoomLevel}px ${
                          imgHeight * zoomLevel
                        }px`,

                        backgroundPositionX: `${
                          -x * zoomLevel + magnifierSize / 2
                        }px`,
                        backgroundPositionY: `${
                          -y * zoomLevel + magnifierSize / 2
                        }px`,
                      }}
                    ></div>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons + bottom nav bar */}
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {/* Buttons */}
          {loaded && (
            <div className="relative aspect-[3/2] max-h-full w-full">
              {navigation && (
                <>
                  {index > 0 && (
                    <button
                      className="absolute left-3 top-[calc(50%-16px)] z-50 rounded-full bg-color-hover-badge p-3 text-white/75 backdrop-blur-lg transition hover:text-white focus:outline-none"
                      style={{ transform: "translate3d(0, 0, 0)" }}
                      onClick={() => changePhotoId(index - 1)}
                    >
                      <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                  )}
                  {index + 1 < imagesLength && (
                    <button
                      className="absolute right-3 top-[calc(50%-16px)] z-50 rounded-full bg-color-hover-badge p-3 text-white/75 backdrop-blur-lg transition hover:text-white focus:outline-none"
                      style={{ transform: "translate3d(0, 0, 0)" }}
                      onClick={() => changePhotoId(index + 1)}
                    >
                      <ChevronRightIcon className="h-6 w-6" />
                    </button>
                  )}
                </>
              )}
              <div className="absolute right-0 top-5 z-50 flex items-center gap-2 p-3 text-white">
                {navigation ? (
                  <a
                    href={currentImage.image}
                    className="rounded-full bg-color-hover-badge p-2 text-white/75 backdrop-blur-lg transition hover:text-white"
                    target="_blank"
                    title="Open fullsize version"
                    rel="noreferrer"
                  >
                    <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                  </a>
                ) : (
                  <a
                    href={`https://twitter.com/intent/tweet?text=Check%20out%20this%20pic%20from%20Next.js%20Conf!%0A%0Ahttps://nextjsconf-pics.vercel.app/p/${index}`}
                    className="rounded-full bg-color-hover-badge p-2 text-white/75 backdrop-blur-lg transition hover:text-white"
                    target="_blank"
                    title="Open fullsize version"
                    rel="noreferrer"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                <button
                  onClick={() =>
                    downloadPhoto(currentImage.image, `${index}.jpg`)
                  }
                  className="rounded-full bg-color-hover-badge p-2 text-white/75 backdrop-blur-lg transition hover:text-white"
                  title="Download fullsize version"
                >
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute left-0 top-5 z-50 flex items-center gap-2 p-3 text-white">
                <button
                  onClick={() => closeModal()}
                  className="rounded-full bg-color-hover-badge p-2 text-white/75 backdrop-blur-lg transition hover:text-white"
                >
                  {navigation ? (
                    <XMarkIcon className="h-5 w-5" />
                  ) : (
                    <ArrowUturnLeftIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          )}
          {/* Bottom Nav bar */}
          {navigation && (
            <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-[rgba(0,0,0,0)_0%] to-from-[rgba(0,0,0,.6)_60%] short:hidden medium:z-30">
              <motion.div
                initial={false}
                className="mx-auto mb-6 mt-6 flex aspect-[3/2] h-14"
              >
                <AnimatePresence initial={false}>
                  {filteredImages?.map((i) => (
                    <motion.button
                      initial={{
                        width: "0%",
                        x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                      }}
                      animate={{
                        scale: i.id === index ? 1.25 : 1,
                        width: "100%",
                        x: `${Math.max(index * -100, 15 * -100)}%`,
                      }}
                      exit={{ width: "0%" }}
                      onClick={() => changePhotoId(i.id)}
                      key={i.id}
                      className={`
                        [&:nth-child(16)]:hidden
                        ${
                          i.id === index
                            ? "z-20 rounded-md shadow shadow-black/50"
                            : "z-10"
                        } ${i.id === 0 ? "rounded-l-md" : ""} ${
                        i.id === imagesLength - 1 ? "rounded-r-md" : ""
                      } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                    >
                      <Image
                        alt="small photos on the bottom"
                        width={180}
                        height={120}
                        className={`${
                          i.id === index
                            ? "brightness-110 hover:brightness-110"
                            : "brightness-50 contrast-125 hover:brightness-75"
                        } h-full transform object-cover transition`}
                        src={i.image}
                      />
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}
