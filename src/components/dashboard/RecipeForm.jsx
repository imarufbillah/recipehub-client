"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * RecipeForm — Add / Edit recipe form. Client component.
 *
 * Design system Input Field pattern throughout:
 *  - Label positioned ABOVE each field in micro-label style (11px uppercase
 *    tracking-[0.08em]) — never floating inside.
 *  - Card or background fill, border token outline, radius-md.
 *  - Focus: 2px ring-ring outline, no colored glow.
 *
 * Special fields:
 *  - Image drop-zone: dashed border, muted icon + instruction text centered.
 *    On file select: shows preview thumbnail with a remove ×-button.
 *  - Ingredients: repeating rows { qty, unit, name } — ghost "+ Add Ingredient"
 *    button appends a row, each row has a ghost Trash2 icon to remove it.
 *  - Steps: repeating rows { text, tip? } — same pattern.
 *
 * Submit: primary button bottom-right on wider viewports, full-width on mobile.
 *
 * Props:
 *  initialData — optional pre-filled values for edit mode
 *  onSubmit    — (formData) => void
 *  mode        — "add" | "edit" (controls submit button label)
 */

// ─── Field primitives ─────────────────────────────────────────────────────────

const FieldLabel = ({ htmlFor, children, optional = false }) => (
  <label
    htmlFor={htmlFor}
    className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans"
  >
    {children}
    {optional && (
      <span className="normal-case tracking-normal text-muted-foreground/60 ml-1">
        (optional)
      </span>
    )}
  </label>
);

const TextInput = ({ id, className, ...props }) => (
  <input
    id={id}
    className={cn(
      "w-full h-9 px-3 bg-background border border-input rounded-md",
      "text-[14px] font-sans text-foreground placeholder:text-muted-foreground",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
      "transition-all duration-150",
      className,
    )}
    {...props}
  />
);

const SelectInput = ({ id, children, className, ...props }) => (
  <select
    id={id}
    className={cn(
      "w-full h-9 px-3 bg-background border border-input rounded-md",
      "text-[14px] font-sans text-foreground",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
      "transition-all duration-150 appearance-none cursor-pointer",
      className,
    )}
    {...props}
  >
    {children}
  </select>
);

const TextareaInput = ({ id, className, ...props }) => (
  <textarea
    id={id}
    className={cn(
      "w-full px-3 py-2.5 bg-background border border-input rounded-md",
      "text-[14px] font-sans text-foreground placeholder:text-muted-foreground",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring",
      "transition-all duration-150 resize-none",
      className,
    )}
    {...props}
  />
);

// ─── Image drop-zone ──────────────────────────────────────────────────────────

