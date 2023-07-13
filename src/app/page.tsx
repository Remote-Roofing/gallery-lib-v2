"use client"
import { Move } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import map from "../assets/map.png";
import { useLastViewedPhoto } from "@/utils/useLastViewedPhoto";
import data from "./components/mock";
import { Button } from "@/components/ui/button";


export default function HomePage() {

  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef: any = useRef<HTMLAnchorElement>(null);

  const images = data;

  return (
    <div className="flex flex-row w-full h-[540px] gap-3 relative max-xl:flex-col max-xl:h-auto">
      <div
        className="w-7/12 h-full bg-slate-100 rounded-md border-4 border-slate-300 dark:border-[#222222] dark:text-[#E1E1E1] overflow-hidden justify-center items-center flex relative max-xl:w-full max-xl:h-[500px]"
        key={images[0].id}
      >
        <Link
          key={images[0].id}
          href={`/?photoId=${images[0].id}`}
          as={`/p/${images[0].id}`}
          ref={
            images[0].id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null
          }
          shallow
          className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
        >
          <Image
            src={images[0].image}
            width={600}
            height={500}
            alt="Picture of the author"
            className="object-cover w-full h-[600px]"
          />
        </Link>

        {/* overlay part */}
        <div className="rounded-md h-[130px] w-[200px] overflow-hidden justify-center items-center flex absolute bottom-5 right-7 drop-shadow-md cursor-pointer transition ease-in-out delay-150 hover:border-4 hover:opacity-90">
          <Image
            src={map}
            alt="Picture of the author"
            className="object-cover w-[110%] h-[110%]"

          />
        </div>
      </div>
      <div className="w-5/12 h-full grid grid-rows-2 grid-cols-2 gap-3 relative max-xl:grid-cols-4 max-xl:grid-rows-1 max-xl:w-full">
        {images.slice(1, 5).map(i => (
          <Link
            key={i.id}
            href={`/?photoId=${i.id}`}
            as={`/p/${i.id}`}
            ref={i.id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
            shallow
            className="rounded-md border-4 border-slate-300 dark:border-[#222222] dark:text-[#E1E1E1] overflow-hidden justify-center items-center flex"
          >
            <Image
              src={i.image}
              alt="picture inspection"
              className="object-cover w-[110%] h-[110%]"
              style={{ transform: "translate3d(0, 0, 0)" }}
              width={720}
              height={480}
              sizes="(max-width: 640px) 100vw,
                            (max-width: 1280px) 50vw,
                            (max-width: 1536px) 33vw,
                            25vw"
            />
          </Link>
        ))}

        {/* overlay button */}
        <div className="rounded-md h-fit w-fit overflow-hidden justify-center items-center flex absolute bottom-5 right-5 drop-shadow-md cursor-pointer">
          <Link
            key={images[0].id}
            href={`/?photoId=${images[0].id}`}
            as={`/p/${images[0].id}`}
            ref={
              images[0].id === Number(lastViewedPhoto)
                ? lastViewedPhotoRef
                : null
            }
            shallow
          >
            <Button className="bg-white text-black text-md py-3 hover:bg-slate-50">
              <Move className="mr-3 h-5 w-5" /> view more
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
