import type { ImageProps } from "@/types/inspection";
import getBase64ImageUrl from "@/utils/generateBlurPlaceholder";
import { notFound } from "next/navigation";
import Carousel from "../../components/carousel";
import data from "../../components/mock";

export default async function InspectionDetailsPage({
  params: { photoId },
}: {
  params: { photoId: string };
}) {
  const currentPhoto = await getInspectionPhoto(photoId);
  const index = Number(photoId);


  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} images={data} index={index} />
      </main>
    </>
  );
}

async function getInspectionPhoto(photoId: string) {
  const results = data;

  let reducedResults: ImageProps[] = [];
  let i = 0;
  for (let result of results) {
    reducedResults.push({
      id: i,
      height: "500",
      width: "500",
      image: result.image,
      status: result.status,
    });
    i++;
  }

  const currentPhoto = reducedResults.find(img => img.id === Number(photoId));
  if (!currentPhoto) {
    notFound();
  }
  console.log(currentPhoto);
  currentPhoto.image = await getBase64ImageUrl(currentPhoto);

  return currentPhoto;
}
