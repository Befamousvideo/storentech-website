export {};

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "vapi-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "public-key": string;
        "assistant-id": string;
        mode?: string;
        theme?: string;
        size?: string;
        position?: string;
        "accent-color"?: string;
        "cta-button-color"?: string;
        "cta-button-text-color"?: string;
        title?: string;
        "cta-title"?: string;
        "cta-subtitle"?: string;
      };
    }
  }
}
