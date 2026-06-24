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
import uploadToImgbb from "@/lib/uploadToImgbb";
import { createRecipe } from "@/lib/apiClient.client";
import {
  Field,
  ImageDropZone,
  IngredientsRepeater,
  StepsRepeater,
  emptyIngredient,
  emptyStep,
  CATEGORIES,
  DIFFICULTIES,
} from "@/components/dashboard/recipeFormParts";

const RecipeForm = ({ user, initialData }) => {
  const [recipeName, setName] = useState(initialData?.recipeName ?? "");
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
  const [imagePreview, setImagePreview] = useState(
    initialData?.imageUrl ?? null,
  );
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? null);
  const [ingredients, setIngredients] = useState(
    initialData?.ingredients?.length
      ? initialData.ingredients.map((i) => ({ id: crypto.randomUUID(), ...i }))
      : [emptyIngredient()],
  );
  const [steps, setSteps] = useState(
    initialData?.steps?.length
      ? initialData.steps.map((s) => ({ id: crypto.randomUUID(), ...s }))
      : [emptyStep()],
  );
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, startUpload] = useTransition();
  const [isPending, startSubmit] = useTransition();

  const router = useRouter();

  const handleImageSelect = (file) => {
    setImagePreview(URL.createObjectURL(file));
    setImageFile(file);
    setImageUrl(null);
    setUploadError(null);

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
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setCuisine("");
    setDifficulty("");
    setPrepTime("");
    setServings("");
    setIsPremium(false);
    setPrice("");
    setImageFile(null);
    setImagePreview(null);
    setImageUrl(null);
    setUploadError(null);
    setIngredients([emptyIngredient()]);
    setSteps([emptyStep()]);
  };

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
      imageUrl,
      ingredients: cleanIngredients,
      steps: cleanSteps,
      userId: user.id,
      author: user.name,
    };

    startSubmit(async () => {
      try {
        toast.promise(await createRecipe(payload), {
          loading: "Publishing recipe…",
          success: "Recipe published.",
          error: (err) => err?.message ?? "Something went wrong.",
        });
        resetForm();
        router.push("/dashboard/my-recipes");
      } catch {
        // Error already surfaced by toast.promise above — no double-toast needed
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/*
       * Two-column grid on xl+ (dashboard has its own sidebar, so xl is the
       * right breakpoint to avoid cramping on smaller desktops).
       * lg gives a single column — each section still reads cleanly.
       * items-start so columns grow independently; no forced equal heights.
       */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-10 gap-y-8 items-start">
        {/* ══════════════════════════════════════════
            LEFT COLUMN — Identity & media
            Basic Info + Recipe Photo
        ══════════════════════════════════════════ */}
        <div className="flex flex-col gap-8">
          {/* ── Basic info ── */}
          <section className="flex flex-col gap-5">
            <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
              Basic Information
            </p>

            <Field id="recipe-name" label="Recipe Name">
              <Input
                id="recipe-name"
                value={recipeName}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Miso-Glazed Salmon with Sesame Greens"
                required
              />
            </Field>

            <Field id="recipe-description" label="Short Description" optional>
              <Textarea
                id="recipe-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A one or two sentence description of the recipe…"
                rows={3}
                className="resize-none"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field id="recipe-category" label="Category">
                <Select value={category} onValueChange={setCategory} required>
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
                  onChange={(e) => setCuisine(e.target.value)}
                  placeholder="e.g. Japanese, Italian…"
                />
              </Field>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Field id="recipe-difficulty" label="Difficulty">
                <Select value={difficulty} onValueChange={setDifficulty}>
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
              <Field id="recipe-preptime" label="Prep Time (min)">
                <Input
                  id="recipe-preptime"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  placeholder="e.g. 45"
                  type="number"
                  min="1"
                />
              </Field>
              <Field id="recipe-servings" label="Servings">
                <Input
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

          {/* ── Image ── */}
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
                  Image uploaded successfully.
                </p>
              )}
            </Field>
          </section>
        </div>

        {/* ══════════════════════════════════════════
            RIGHT COLUMN — Content & access control
            Access & Pricing + Ingredients + Instructions
        ══════════════════════════════════════════ */}
        <div className="flex flex-col gap-8">
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
                onCheckedChange={setIsPremium}
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
              onChange={setIngredients}
            />
          </section>

          {/* ── Instructions ── */}
          <section className="flex flex-col gap-5">
            <p className="text-[11px] uppercase tracking-[0.08em] font-medium text-muted-foreground font-sans pb-2 border-b border-border">
              Instructions
            </p>
            <StepsRepeater items={steps} onChange={setSteps} />
          </section>
        </div>
      </div>

      {/* ── Submit — full width, below both columns ── */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
        <p className="text-[12px] font-sans text-muted-foreground hidden sm:block">
          Your recipe will be visible to the community after publishing.
        </p>
        <Button
          type="submit"
          variant="default"
          size="lg"
          disabled={isUploading || isPending}
          className="w-full sm:w-auto px-8 font-sans text-[13px] font-medium shrink-0"
        >
          {isUploading
            ? "Uploading image…"
            : isPending
              ? "Publishing…"
              : "Publish Recipe"}
        </Button>
      </div>
    </form>
  );
};

export default RecipeForm;
