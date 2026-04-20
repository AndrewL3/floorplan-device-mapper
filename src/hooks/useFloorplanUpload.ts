import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "../store";

export function useFloorplanUpload() {
  const setFloorplan = useStore((s) => s.setFloorplan);
  const fitToView = useStore((s) => s.fitToView);
  const prevUrlRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

  const upload = useCallback(
    async (file: File, stageWidth: number, stageHeight: number) => {
      if (!file.type.startsWith("image/")) return;

      if (prevUrlRef.current) {
        URL.revokeObjectURL(prevUrlRef.current);
      }

      const objectUrl = URL.createObjectURL(file);
      prevUrlRef.current = objectUrl;

      const img = new window.Image();
      img.src = objectUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
      });

      setLoadedImage(img);
      setFloorplan({
        objectUrl,
        filename: file.name,
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
      fitToView(stageWidth, stageHeight);
    },
    [setFloorplan, fitToView],
  );

  useEffect(() => {
    return () => {
      if (prevUrlRef.current) {
        URL.revokeObjectURL(prevUrlRef.current);
      }
    };
  }, []);

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return { upload, openFilePicker, inputRef, loadedImage };
}
