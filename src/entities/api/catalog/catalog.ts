import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/config/firebase/firebase";
import { collection, getDocs, query, where,addDoc,doc, getDoc } from "firebase/firestore";

export interface Resource {
  id: string;                
  category: string;          
  description: string;       
  fullDescription: string;   
  isOfficial: boolean;    
  tags: string[];           
  title: string;        
  trustLevel: string;        
  url: string;               
}

interface CatalogFilters {
  category?: string;   
  searchTerm?: string; 
}

export const getCatalog = createAsyncThunk<Resource[], CatalogFilters | undefined>(
  "catalog/getCatalog",
  async (filters) => {
    const colRef = collection(db, "resources");

    let q;
    if (filters?.category && filters.category !== "All") {
      q = query(colRef, where("category", "==", filters.category));
    } else {
      q = colRef; 
    }
    const snapshot = await getDocs(q);

    let resources: Resource[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Resource, "id">),
    }));

    if (filters?.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      resources = resources.filter(r => r.title.toLowerCase().includes(term));
    }

    return resources;
  }
);



export interface ResourceToAdd {
  category: string;
  description: string;
  fullDescription: string;
  isOfficial: boolean;
  tags: string[];
  title: string;
  trustLevel: number;
  url: string;
  trusted?: boolean | "unknown";
}

export async function saveResourceIfTrusted(resource: ResourceToAdd) {
  if (resource.trusted === true && resource.trustLevel >= 4) {
    try {
      const colRef = collection(db, "resources");
      await addDoc(colRef, resource);
      console.log("✅ Ресурс успешно добавлен");
    } catch (error) {
      console.error("❌ Ошибка при добавлении ресурса:", error);
    }
  } else {
    console.log("⛔️ Ресурс не добавлен: уровень доверия недостаточный или не trusted");
  }
}


export const getCatalogById = createAsyncThunk<Resource | null, string>(
  "catalog/fetchResourceById",
  async (id: string) => {
    try {
      const docRef = doc(db, "resources", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Resource;
      } else {
        console.warn("Resource not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching resource:", error);
      return null;
    }
  }
);


