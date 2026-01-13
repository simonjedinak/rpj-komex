declare module 'fisheyegl' {
  interface FisheyeGLOptions {
    canvas?: HTMLCanvasElement;
    strength?: number;
    zoom?: number;
    center?: { x: number; y: number };
    width?: number;
    height?: number;
    model?: any;
    lens?: any;
    fov?: any;
    image?: string;
    selector?: string;
    vertexSrc?: string;
    fragmentSrc?: string;
    animate?: boolean;
  }

  class FisheyeGL {
    constructor(options: FisheyeGLOptions);
    draw(image: HTMLImageElement | HTMLCanvasElement): void;
    destroy(): void;
    run(animate?: boolean, callback?: () => void): void;
    getImage(format?: string): HTMLImageElement;
    setImage(imageUrl: string, callback?: () => void): void;
  }

  export default FisheyeGL;
}

declare module 'fisheyegl/dist/fisheyegl' {
  interface FisheyeGLOptions {
    canvas?: HTMLCanvasElement;
    selector?: string;
    width?: number;
    height?: number;
    image?: string;
    animate?: boolean;
    [key: string]: any;
  }

  function FisheyeGL(options: FisheyeGLOptions): any;
  export = FisheyeGL;
}

declare module 'fisheyegl/src/fisheyegl' {
  interface FisheyeGLOptions {
    canvas?: HTMLCanvasElement;
    selector?: string;
    width?: number;
    height?: number;
    image?: string;
    animate?: boolean;
    [key: string]: any;
  }

  function FisheyeGL(options: FisheyeGLOptions): any;
  export = FisheyeGL;
}
