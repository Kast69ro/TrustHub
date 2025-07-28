import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/config/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

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
