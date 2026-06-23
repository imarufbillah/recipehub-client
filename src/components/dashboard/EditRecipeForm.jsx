"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import uploadToImgbb from "@/lib/uploadToImgbb";
import {
  Field,
  EditImageDropZone,
  IngredientsRepeater,
  StepsRepeater,
  emptyIngredient,
  emptyStep,
  CATEGORIES,
  DIFFICULTIES,
} from "@/components/dashboard/recipeFormParts";
import { updateRecipe } from "@/lib/apiClient.client";

const EditRecipeForm = ({
  recipe,
  user,
  onSuccess,
  onCancel,
  backHref = "/dashboard/my-recipes",
}) => {
  // ── Form state seeded from existing recipe ──────────────────────────────────
  const [recipeName, setName] = useState(recipe.recipeName ?? "");
  const [description, setDescription] = useState(recipe.description ?? "");
  const [category, setCategory] = useState(recipe.category ?? "");
  const [cuisine, setCuisine] = useState(recipe.cuisine ?? "");
  const [difficulty, setDifficulty] = useState(recipe.difficulty ?? "");
  const [prepTime, setPrepTime] = useState(recipe.prepTime ?? "");
  const [servings, setServings] = useState(recipe.servings ?? "");
  const [isPremium, setIsPremium] = useState(recipe.isPremium ?? false);
  const [price, setPrice] = useState(recipe.price ?? "");

  // Image: track existing URL separately from any newly uploaded URL
  const [imagePreview, setImagePreview] = useState(null); // only set on new upload
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // new Imgbb URL after upload
  const [uploadError, setUploadError] = useState(null);

  // Seed ingredients/steps with local ids for repeater keys
  const [ingredients, setIngredients] = useState(
    recipe.ingredients?.length
      ? recipe.ingredients.map((i) => ({ id: crypto.randomUUID(), ...i }))
      : [emptyIngredient()],
  );
  const [steps, setSteps] = useState(
    recipe.steps?.length
      ? recipe.steps.map((s) => ({ id: crypto.randomUUID(), ...s }))
      : [emptyStep()],
  );

  // ── Unsaved changes tracking ─────────────────────────────────────────────────
  // A simple dirty flag — set to true the first time any field is changed.
  // Displayed as a small muted inline hint near the Save button.
  const [isDirty, setDirty] = useState(false);

  const markDirty = (setter) => (val) => {
    setter(val);
    setDirty(true);
  };

  // ── Transitions ──────────────────────────────────────────────────────────────
  const [isUploading, startUpload] = useTransition();
  const [isPending, startSubmit] = useTransition();
  const router = useRouter();

  // ── Image handlers ────────────────────────────────────────────────────────────
  const handleImageSelect = (file) => {
    setImagePreview(URL.createObjectURL(file));
    setImageFile(file);
    setImageUrl(null);
    setUploadError(null);
    setDirty(true);

    startUpload(async () => {
      try {
        const url = await uploadToImgbb(file);
        setImageUrl(url);
      } catch {
        setUploadError("Image upload failed. Please try again.");
        setImagePreview(null);
        setImageFile(null);
      }
    });
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageUrl(null);
    setUploadError(null);
    // Removing a new upload reverts to the existing image — not dirty for the image
  };

  // ── Submit ────────────────────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUploading || isPending) return;

    const cleanIngredients = ingredients.map(({ id: _, ...rest }) => rest);
    const cleanSteps = steps.map(({ id: _, ...rest }) => rest);

    const payload = {
      recipeName,
      description,
      category,
      cuisine,
      difficulty,
      prepTime,
      servings,
      isPremium,
      price,
      imageUrl: imageUrl ?? recipe.imageUrl ?? undefined,
      ingredients: cleanIngredients,
      steps: cleanSteps,
    };

    startSubmit(async () => {
      try {
        await updateRecipe(recipe._id, payload);
        if (onSuccess) {
          onSuccess(recipe._id, payload);
        } else {
          toast.success("Recipe updated.");
          router.push(backHref);
        }
      } catch (err) {
        toast.error(err?.message ?? "Could not save changes.");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-8 max-w-2xl"
    >
      {/* ── Basic info ── */}
      <section className="flex flex-col gap-5">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Basic Information
        </p>

        <Field id="recipe-name" label="Recipe Name">
          <Input
            id="recipe-name"
            value={recipeName}
            onChange={(e) => markDirty(setName)(e.target.value)}
            placeholder="e.g. Miso-Glazed Salmon with Sesame Greens"
            required
          />
        </Field>

        <Field id="recipe-description" label="Short Description" optional>
          <Textarea
            id="recipe-description"
            value={description}
            onChange={(e) => markDirty(setDescription)(e.target.value)}
            placeholder="A one or two sentence description of the recipe…"
            rows={3}
            className="resize-none"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field id="recipe-category" label="Category">
            <Select
              value={category}
              onValueChange={markDirty(setCategory)}
              required
            >
              <SelectTrigger id="recipe-category" className="w-full">
                <SelectValue placeholder="Select category…" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field id="recipe-cuisine" label="Cuisine">
            <Input
              id="recipe-cuisine"
              value={cuisine}
              onChange={(e) => markDirty(setCuisine)(e.target.value)}
              placeholder="e.g. Japanese, Italian…"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field id="recipe-difficulty" label="Difficulty">
            <Select value={difficulty} onValueChange={markDirty(setDifficulty)}>
              <SelectTrigger id="recipe-difficulty" className="w-full">
                <SelectValue placeholder="Select…" />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTIES.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field id="recipe-preptime" label="Prep Time (minutes)">
            <Input
              id="recipe-preptime"
              value={prepTime}
              onChange={(e) => markDirty(setPrepTime)(e.target.value)}
              placeholder="e.g. 45"
              type="number"
              min="1"
            />
          </Field>
          <Field id="recipe-servings" label="Servings">
            <Input
              id="recipe-servings"
              value={servings}
              onChange={(e) => markDirty(setServings)(e.target.value)}
              placeholder="e.g. 4"
              type="number"
              min="1"
            />
          </Field>
        </div>
      </section>

      {/* ── Image ── */}
      <section className="flex flex-col gap-5">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Recipe Photo
        </p>
        <Field id="recipe-image" label="Cover Image">
          <EditImageDropZone
            existingUrl={recipe.imageUrl}
            preview={imagePreview}
            onFileSelect={handleImageSelect}
            onRemove={handleImageRemove}
          />
          {isUploading && (
            <p className="mt-2 text-[12px] font-sans text-muted-foreground animate-pulse">
              Uploading image…
            </p>
          )}
          {uploadError && (
            <p className="mt-2 text-[12px] font-sans text-destructive">
              {uploadError}
            </p>
          )}
          {imageUrl && !isUploading && (
            <p className="mt-2 text-[12px] font-sans text-muted-foreground">
              New image ready.
            </p>
          )}
        </Field>
      </section>

      {/* ── Premium gating ── */}
      <section className="flex flex-col gap-5">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Access &amp; Pricing
        </p>
        <div className="flex items-center justify-between gap-4 py-3 px-4 border border-border rounded-md bg-muted/20">
          <div>
            <p className="text-[13px] font-sans font-medium text-foreground">
              Premium recipe
            </p>
            <p className="text-[12px] font-sans text-muted-foreground mt-0.5">
              Require a one-time purchase to view ingredients and steps.
            </p>
          </div>
          <Switch
            id="premium-toggle"
            checked={isPremium}
            onCheckedChange={markDirty(setIsPremium)}
            aria-label="Toggle premium recipe"
          />
        </div>
        {isPremium && (
          <Field id="recipe-price" label="Price (USD)">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] font-sans text-muted-foreground pointer-events-none z-10">
                $
              </span>
              <Input
                id="recipe-price"
                value={price}
                onChange={(e) => markDirty(setPrice)(e.target.value)}
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

      {/* ── Ingredients ── */}
      <section className="flex flex-col gap-5">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Ingredients
        </p>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.08em] text-muted-foreground/60 font-sans">
          <span className="w-20">Qty</span>
          <span className="w-20">Unit</span>
          <span className="flex-1">Name</span>
        </div>
        <IngredientsRepeater
          items={ingredients}
          onChange={(v) => {
            setIngredients(v);
            setDirty(true);
          }}
        />
      </section>

      {/* ── Instructions ── */}
      <section className="flex flex-col gap-5">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
          Instructions
        </p>
        <StepsRepeater
          items={steps}
          onChange={(v) => {
            setSteps(v);
            setDirty(true);
          }}
        />
      </section>

      {/* ── Footer: Cancel + Save Changes ── */}
      <div className="flex items-center justify-between gap-4 pt-2 border-t border-border">
        {/*
         * Unsaved changes indicator — appears once isDirty is true.
         * Muted-foreground caption style, no icon, no color emphasis.
         * Absence when clean keeps the footer quiet; presence when dirty
         * is the only visual hint — no persistent "all changes saved" state.
         */}
        <p
          className={cn(
            "text-[12px] font-sans transition-opacity duration-200 hidden sm:block",
            isDirty
              ? "text-muted-foreground opacity-100"
              : "opacity-0 pointer-events-none",
          )}
          aria-live="polite"
        >
          Unsaved changes
        </p>

        <div className="flex items-center gap-3 ml-auto">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => (onCancel ? onCancel() : router.push(backHref))}
            disabled={isPending}
            className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground hover:text-foreground hover:bg-transparent px-0"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={isUploading || isPending}
            className="px-8 font-sans text-[13px] font-medium"
          >
            {isUploading
              ? "Uploading image…"
              : isPending
                ? "Saving…"
                : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditRecipeForm;
