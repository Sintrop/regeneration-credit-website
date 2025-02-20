'use client'

import { useEffect, useRef, useState } from "react";

interface Props{
    label: string;
    value: number;
    erc20?: boolean;
}
export function CardTokenInfo({label, value, erc20}: Props){
    const [displayValue, setDisplayValue] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting){
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.5
            }
        );

        if(cardRef.current){
            observer.observe(cardRef.current);
        };

        return () => {
            if(cardRef.current){
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(cardRef.current);
            };
        };
    }, []);

    useEffect(() => {
        if(!isVisible) return;
        if(value === 0) return;

        const start = 0;
        const end = value;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (timestamp: number) => {
            const progress = (timestamp - startTime) / duration;
            const currentValue = Math.min(start + (end - start) * progress, end);
            setDisplayValue(Math.floor(currentValue));

            if(progress < 1){
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [value, isVisible]);

    return(
        <div 
            className="px-10 py-4 rounded-[20px] bg-green-primary"
            ref={cardRef}
        >
            <p className="font-bold text-white text-2xl">
                {erc20 ? "ERC-20" : Intl.NumberFormat('pt-BR').format(displayValue)}
            </p>
            <p className="text-white">{label}</p>
        </div>
    )
}