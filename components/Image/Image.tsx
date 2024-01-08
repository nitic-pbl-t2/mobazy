import NextImage from "next/image";
import type { ImageProps as NextImageProps } from "next/image";
import { forwardRef, ForwardRefExoticComponent } from "react";
// import { breakpoints } from "@/styles/tokens/breakpoints";

export const breakpoints = {
  mobile: {
    minWidth: 320,
    mediaQuery: "(min-width: 320px)",
  },
  tablet: {
    minWidth: 640,
    mediaQuery: "(min-width: 640px)",
  },
  desktop: {
    minWidth: 1024,
    mediaQuery: "(min-width: 1024px)",
  },
} as const satisfies Record<string, { minWidth: number; mediaQuery: string }>;

type ImageProps = Omit<NextImageProps, "sizes"> & {
  sizes?:
    | (Partial<Record<keyof typeof breakpoints, `${number}vw`>> & {
        default: `${number}vw`;
      })
    | `${number}vw`;
};

const generateSizes = (sizes: ImageProps["sizes"]): string => {
  if (!sizes) {
    return "100vw";
  }

  if (typeof sizes === "string") {
    return sizes;
  }

  return Object.entries(sizes)
    .map(([key, value]) => {
      if (key == "default") {
        return value;
      }

      const breakpoint = key as keyof typeof breakpoints;
      return `${breakpoints[breakpoint].mediaQuery} ${value}`;
    })
    .join(", ");
};

export const Image: ForwardRefExoticComponent<ImageProps> = forwardRef<
  HTMLImageElement | null,
  Omit<ImageProps, "ref">
>(({ sizes, ...props }, ref) => (
  <NextImage ref={ref} sizes={sizes && generateSizes(sizes)} {...props} />
));

Image.displayName = "Image";
