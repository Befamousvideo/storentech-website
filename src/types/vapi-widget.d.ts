export {};

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "vapi-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "public-key": string;
        "assistant-id"?: string;
        assistant?: string;
        "assistant-overrides"?: string;
        mode?: string;
        theme?: string;
        size?: string;
        radius?: string;
        position?: string;
        "base-color"?: string;
        "accent-color"?: string;
        "button-base-color"?: string;
        "button-accent-color"?: string;
        "cta-button-color"?: string;
        "cta-button-text-color"?: string;
        title?: string;
        "main-label"?: string;
        "cta-title"?: string;
        "cta-subtitle"?: string;
        "start-button-text"?: string;
        "end-button-text"?: string;
        "empty-voice-message"?: string;
        "empty-chat-message"?: string;
        "require-consent"?: string;
        "terms-content"?: string;
        "local-storage-key"?: string;
        "show-transcript"?: string;
      };
    }
  }
}
