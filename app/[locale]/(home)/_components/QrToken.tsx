"use client"

import { QRCode } from 'react-qrcode-logo';


export function QrToken() {
    return (
        <QRCode
            value="https://sequoia.sintrop.com/token/0xA2628da7B5C8B9921E52402438c320e03d191275"
            size={100}
            logoImage='https://sintrop.com/assets/token.png'
            logoWidth={30}
            logoHeight={30}
            logoPadding={1}
            logoPaddingStyle='circle'
            qrStyle='dots'
        />
    )
}