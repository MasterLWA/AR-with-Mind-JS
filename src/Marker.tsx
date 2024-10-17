import React, { useEffect, useRef } from 'react';
import * as ARJS from 'ar.js';
import * as THREE from 'three';


const Marker = ({ arContext, markerId, model }: { arContext: ARJS.ARContext, markerId: string, model: THREE.Object3D }) => {
  const markerRef = useRef<ARJS.Marker | null>(null);

  useEffect(() => {
    const marker = arContext.addMarker(markerId);
    marker.addEventListener('markerFound', () => {
      console.log('Marker found:', markerId);
      marker.addObject(model);
    });
    marker.addEventListener('markerLost', () => {
      console.log('Marker lost:', markerId);
      marker.removeObject(model);
    });
    markerRef.current = marker;

    return () => {
      if (markerRef.current) {
        console.log('Removing marker:', markerId);
        arContext.removeMarker(markerRef.current);
      }
    };
  }, [arContext, markerId, model]);

  return null;
};

export default Marker;

