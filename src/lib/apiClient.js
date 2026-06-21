import { authClient } from "@/lib/auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ─── Auth token ───────────────────────────────────────────────────────────────

const getToken = async () => {
  const { data, error } = await authClient.token();
  if (error || !data) return null;
  return data.token;
};

// ─── Core request helper ──────────────────────────────────────────────────────

const request = async (method, path, body) => {
  // const token = await getToken();

  // const headers = { Authorization: `Bearer ${token}` };
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Request failed: ${method} ${path}`);
  }

  // 204 No Content — nothing to parse
  if (res.status === 204) return null;

  return res.json();
};

// ─── Recipes ──────────────────────────────────────────────────────────────────

export const createRecipe = (data) => request("POST", "/recipes", data);
export const getRecipesByUserId = (userId) =>
  request("GET", `/recipes/user/${userId}`);
export const updateRecipe = (recipeId, data) =>
  request("PATCH", `/recipes/${recipeId}`, data);
export const deleteRecipe = (recipeId) =>
  request("DELETE", `/recipes/${recipeId}`);
export const getAllRecipes = () => request("GET", "/recipes");
export const getRecipeById = (id) => request("GET", `/recipes/${id}`);

// ─── Categories ──────────────────────────────────────────────────────────────────

export const getAllRecipeCategories = () =>
  request("GET", "/recipes/categories");

// ─── Likes ──────────────────────────────────────────────────────────────────

export const likeRecipe = (data) => request("POST", "/likes", data);
export const unlikeRecipe = (data) => request("DELETE", "/likes", data);
export const getLikeStatus = ({ userId, recipeId }) =>
  request("GET", `/likes/status?userId=${userId}&recipeId=${recipeId}`);

// ─── Favorites ──────────────────────────────────────────────────────────────────

export const addToFavorites = (data) => request("POST", "/favorites", data);
export const removeFromFavorites = (data) =>
  request("DELETE", "/favorites", data);
export const getFavoriteStatus = ({ userId, recipeId }) =>
  request("GET", `/favorites/status?userId=${userId}&recipeId=${recipeId}`);

// ─── Reports ──────────────────────────────────────────────────────────────────

export const createReport = (data) => request("POST", "/reports", data);
export const getReportStatus = ({ userId, recipeId }) =>
  request("GET", `/reports/status?userId=${userId}&recipeId=${recipeId}`);

// ─── Purchases ────────────────────────────────────────────────────────────────

export const getPurchaseStatus = ({ userId, recipeId }) =>
  request("GET", `/purchases/status?userId=${userId}&recipeId=${recipeId}`);
