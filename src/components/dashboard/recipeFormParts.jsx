"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormField from "@/components/ui/FormField";
import { cn } from "@/lib/utils";

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const emptyIngredient = () => ({
  id: crypto.randomUUID(),
  qty: "",
  unit: "",
  name: "",
});

export const emptyStep = () => ({ id: crypto.randomUUID(), text: "", tip: "" });

// ─── Image drop-zone (add mode — empty dashed state) ─────────────────────────

export const ImageDropZone = ({ preview, onFileSelect, onRemove }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) onFileSelect(file);
    },
    [onFileSelect],
  );

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  if (preview) {
    return (
      <div className="relative w-full aspect-3/2 rounded-md overflow-hidden border border-border">
        <Image
          src={preview}
          alt="Recipe image preview"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 600px"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onRemove}
          aria-label="Remove image"
          className="absolute top-2 right-2 bg-card border border-border hover:bg-card text-muted-foreground hover:text-foreground"
        >
          <X className="size-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      aria-label="Upload recipe image"
      className={cn(
        "w-full aspect-3/2 flex flex-col items-center justify-center gap-3",
        "border-2 border-dashed rounded-md cursor-pointer transition-colors duration-150",
        dragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-muted-foreground/50 bg-muted/30",
      )}
    >
      <Upload
        className="size-6 text-muted-foreground/50 stroke-[1.25]"
        aria-hidden
      />
      <div className="text-center">
        <p className="text-[13px] font-sans text-muted-foreground">
          Drop an image here, or{" "}
          <span className="text-foreground font-medium">click to browse</span>
        </p>
        <p className="mt-1 text-[11px] font-sans text-muted-foreground/60 uppercase tracking-[0.06em]">
          JPG, PNG, WEBP — max 5 MB
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="sr-only"
        tabIndex={-1}
      />
    </div>
  );
};

// ─── Image drop-zone (edit mode — pre-populated with replace affordance) ──────

export const EditImageDropZone = ({
  existingUrl,
  preview,
  onFileSelect,
  onRemove,
}) => {
  const inputRef = useRef(null);
  const [replacing, setReplacing] = useState(false);
  const [dragging, setDragging] = useState(false);
  // Track whether the existing image has finished loading from its remote URL.
  // Starts false so the skeleton is visible immediately on mount; flips to true
  // in the Image onLoad callback. Resets to false if existingUrl changes (e.g.
  // navigating between edit pages without unmounting).
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelect(file);
        setReplacing(false);
      }
    },
    [onFileSelect],
  );

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      setReplacing(false);
    }
  };

  // New upload in progress — show the new preview with a remove button
  if (preview && preview !== existingUrl) {
    return (
      <div className="relative w-full aspect-3/2 rounded-md overflow-hidden border border-border">
        <Image
          src={preview}
          alt="New recipe image preview"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 600px"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onRemove}
          aria-label="Remove new image"
          className="absolute top-2 right-2 bg-card border border-border hover:bg-card text-muted-foreground hover:text-foreground"
        >
          <X className="size-3.5" />
        </Button>
      </div>
    );
  }

  // Replacing state — show the empty drop zone
  if (replacing) {
    return (
      <div className="flex flex-col gap-3">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          aria-label="Upload replacement image"
          className={cn(
            "w-full aspect-3/2 flex flex-col items-center justify-center gap-3",
            "border-2 border-dashed rounded-md cursor-pointer transition-colors duration-150",
            dragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-muted-foreground/50 bg-muted/30",
          )}
        >
          <Upload
            className="size-6 text-muted-foreground/50 stroke-[1.25]"
            aria-hidden
          />
          <div className="text-center">
            <p className="text-[13px] font-sans text-muted-foreground">
              Drop a new image, or{" "}
              <span className="text-foreground font-medium">
                click to browse
              </span>
            </p>
            <p className="mt-1 text-[11px] font-sans text-muted-foreground/60 uppercase tracking-[0.06em]">
              JPG, PNG, WEBP — max 5 MB
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="sr-only"
            tabIndex={-1}
          />
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setReplacing(false)}
          className="w-fit px-0 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-foreground hover:bg-transparent"
        >
          ← Keep existing image
        </Button>
      </div>
    );
  }

  // Default state — show existing image with a replace button overlay
  return (
    <div className="relative w-full aspect-3/2 rounded-md overflow-hidden border border-border group">
      {/* Skeleton — visible until the remote image has loaded */}
      {!imgLoaded && (
        <div
          className="absolute inset-0 bg-muted/60 animate-pulse"
          aria-hidden
        />
      )}
      <Image
        src={existingUrl}
        alt="Current recipe image"
        fill
        className={cn(
          "object-cover object-center transition-opacity duration-300",
          imgLoaded ? "opacity-100" : "opacity-0",
        )}
        sizes="(max-width: 768px) 100vw, 600px"
        onLoad={() => setImgLoaded(true)}
      />
      {/* Replace overlay — appears on hover, always visible on touch */}
      <button
        type="button"
        onClick={() => setReplacing(true)}
        aria-label="Replace image"
        className={cn(
          "absolute inset-0 flex items-end justify-end p-3",
          "bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-200",
        )}
      >
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5",
            "bg-card border border-border rounded-md",
            "text-[11px] uppercase tracking-[0.08em] font-medium font-sans text-muted-foreground",
            "opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0",
            "transition-all duration-200",
          )}
        >
          <Upload className="size-3" aria-hidden />
          Replace
        </span>
      </button>
    </div>
  );
};

