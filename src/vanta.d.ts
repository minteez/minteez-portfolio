declare module "vanta/dist/vanta.waves.min" {
  import type * as THREE from "three";

  type WavesOptions = {
    el: HTMLElement;
    THREE: typeof THREE;
    mouseControls: boolean;
    touchControls: boolean;
    gyroControls: boolean;
    minHeight: number;
    minWidth: number;
    scale: number;
    scaleMobile: number;
    color: number;
    shininess: number;
    waveHeight: number;
    waveSpeed: number;
    zoom: number;
  };

  type VantaEffect = {
    destroy: () => void;
  };

  const WAVES: (options: WavesOptions) => VantaEffect;
  export default WAVES;
}