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
    <div className="flex flex-wrap w-[182px] h-[175px] gap-0 rounded-2xl bg-gray-300 overflow-hidden">
      {images.map((item, index) => (
        <Image
          key={item}
          src={item}
          width={200}
          height={200}
          className="object-cover w-[86px] h-[86px] border border-white"
          alt={`image user ${index}`}
          quality={100}
        />
      ))}
    </div>
  );
}