const ImageDropZone = ({ preview, onFileSelect, onRemove }) => {
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
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove image"
          className={cn(
            "absolute top-2 right-2 size-7 flex items-center justify-center",
            "bg-card border border-border rounded-md",
            "text-muted-foreground hover:text-foreground",
            "transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <X className="size-3.5" />
        </button>
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
        "border-2 border-dashed rounded-md cursor-pointer",
        "transition-colors duration-150",
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

// ─── Ingredients repeater ─────────────────────────────────────────────────────

const emptyIngredient = () => ({
  id: crypto.randomUUID(),
  qty: "",
  unit: "",
  name: "",
});

const IngredientsRepeater = ({ items, onChange }) => {
  const add = () => onChange([...items, emptyIngredient()]);
  const remove = (id) => onChange(items.filter((i) => i.id !== id));
  const update = (id, field, value) =>
    onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, idx) => (
        <div key={item.id} className="flex items-center gap-2">
          {/* Qty */}
          <TextInput
            id={`ing-qty-${item.id}`}
            value={item.qty}
            onChange={(e) => update(item.id, "qty", e.target.value)}
            placeholder="Qty"
            aria-label={`Ingredient ${idx + 1} quantity`}
            className="w-20 shrink-0"
          />
          {/* Unit */}
          <TextInput
            id={`ing-unit-${item.id}`}
            value={item.unit}
            onChange={(e) => update(item.id, "unit", e.target.value)}
            placeholder="Unit"
            aria-label={`Ingredient ${idx + 1} unit`}
            className="w-20 shrink-0"
          />
          {/* Name */}
          <TextInput
            id={`ing-name-${item.id}`}
            value={item.name}
            onChange={(e) => update(item.id, "name", e.target.value)}
            placeholder="Ingredient name"
            aria-label={`Ingredient ${idx + 1} name`}
            className="flex-1 min-w-0"
          />
          {/* Remove */}
          <button
            type="button"
            onClick={() => remove(item.id)}
            aria-label={`Remove ingredient ${idx + 1}`}
            disabled={items.length <= 1}
            className={cn(
              "shrink-0 size-8 flex items-center justify-center rounded-md",
              "text-muted-foreground/50 hover:text-destructive",
              "transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:opacity-30 disabled:cursor-not-allowed",
            )}
          >
            <Trash2 className="size-3.5" />
          </button>
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

const emptyStep = () => ({ id: crypto.randomUUID(), text: "", tip: "" });

const StepsRepeater = ({ items, onChange }) => {
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
          {/* Step number — mono display texture */}
          <span className="shrink-0 font-mono text-[22px] leading-none text-muted-foreground/30 select-none pt-1.5">
            {String(idx + 1).padStart(2, "0")}
          </span>

          <div className="flex-1 flex flex-col gap-2">
            <TextareaInput
              id={`step-text-${step.id}`}
              value={step.text}
              onChange={(e) => update(step.id, "text", e.target.value)}
              placeholder="Describe this step…"
              aria-label={`Step ${idx + 1} instructions`}
              rows={3}
            />
            <TextInput
              id={`step-tip-${step.id}`}
              value={step.tip}
              onChange={(e) => update(step.id, "tip", e.target.value)}
              placeholder="Chef's tip (optional)"
              aria-label={`Step ${idx + 1} tip`}
            />
          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={() => remove(step.id)}
            aria-label={`Remove step ${idx + 1}`}
            disabled={items.length <= 1}
            className={cn(
              "shrink-0 size-8 flex items-center justify-center rounded-md self-start",
              "text-muted-foreground/50 hover:text-destructive",
              "transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:opacity-30 disabled:cursor-not-allowed",
            )}
          >
            <Trash2 className="size-3.5" />
          </button>
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

// ─── Main form ────────────────────────────────────────────────────────────────

// ─── Field wrapper — label-above + spacing, declared outside RecipeForm ──────
// Must live at module scope so React sees a stable component reference across
// renders. Defining it inside the render function causes the
// react-hooks/static-components error (component recreated every render).

const Field = ({ id, label, optional, children }) => (
  <div className="flex flex-col gap-1.5">
    <FieldLabel htmlFor={id} optional={optional}>
      {label}
    </FieldLabel>
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Vegetarian",
  "Quick Meals",
  "Snacks",
];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

const RecipeForm = ({ initialData, onSubmit, mode = "add" }) => {
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? "",
  );
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [cuisine, setCuisine] = useState(initialData?.cuisine ?? "");
  const [difficulty, setDifficulty] = useState(initialData?.difficulty ?? "");
  const [prepTime, setPrepTime] = useState(initialData?.prepTime ?? "");
  const [servings, setServings] = useState(initialData?.servings ?? "");
  const [isPremium, setIsPremium] = useState(initialData?.isPremium ?? false);
  const [price, setPrice] = useState(initialData?.price ?? "");
  const [imagePreview, setImagePreview] = useState(initialData?.image ?? null);
  const [imageFile, setImageFile] = useState(null);
  const [ingredients, setIngredients] = useState(
    initialData?.ingredients ?? [emptyIngredient()],
  );
  const [steps, setSteps] = useState(initialData?.steps ?? [emptyStep()]);

  const handleImageSelect = (file) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({
      name,
      description,
      category,
      cuisine,
      difficulty,
      prepTime,
      servings,
      isPremium,
      price,
      imageFile,
      ingredients,
      steps,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-8 max-w-2xl"
    >
      {/* ── Section: Basic info ── */}
      <section className="flex flex-col gap-5">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Basic Information
        </p>

        <Field id="recipe-name" label="Recipe Name">
          <TextInput
            id="recipe-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Miso-Glazed Salmon with Sesame Greens"
            required
          />
        </Field>

        <Field id="recipe-description" label="Short Description" optional>
          <TextareaInput
            id="recipe-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A one or two sentence description of the recipe…"
            rows={3}
          />
        </Field>

        {/* Two-column row: category + cuisine */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field id="recipe-category" label="Category">
            <SelectInput
              id="recipe-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select category…
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectInput>
          </Field>

          <Field id="recipe-cuisine" label="Cuisine">
            <TextInput
              id="recipe-cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="e.g. Japanese, Italian…"
            />
          </Field>
        </div>

        {/* Three-column row: difficulty + prep time + servings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field id="recipe-difficulty" label="Difficulty">
            <SelectInput
              id="recipe-difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="" disabled>
                Select…
              </option>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </SelectInput>
          </Field>

          <Field id="recipe-preptime" label="Prep Time">
            <TextInput
              id="recipe-preptime"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              placeholder="e.g. 45 min"
            />
          </Field>

          <Field id="recipe-servings" label="Servings">
            <TextInput
              id="recipe-servings"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              placeholder="e.g. 4"
              type="number"
              min="1"
            />
          </Field>
        </div>
      </section>

      {/* ── Section: Image ── */}
      <section className="flex flex-col gap-5">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Recipe Photo
        </p>

        <Field id="recipe-image" label="Cover Image">
          <ImageDropZone
            preview={imagePreview}
            onFileSelect={handleImageSelect}
            onRemove={handleImageRemove}
          />
        </Field>
      </section>

      {/* ── Section: Premium gating ── */}
      <section className="flex flex-col gap-5">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Access & Pricing
        </p>

        {/* Toggle row */}
        <div className="flex items-center justify-between gap-4 py-3 px-4 border border-border rounded-md bg-muted/20">
          <div>
            <p className="text-[13px] font-sans font-medium text-foreground">
              Premium recipe
            </p>
            <p className="text-[12px] font-sans text-muted-foreground mt-0.5">
              Require a one-time purchase to view ingredients and steps.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isPremium}
            onClick={() => setIsPremium((v) => !v)}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isPremium ? "bg-primary" : "bg-border",
            )}
          >
            <span
              className={cn(
                "inline-block size-4 rounded-full bg-card shadow-sm",
                "transition-transform duration-200",
                isPremium ? "translate-x-4" : "translate-x-0.5",
              )}
            />
          </button>
        </div>

        {isPremium && (
          <Field id="recipe-price" label="Price (USD)">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] font-sans text-muted-foreground pointer-events-none">
                $
              </span>
              <TextInput
                id="recipe-price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="4.99"
                type="number"
                min="0.99"
                step="0.01"
                className="pl-6"
              />
            </div>
          </Field>
        )}
      </section>

      {/* ── Section: Ingredients ── */}
      <section className="flex flex-col gap-5">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Ingredients
        </p>

        {/* Column header hint */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-muted-foreground/60 font-sans">
          <span className="w-20">Qty</span>
          <span className="w-20">Unit</span>
          <span className="flex-1">Name</span>
        </div>

        <IngredientsRepeater items={ingredients} onChange={setIngredients} />
      </section>

      {/* ── Section: Instructions ── */}
      <section className="flex flex-col gap-5">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Instructions
        </p>

        <StepsRepeater items={steps} onChange={setSteps} />
      </section>

      {/* ── Submit row ── */}
      <div className="flex items-center justify-between gap-4 pt-2 border-t border-border">
        <p className="text-[12px] font-sans text-muted-foreground hidden sm:block">
          {mode === "edit"
            ? "Changes are saved immediately after submission."
            : "Your recipe will be visible to the community after publishing."}
        </p>
        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full sm:w-auto px-8 font-sans text-[13px] font-medium shrink-0"
        >
          {mode === "edit" ? "Save Changes" : "Publish Recipe"}
        </Button>
      </div>
    </form>
  );
};

export default RecipeForm;
