// webcamjs.d.ts
declare module 'webcamjs' {
    export function start(constraints?: MediaStreamConstraints): Promise<MediaStream>;
    export function stop(): void;
    export function flip(): void;
    export function snap(): string;
    export function reset(): void;
    export function attach(element: string | HTMLElement): void;
    export function on(eventName: string, callback: (data: any) => void): void;
    export function off(eventName: string, callback: (data: any) => void): void;
    export function trigger(eventName: string, data: any): void;
    export function getCanvas(): HTMLCanvasElement;
    export function capture(): string;
    export function save(data: string, name: string): void;
    export function upload(data: string, url: string, callback: (code: number, text: string) => void): void;
    export function configure(params: any): void;
    export function setSWFLocation(url: string): void;

  export function set(arg0: { width: number; height: number; image_format: string; jpeg_quality: number; }, p0: () => void) {
    throw new Error('Function not implemented.');
  }
}