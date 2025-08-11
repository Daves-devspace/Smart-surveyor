// src/hooks/useProjects.ts
import { useState } from "react";
import * as projectsApi from "../api/projects";
import type { ProjectPayload, CreateProjectResult } from "../api/projects";

export function useCreateProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function create(data: ProjectPayload): Promise<CreateProjectResult> {
    try {
      setLoading(true);
      const res = await projectsApi.createProject(data);
      setLoading(false);
      return res; // Already the proper type
    } catch (err: unknown) {
      setLoading(false);

      // Narrow the error type safely
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as {
          response?: { data?: string };
          message?: string;
        };
        setError(axiosErr.response?.data ?? axiosErr.message ?? "Unknown error");
      } else {
        setError(String(err));
      }

      throw err;
    }
  }

  return { create, loading, error };
}
