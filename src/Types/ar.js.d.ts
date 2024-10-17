declare module 'ar.js' {
    // Type definitions for ARJS classes, functions, and properties

    interface ARContextOptions {
        sourceTexture: HTMLVideoElement;
        patternRatio?: number;
        cameraParametersUrl?: string;
        detectionMode?: 'color' | 'mono';
        debug?: boolean;
    }

    export class ARContext {
        constructor(canvas: HTMLCanvasElement, options?: ARContextOptions);
        addMarker(markerId: string, options?: MarkerOptions): Marker;
        removeMarker(marker: Marker): void;
        process(): void;
        destroy(): void;
    }

    interface MarkerOptions {
        patternUrl?: string;
        width?: number;
        height?: number;
        border?: number;
        chroma?: string;
        threshold?: number;
        debug?: boolean;
    }

    export class Marker {
        constructor(markerId: string, options?: MarkerOptions);
        addObject(object: THREE.Object3D): void;
        removeObject(object: THREE.Object3D): void;
        addEventListener(event: string, callback: () => void): void;
        removeEventListener(event: string, callback: () => void): void;
        getPattern(): string;
        getMatrix(): number[];
    }

    // ... other declarations for ARJS modules
}