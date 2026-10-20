import { useId, useState } from 'react';
import type { FoodImage } from './config';

export function FoodArt({ variant = 0 }: { variant?: number }) {
  const id = useId().replaceAll(':', '');
  const seeds = Array.from({ length: 65 }, (_, i) => ({
    x: 170 + ((i * 71 + variant * 23) % 280),
    y: 160 + ((i * 43 + variant * 17) % 180),
  }));
  return <svg viewBox="0 0 640 500" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id={id}><stop stopColor="#edc275"/><stop offset="1" stopColor="#a6642b"/></radialGradient>
      <clipPath id={`${id}clip`}><ellipse cx="320" cy="250" rx="176" ry="123"/></clipPath>
    </defs>
    <ellipse cx="325" cy="300" rx="240" ry="157" fill="#38251e" opacity=".12"/>
    <ellipse cx="320" cy="263" rx="234" ry="164" fill="#651c32"/>
    <ellipse cx="320" cy="251" rx="213" ry="146" fill="#fff5e6"/>
    <ellipse cx="320" cy="250" rx="181" ry="128" fill={`url(#${id})`} stroke="#8a532d" strokeWidth="6"/>
    <g clipPath={`url(#${id}clip)`}>
      {seeds.map((p, i) => <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${i * 37})`}>
        {i % 4 === 0 ? <path d="M-11 -7L13 -5L7 12L-10 8Z" fill="#c9362b" stroke="#9f3029" strokeWidth="2"/>
          : i % 4 === 1 ? <path d="M-12 -6Q0 13 13 -6" fill="none" stroke="#f5dfdc" strokeWidth="5"/>
          : i % 4 === 2 ? <path d="M-11 0L11 0M-4 7L12 7" stroke="#e8b637" strokeWidth="4" strokeLinecap="round"/>
          : <path d="M0 -8Q15 -4 3 9Q-12 2 0 -8" fill="#49743b"/>}
      </g>)}
    </g>
    <path d="M470 371Q553 370 565 301Q568 379 493 394Q469 397 470 371" fill="#c9362b"/>
    <path d="M565 301Q559 282 578 281" fill="none" stroke="#49743b" strokeWidth="7"/>
    <g fill="#d8a52b"><circle cx="105" cy="167" r="5"/><circle cx="526" cy="188" r="4"/><circle cx="147" cy="399" r="4"/></g>
  </svg>;
}

export function FoodMedia({ image, variant = 0, priority = false }: {
  image: FoodImage | null; variant?: number; priority?: boolean;
}) {
  const [failedSrc, setFailedSrc] = useState('');
  if (image && image.src !== failedSrc) return <img
    src={image.src} srcSet={image.srcSet} sizes="(max-width: 700px) 100vw, 50vw"
    alt={image.alt} width="960" height="750"
    loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}
    decoding="async" onError={() => setFailedSrc(image.src)}
  />;
  return <div className="food-art"><FoodArt variant={variant}/><span>Food concept illustration · not a photograph</span></div>;
}

export function Heritage() {
  return <svg className="heritage" viewBox="0 0 680 310" aria-hidden="true" focusable="false">
    <circle cx="345" cy="172" r="125" fill="#d8a52b"/>
    <g fill="none" stroke="#651c32" strokeWidth="7" strokeLinejoin="round">
      <path d="M65 290H615M113 290V180H200V143H265V98H405V143H477V184H564V290M265 143V290M405 143V290M200 180V290M477 184V290"/>
      <path d="M265 98V77H290V98M320 98V77H345V98M375 98V77H405V98M310 290V236Q335 206 360 236V290M335 77V12"/>
    </g><path d="M339 16Q370 9 393 25L339 49Z" fill="#c9362b"/>
    {[155,230,292,378,439,520].map((x, i) => <path key={x} d={`M${x} ${i > 1 && i < 4 ? 165 : 215}v24`} stroke="#651c32" strokeWidth="9"/>)}
  </svg>;
}
