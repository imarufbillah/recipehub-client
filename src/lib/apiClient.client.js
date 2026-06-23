"use client";

import { authClient } from "@/lib/auth-client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ─── Auth token (client-side) ─────────────────────────────────────────────────

const getToken = async () => {
  const { data, error } = await authClient.token();
  if (error || !data) return null;
  return data.token;
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

export const createRecipe = (data) => request("POST", "/recipes", data);
export const updateRecipe = (recipeId, data) =>
  request("PATCH", `/recipes/${recipeId}`, data);
export const deleteRecipe = (recipeId) =>
  request("DELETE", `/recipes/${recipeId}`);

// ─── Likes ────────────────────────────────────────────────────────────────────

export const likeRecipe = (data) => request("POST", "/likes", data);
export const unlikeRecipe = (data) => request("DELETE", "/likes", data);

// ─── Favorites ────────────────────────────────────────────────────────────────

export const addToFavorites = (data) => request("POST", "/favorites", data);
export const removeFromFavorites = (data) =>
  request("DELETE", "/favorites", data);

// ─── Reports ──────────────────────────────────────────────────────────────────

export const createReport = (data) => request("POST", "/reports", data);

// ─── Users ────────────────────────────────────────────────────────────────────

export const updateUser = (userId, data) =>
  request("PATCH", `/users/${userId}`, data);

// ─── Admin — user management ──────────────────────────────────────────────────

export const blockUser = (userId) => request("PATCH", `/users/block/${userId}`);
export const unblockUser = (userId) =>
  request("PATCH", `/users/unblock/${userId}`);
export const deleteUser = (userId) => request("DELETE", `/users/${userId}`);

// ─── Admin — report management ────────────────────────────────────────────────

export const deleteReport = (reportId) =>
  request("DELETE", `/reports/${reportId}`);
export const resolveReport = (reportId) =>
  request("PATCH", `/reports/${reportId}/resolve`);

// ─── Admin — recipe management ────────────────────────────────────────────────

export const toggleFeaturedRecipe = (recipeId, isFeatured) =>
  request("PATCH", `/recipes/feature/${recipeId}`, { isFeatured });
