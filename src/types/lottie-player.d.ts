declare interface LottiePlayerElement extends HTMLElement {
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (value: number) => void;
  getLottie: () => any;
}

declare global {
  interface HTMLElementTagNameMap {
    'lottie-player': LottiePlayerElement;
  }
}

export type { LottiePlayerElement }; 