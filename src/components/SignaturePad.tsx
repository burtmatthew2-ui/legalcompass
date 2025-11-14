import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface SignaturePadProps {
  onSave: (signatureData: string) => void;
  onCancel: () => void;
}

export const SignaturePad = ({ onSave, onCancel }: SignaturePadProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Configure drawing style
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setIsEmpty(false);

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  };

  const saveSignature = () => {
    if (isEmpty) {
      toast.error("Please provide your signature");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const signatureData = canvas.toDataURL("image/png");
    onSave(signatureData);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border-2 border-border rounded-lg bg-background overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-64 touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      <div className="flex justify-between gap-2">
        <Button variant="outline" onClick={clearSignature}>
          Clear
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={saveSignature}>
            Save Signature
          </Button>
        </div>
      </div>
    </div>
  );
};
