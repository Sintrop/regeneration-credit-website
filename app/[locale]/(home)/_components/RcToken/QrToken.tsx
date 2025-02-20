"use client"

import { QRCode } from 'react-qrcode-logo';

export function QrToken() {
    return (
        <QRCode
            value={`${process.env.NEXT_PUBLIC_URL_EXPLORER}/token/${process.env.NEXT_PUBLIC_ADDRESS_RCTOKEN}`}
            size={100}
            logoImage={process.env.NEXT_PUBLIC_RCTOKEN_IMAGE_URL}
            logoWidth={30}
            logoHeight={30}
            logoPadding={1}
            logoPaddingStyle='circle'
            qrStyle='dots'
        />
    )
}