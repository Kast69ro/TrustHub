import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:3001"; // 👈 порт Nest

export interface Resource {
  id: number;
  category: string;
  description: string;
  fullDescription: string;
  isOfficial: boolean;
  tags: string[];
  title: string;
  trustLevel: number;
  url: string;
  trusted: boolean;
}

interface CatalogFilters {
  category?: string;
  searchTerm?: string;
}

/* ============================
   📦 ПОЛУЧИТЬ ВЕСЬ КАТАЛОГ
============================ */
export const getCatalog = createAsyncThunk<Resource[], CatalogFilters | undefined>(
  "catalog/getCatalog",
  async (filters) => {
    const { data } = await axios.get<Resource[]>(`${API_BASE}/resources`);

    let resources = data;

    if (filters?.category && filters.category !== "All") {
      resources = resources.filter((r) => r.category === filters.category);
    }

    if (filters?.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      resources = resources.filter((r) =>
        r.title.toLowerCase().includes(term)
      );
    }

    return resources;
  }
);

/* ============================
   ➕ СОХРАНИТЬ РЕСУРС
============================ */
export interface ResourceToAdd {
  category: string;
  description: string;
  fullDescription: string;
  isOfficial: boolean;
  tags: string[];
  title: string;
  trustLevel: number;
  url: string;
  trusted: boolean;
}

export async function saveResourceIfTrusted(resource: ResourceToAdd) {
  if (resource.trusted === true && resource.trustLevel >= 4) {
    try {
      await axios.post(`${API_BASE}/resources`, resource);
      console.log("✅ Ресурс успешно добавлен в БД");
    } catch (error) {
      console.error("❌ Ошибка при добавлении ресурса:", error);
      throw error;
    }
  } else {
    console.log("⛔️ Ресурс не добавлен: уровень доверия недостаточный или не trusted");
  }
}

/* ============================
   🔎 ПОЛУЧИТЬ РЕСУРС ПО ID
============================ */
export const getCatalogById = createAsyncThunk<Resource | null, number>(
  "catalog/fetchResourceById",
  async (id: number) => {
    try {
      const { data } = await axios.get<Resource>(`${API_BASE}/resources/${id}`);
      return data;
    } catch (error) {
      console.error("Error fetching resource:", error);
      return null;
    }
  }
);
