// src/api/projects.ts
import api from "./client";
import type { Geometry } from "geojson";
import type { AxiosResponse } from "axios";

/**
 * Minimal local types. Move to src/types/api.ts if you prefer a shared file.
 */
export type ProjectPayload = {
  name: string;
  plot_size_sqft?: number;
  number_of_plots?: number;
  shape_preference?: string;
  setback_percentage?: number;
  zoning?: string;
  boundary?: Geometry | null;
};

export type CreateProjectResult = {
  id?: string;
  data?: { id?: string };
};

/**
 * Create a new project
 */
export const createProject = async (payload: ProjectPayload): Promise<CreateProjectResult> => {
  const res = await api.post("/projects/", payload);
  // return server side shape (often res.data)
  return res.data;
};

/**
 * Trigger AI generation for a project.
 * Expect backend to return { task_id } or { remainder_sqft } or similar.
 */
export const generateLayout = async (
  projectId: string
): Promise<{ task_id?: string; remainder_sqft?: number; [key: string]: unknown }> => {
  const res = await api.post(`/projects/${projectId}/generate/`);
  return res.data;
};

/**
 * Upload a boundary file (multipart/form-data).
 * This endpoint path should match your DRF endpoint.
 *
 * Note:
 * - Use presigned uploads for large files in production. This is a simple server-upload approach.
 * - Return type is unknown because backend responses vary; refine it when you standardize the API.
 */
export const createBoundaryFile = async (
  projectId: string,
  formData: FormData
): Promise<unknown> => {
  const res: AxiosResponse<unknown> = await api.post(`/projects/${projectId}/boundary-files/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

/**
 * Optional default export if you prefer import projectsApi from "../api/projects"
 */
const projectsApi = {
  createProject,
  generateLayout,
  createBoundaryFile,
};

export default projectsApi;
