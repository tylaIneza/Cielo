"use client";

import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

interface PostProcessingProps {
  /** Reduce quality on mobile */
  mobile?: boolean;
  bloomIntensity?: number;
  bloomThreshold?: number;
  vignetteDarkness?: number;
}

/**
 * Post-processing pipeline — Bloom for gold glow + Vignette for cinematic framing.
 * Must be placed inside a R3F Canvas.
 */
export function PostProcessing({
  mobile = false,
  bloomIntensity = 1.2,
  bloomThreshold = 0.4,
  vignetteDarkness = 0.55,
}: PostProcessingProps) {
  return (
    <EffectComposer multisampling={mobile ? 0 : 4}>
      <Bloom
        intensity={mobile ? bloomIntensity * 0.6 : bloomIntensity}
        luminanceThreshold={bloomThreshold}
        luminanceSmoothing={0.85}
        mipmapBlur
        blendFunction={BlendFunction.ADD}
      />
      <Vignette
        darkness={vignetteDarkness}
        offset={0.25}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
