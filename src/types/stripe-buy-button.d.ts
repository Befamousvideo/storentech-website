import type { DetailedHTMLProps, HTMLAttributes } from "react";

type StripeBuyButtonElement = DetailedHTMLProps<
  HTMLAttributes<HTMLElement> & {
    "buy-button-id": string;
    "publishable-key": string;
  },
  HTMLElement
>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-buy-button": StripeBuyButtonElement;
    }
  }
}

export {};
