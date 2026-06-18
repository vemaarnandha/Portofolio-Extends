import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Upload, X, AlertCircle, ImageIcon } from "lucide-react";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

interface ImageUploadFieldProps {
  value?: string | null;
  onChange: (file: File | null, previewUrl?: string) => void;
  error?: string;
}

export default function ImageUploadField({ value, onChange, error }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value ?? null);
  const [dragOver, setDragOver] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, []);

  useEffect(() => {
    setPreview(value ?? null);
  }, [value]);

  function validateFile(file: File): string | null {
    if (file.size > MAX_SIZE) {
      return `File terlalu besar (maks 10MB)`;
    }
    if (!ALLOWED_MIMES.includes(file.type)) {
      return "Tipe file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF";
    }
    return null;
  }

  function handleFile(file: File) {
    const err = validateFile(file);
    if (err) {
      setValidationError(err);
      return;
    }
    setValidationError("");
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onChange(file, objectUrl);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, []);

  function handleRemove() {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setValidationError("");
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const displayError = error || validationError;

  if (preview) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-heading tracking-wider text-arcane-300">
          Gambar Project <span className="text-blood-500">*</span>
        </label>
        <div className="relative rounded-lg border border-arcane-900/50 overflow-hidden bg-muted group">
          <img
            src={preview}
            alt="Preview"
            className="h-48 w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-1.5 rounded-md bg-arcane-500 px-3 py-1.5 text-xs font-medium text-void-950 hover:bg-arcane-400 transition-all"
            >
              <Upload className="h-3.5 w-3.5" />
              Ganti
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-1.5 rounded-md bg-blood-500/90 px-3 py-1.5 text-xs font-medium text-white hover:bg-blood-500 transition-all"
            >
              <X className="h-3.5 w-3.5" />
              Hapus
            </button>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleInputChange}
          className="hidden"
        />
        {displayError && (
          <div className="flex items-center gap-1.5 text-xs text-blood-500">
            <AlertCircle className="h-3 w-3" />
            {displayError}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-heading tracking-wider text-arcane-300">
        Gambar Project <span className="text-blood-500">*</span>
      </label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 transition-all duration-200",
          dragOver
            ? "border-arcane-500 bg-arcane-500/10 shadow-glow"
            : "border-arcane-900/50 bg-void-950 hover:border-arcane-700 hover:bg-arcane-900/20"
        )}
      >
        <div className="rounded-full bg-arcane-900/50 p-3">
          <ImageIcon className="h-6 w-6 text-arcane-400" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-arcane-300">
            Klik untuk upload atau drag & drop
          </p>
          <p className="mt-1 text-xs text-arcane-500">
            JPG, PNG, WebP, GIF (maks 10MB)
          </p>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleInputChange}
        className="hidden"
      />
      {displayError && (
        <div className="flex items-center gap-1.5 text-xs text-blood-500">
          <AlertCircle className="h-3 w-3" />
          {displayError}
        </div>
      )}
    </div>
  );
}
