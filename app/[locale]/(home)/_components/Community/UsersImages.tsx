"use client";
import { getUsersImages } from "@/services/getCommunityImages";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  userType: number;
}
export function UsersImages({ userType }: Props) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function getImages() {
      const response = await getUsersImages({ userType });
      setImages(response);
    }
    getImages();
  }, []);

  return (
    <div className="flex flex-col w-[182px] h-[175px] gap-0 rounded-2xl bg-gray-100 overflow-hidden">
      {images.length > 0 && (
        <>
          <div className="flex">
            <Image
              src={images[0]}
              width={200}
              height={200}
              className="object-cover w-[88px] h-[88px] border border-white"
              alt={`image user`}
              quality={100}
            />

            <Image
              src={images[1]}
              width={200}
              height={200}
              className="object-cover w-[88px] h-[88px] border border-white"
              alt={`image user`}
              quality={100}
            />
          </div>
          <div className="flex">
            <Image
              src={images[2]}
              width={200}
              height={200}
              className="object-cover w-[88px] h-[88px] border border-white"
              alt={`image user`}
              quality={100}
            />

            <Image
              src={images[3]}
              width={200}
              height={200}
              className="object-cover w-[88px] h-[88px] border border-white"
              alt={`image user`}
              quality={100}
            />
          </div>
        </>
      )}
    </div>
  );
}
