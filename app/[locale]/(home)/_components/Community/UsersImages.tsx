"use client";
import { getUsersImages } from "@/services/getCommunityImages";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  userType: number;
}

const BOX = "w-[175px] h-[175px] rounded-2xl bg-gray-100 overflow-hidden";

export function UsersImages({ userType }: Props) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    let active = true;

    async function loadImages() {
      try {
        const response = await getUsersImages({ userType });
        if (active) setImages(response);
      } catch {
        if (active) setImages([]);
      }
    }

    loadImages();

    return () => {
      active = false;
    };
  }, [userType]);

  function removeImage(src: string) {
    setImages((current) => current.filter((image) => image !== src));
  }

  if (images.length === 0) {
    return <div className={BOX} aria-hidden />;
  }

  return (
    <div className={`${BOX} grid gap-[2px] ${gridClass(images.length)}`}>
      {images.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={`relative ${cellClass(images.length, index)}`}
        >
          <Image
            src={src}
            fill
            sizes="175px"
            className="object-cover"
            alt="Community member"
            onError={() => removeImage(src)}
          />
        </div>
      ))}
    </div>
  );
}

function gridClass(count: number): string {
  if (count <= 1) return "grid-cols-1 grid-rows-1";
  if (count === 2) return "grid-cols-2 grid-rows-1";
  return "grid-cols-2 grid-rows-2";
}

function cellClass(count: number, index: number): string {
  // With three photos, the first one fills the whole left column.
  if (count === 3 && index === 0) return "row-span-2";
  return "";
}
