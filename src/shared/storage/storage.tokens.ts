import { InjectionToken } from "@angular/core";
import { type IStorage } from "./storage.interface";

export const STORAGE_TOKEN = new InjectionToken<IStorage>("STORAGE_TOKEN");
export const CACHE_STORAGE_TOKEN = new InjectionToken<IStorage>("CACHE_STORAGE_TOKEN");
export const PERSISTENCE_STORAGE_TOKEN = new InjectionToken<IStorage>("PERSRISTENCE_STORAGE_TOKEN");