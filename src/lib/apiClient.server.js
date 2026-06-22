import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ─── Auth token (server-side) ─────────────────────────────────────────────────

const getToken = async () => {
  const reqHeaders = await headers();
  const response = await auth.api.getToken({ headers: reqHeaders });
  return response?.token ?? null;
};

// ─── Core request helper ──────────────────────────────────────────────────────

const request = async (method, path, body) => {
  const token = await getToken();

  const reqHeaders = { Authorization: `Bearer ${token}` };

  if (body !== undefined) reqHeaders["Content-Type"] = "application/json";

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: reqHeaders,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Request failed: ${method} ${path}`);
  }

  if (res.status === 204) return null;

  return res.json();
};

// ─── Recipes ──────────────────────────────────────────────────────────────────

export const getRecipesByUserId = (userId) =>
  request("GET", `/recipes/user/${userId}`);
export const getAllRecipes = (params = {}) => {
  const qs = new URLSearchParams();
  const allowed = [
    "q",
    "category",
    "cuisine",
    "difficulty",
    "isPremium",
    "isFeatured",
    "minPrice",
    "maxPrice",
    "maxPrepTime",
    "sort",
    "page",
    "limit",
  ];
  for (const key of allowed) {
    if (
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== ""
    ) {
      qs.set(key, String(params[key]));
    }
  }
  const query = qs.toString();
  return request("GET", `/recipes${query ? `?${query}` : ""}`);
};
export const getRecipeById = (id) => request("GET", `/recipes/${id}`);

// ─── Categories ───────────────────────────────────────────────────────────────

export const getAllRecipeCategories = () =>
  request("GET", "/recipes/categories");

// ─── Cuisines ─────────────────────────────────────────────────────────────────

export const getAllRecipeCuisines = () => request("GET", "/recipes/cuisines");

// ─── Likes ────────────────────────────────────────────────────────────────────

export const getLikeStatus = ({ userId, recipeId }) =>
  request("GET", `/likes/status?userId=${userId}&recipeId=${recipeId}`);

// ─── Favorites ────────────────────────────────────────────────────────────────

export const getFavoriteStatus = ({ userId, recipeId }) =>
  request("GET", `/favorites/status?userId=${userId}&recipeId=${recipeId}`);
export const getFavoritesByUserId = (userId) =>
  request("GET", `/favorites/user/${userId}`);

// ─── Reports ──────────────────────────────────────────────────────────────────

export const getReportStatus = ({ userId, recipeId }) =>
  request("GET", `/reports/status?userId=${userId}&recipeId=${recipeId}`);

// ─── Purchases ────────────────────────────────────────────────────────────────

export const makePurchase = (data) => request("POST", "/purchases", data);
export const getPurchaseStatus = ({ userId, recipeId }) =>
  request("GET", `/purchases/status?userId=${userId}&recipeId=${recipeId}`);
export const getPurchasesByUserId = (userId) =>
  request("GET", `/purchases/user/${userId}`);

// ─── Subscriptions ────────────────────────────────────────────────────────────

export const createSubscription = (data) =>
  request("POST", "/subscriptions", data);
