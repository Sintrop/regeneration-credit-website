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
    let active = true;

    async function getImages() {
      try {
        const response = await getUsersImages({ userType });
        if (active) {
          setImages(response.filter(Boolean).slice(0, 4));
        }
      } catch {
        if (active) setImages([]);
      }
    }

    getImages();

    return () => {
      active = false;
    };
  }, [userType]);

  function handleImageError(src: string) {
    setImages((current) => current.filter((image) => image !== src));
  }

  if (images.length === 0) {
    return (
      <div className="w-[182px] h-[175px] rounded-2xl bg-gray-100" aria-hidden />
    );
  }

  return (
    <div className="grid grid-cols-2 w-[182px] h-[175px] rounded-2xl bg-gray-100 overflow-hidden">
      {images.map((src, index) => (
        <Image
          key={`${src}-${index}`}
          src={src}
          width={200}
          height={200}
          className="object-cover w-[91px] h-[87px] border border-white"
          alt="Community member"
          sizes="91px"
          onError={() => handleImageError(src)}
        />
      ))}
    </div>
  );
}
