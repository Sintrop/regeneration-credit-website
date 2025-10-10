"use client";

import { QRCode } from "react-qrcode-logo";

export function QrToken() {
  return (
    <QRCode
      value={`${process.env.NEXT_PUBLIC_RCTOKEN_ADDRESS}`}
      size={130}
      logoImage={process.env.NEXT_PUBLIC_RCTOKEN_IMAGE_URL}
      logoWidth={30}
      logoHeight={30}
      logoPadding={1}
      logoPaddingStyle="circle"
      qrStyle="dots"
    />
  );
}
