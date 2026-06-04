import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";
import { cx, getRandomColor, getUnit, hash } from "../../lib/utils";
import styles from "./avatar.module.css";

const DEFAULT_SIZE = 40;
const DEFAULT_FALLBACK_DELAY_MS = 500;

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  alt: string;
  fallbackDelayMs?: number;
  size?: number;
  src: string;
}

export const AvatarImpl = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(
    {
      children,
      src,
      alt,
      size = DEFAULT_SIZE,
      fallbackDelayMs = DEFAULT_FALLBACK_DELAY_MS,
      className,
      style,
      ...rest
    },
    ref
  ) {
    return (
      <AvatarPrimitive.Root
        className={cx(styles.root, className)}
        ref={ref}
        style={{
          ...style,
          ["--size" as string]: `${size}px`,
        }}
        {...rest}
      >
        <AvatarPrimitive.Image alt={alt} asChild={!!children} src={src}>
          {children}
        </AvatarPrimitive.Image>
        <AvatarPrimitive.Fallback asChild delayMs={fallbackDelayMs}>
          <Fallback>{alt}</Fallback>
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    );
  }
);

// const colors = ["#FFAD08", "#EDD75A", "#74B06F"];
const colors = ["#F6C750", "#E63525", "#050D4C", "#D4EBEE"];
// const colors = ["#F6C750", "#E63525", "#E87D58"];

function Fallback({
  children,
  size = DEFAULT_SIZE,
}: {
  children: string;
  size?: number;
  className?: string;
}) {
  const titleId = React.useId();
  const properties = generateColors(children, colors);

  const maskId = React.useId();
  const filterId = React.useId();

  return (
    <svg
      aria-describedby={titleId}
      fill="none"
      height={size}
      role="img"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
    >
      <mask
        height={size}
        id={maskId}
        maskUnits="userSpaceOnUse"
        width={size}
        x={0}
        y={0}
      >
        <rect fill="#FFFFFF" height={size} rx={size * 2} width={size} />
      </mask>
      <g mask={`url(#${maskId})`}>
        <rect fill={properties[0].color} height={size} width={size} />
        <path
          d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
          fill={properties[1].color}
          filter={`url(#${filterId})`}
          transform={`
            translate(${properties[1].translateX} ${properties[1].translateY})
            rotate(${properties[1].rotate} ${size / 2} ${size / 2})
            scale(${properties[1].scale})
          `}
        />
        <path
          d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
          fill={properties[2].color}
          filter={`url(#${filterId})`}
          style={{
            mixBlendMode: "overlay",
          }}
          transform={`
            translate(${properties[2].translateX} ${properties[2].translateY})
            rotate(${properties[2].rotate} ${size / 2} ${size / 2})
            scale(${properties[2].scale})
          `}
        />
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          id={filterId}
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur" stdDeviation={7} />
        </filter>
      </defs>
    </svg>
  );
}

export function generateColors(name: string, colors: string[]) {
  const numFromName = hash(name);
  const range = colors?.length;

  const elementsProperties = Array.from({ length: 3 }, (_, i) => ({
    color: getRandomColor(numFromName + i, colors, range),
    translateX: getUnit(numFromName * (i + 1), DEFAULT_SIZE / 10, 1),
    translateY: getUnit(numFromName * (i + 1), DEFAULT_SIZE / 10, 2),
    scale: 1.2 + getUnit(numFromName * (i + 1), DEFAULT_SIZE / 20) / 10,
    rotate: getUnit(numFromName * (i + 1), 360, 1),
  }));

  return elementsProperties;
}

export const Avatar = Object.assign(AvatarImpl, { Fallback });
