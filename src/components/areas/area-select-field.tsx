"use client";

import { useEffect, useState } from "react";
import { AdminField, AdminSelect } from "@/components/layout/admin-ui";
import { defaultAreaMaster } from "@/lib/areas";

type AreaOption = {
  code: string;
  name: string;
  isActive?: boolean;
};

type AreaSelectFieldProps = {
  defaultValue?: string;
  label?: string;
};

export function AreaSelectField({
  defaultValue,
  label = "Area code",
}: AreaSelectFieldProps) {
  const [areas, setAreas] = useState<AreaOption[]>(defaultAreaMaster);

  useEffect(() => {
    let isMounted = true;

    async function loadAreas() {
      try {
        const response = await fetch("/api/areas", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { areas?: AreaOption[] };

        if (isMounted && data.areas?.length) {
          setAreas(data.areas);
        }
      } catch {
        // Keep fallback list when API is unavailable.
      }
    }

    loadAreas();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AdminField label={label}>
      <AdminSelect defaultValue={defaultValue || areas[0]?.code}>
        {areas.map((area) => (
          <option key={area.code} value={area.code}>
            {area.code} • {area.name}
          </option>
        ))}
      </AdminSelect>
    </AdminField>
  );
}