// ─── Ingredients repeater ─────────────────────────────────────────────────────

export const IngredientsRepeater = ({ items, onChange }) => {
  const add = () => onChange([...items, emptyIngredient()]);
  const remove = (id) => onChange(items.filter((i) => i.id !== id));
  const update = (id, field, value) =>
    onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, idx) => (
        <div key={item.id} className="flex items-center gap-2">
          <Input
            id={`ing-qty-${item.id}`}
            value={item.qty}
            onChange={(e) => update(item.id, "qty", e.target.value)}
            placeholder="Qty"
            aria-label={`Ingredient ${idx + 1} quantity`}
            className="w-20 shrink-0"
          />
          <Input
            id={`ing-unit-${item.id}`}
            value={item.unit}
            onChange={(e) => update(item.id, "unit", e.target.value)}
            placeholder="Unit"
            aria-label={`Ingredient ${idx + 1} unit`}
            className="w-20 shrink-0"
          />
          <Input
            id={`ing-name-${item.id}`}
            value={item.name}
            onChange={(e) => update(item.id, "name", e.target.value)}
            placeholder="Ingredient name"
            aria-label={`Ingredient ${idx + 1} name`}
            className="flex-1 min-w-0"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => remove(item.id)}
            aria-label={`Remove ingredient ${idx + 1}`}
            disabled={items.length <= 1}
            className="shrink-0 text-muted-foreground/50 hover:text-destructive hover:bg-transparent"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={add}
        className="mt-1 w-fit gap-1.5 px-0 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-primary hover:bg-transparent"
      >
        <Plus className="size-3.5" />
        Add Ingredient
      </Button>
    </div>
  );
};

// ─── Steps repeater ───────────────────────────────────────────────────────────

export const StepsRepeater = ({ items, onChange }) => {
  const add = () => onChange([...items, emptyStep()]);
  const remove = (id) => onChange(items.filter((i) => i.id !== id));
  const update = (id, field, value) =>
    onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  return (
    <div className="flex flex-col gap-4">
      {items.map((step, idx) => (
        <div
          key={step.id}
          className="flex gap-3 p-4 border border-border rounded-md bg-muted/20"
        >
          <span className="shrink-0 font-mono text-[22px] leading-none text-muted-foreground/30 select-none pt-1.5">
            {String(idx + 1).padStart(2, "0")}
          </span>
          <div className="flex-1 flex flex-col gap-2">
            <Textarea
              id={`step-text-${step.id}`}
              value={step.text}
              onChange={(e) => update(step.id, "text", e.target.value)}
              placeholder="Describe this step…"
              aria-label={`Step ${idx + 1} instructions`}
              rows={3}
              className="resize-none"
            />
            <Input
              id={`step-tip-${step.id}`}
              value={step.tip}
              onChange={(e) => update(step.id, "tip", e.target.value)}
              placeholder="Chef's tip (optional)"
              aria-label={`Step ${idx + 1} tip`}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => remove(step.id)}
            aria-label={`Remove step ${idx + 1}`}
            disabled={items.length <= 1}
            className="shrink-0 self-start text-muted-foreground/50 hover:text-destructive hover:bg-transparent"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={add}
        className="mt-1 w-fit gap-1.5 px-0 text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-primary hover:bg-transparent"
      >
        <Plus className="size-3.5" />
        Add Step
      </Button>
    </div>
  );
};

// ─── Field wrapper ────────────────────────────────────────────────────────────

export const Field = ({ id, label, optional, children }) => (
  <FormField htmlFor={id} label={label} optional={optional}>
    {children}
  </FormField>
);

// ─── Constants ────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Vegetarian",
  "Quick Meals",
  "Snacks",
];

export const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
