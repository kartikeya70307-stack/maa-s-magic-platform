import { cn } from "@/lib/utils";

/**
 * The Maa's Magic emblem — hand-drawn as code:
 * mother's hands cradling a cream handi on a thali ring,
 * its steam rising into a heart, with a touch of magic sparkle.
 * 100% original vector artwork, crisp at every size.
 */
export function LogoMark({
  size = 44,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="Maa's Magic logo — maa ke haath mein handi, steam se dil"
      className={cn("shrink-0 drop-shadow-[0_6px_18px_rgba(87,43,9,0.4)]", className)}
    >
      {/* thali base + mehndi-dotted rim */}
      <circle cx="24" cy="24" r="23" fill="#2A1407" />
      <circle
        cx="24"
        cy="24"
        r="21.4"
        fill="none"
        stroke="#E0A45C"
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeDasharray="2.6 3.4"
      />

      {/* magic sparkles */}
      <path
        d="M36.6 6.6V9.8M35 8.2H38.2"
        stroke="#EFA921"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M11.2 5.8v2.5M9.95 7.05h2.5"
        stroke="#EFA921"
        strokeOpacity="0.85"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* steam curls */}
      <path
        d="M18.4 14.4C17.1 13.1 19.3 11.5 18 10"
        stroke="#F6E8CE"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M29.6 14.4C30.9 13.1 28.7 11.5 30 10"
        stroke="#F6E8CE"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* heart rising from the handi */}
      <path
        d="M24 18.6C19.3 14.8 16.7 12.3 18 9.5C19.1 7.2 22.5 7.2 24 10C25.5 7.2 28.9 7.2 30 9.5C31.3 12.3 28.7 14.8 24 18.6Z"
        fill="#D94E14"
      />

      {/* handi — clay pot */}
      <path
        d="M17 21.8C15.6 23.3 14.8 25.1 14.8 27.4C14.8 32.2 19 35.9 24 35.9C29 35.9 33.2 32.2 33.2 27.4C33.2 25.1 32.4 23.3 31 21.8H17Z"
        fill="#F6E8CE"
      />
      <ellipse cx="24" cy="21.4" rx="7" ry="2" fill="#F6E8CE" />
      <ellipse cx="24" cy="21.1" rx="5.4" ry="1.3" fill="#381B08" />
      <ellipse cx="24" cy="21" rx="2.7" ry="0.62" fill="#E8A13B" opacity="0.9" />

      {/* maa ke haath — cradling palms with bangles */}
      <path
        d="M9 31.2C11 36.4 16.4 40.8 24 40.8C31.6 40.8 37 36.4 39 31.2"
        stroke="#EFA921"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M20 39.5Q24 40.5 28 39.5"
        stroke="#EFA921"
        strokeOpacity="0.6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* bangles on the wrist */}
      <path
        d="M9.6 33L7.2 34.9M10.7 35.1L8.3 37"
        stroke="#D94E14"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* fingertips on the right palm */}
      <path
        d="M39.2 30.1C40 29.3 40.7 28.7 41.4 28.2"
        stroke="#EFA921"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
