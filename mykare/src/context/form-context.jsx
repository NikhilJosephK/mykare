"use client";

import { useState, createContext, useMemo } from "react";

export const PageTypeContext = createContext({});

export function PageTypeProvider({ children }) {
  const [pageType, setPageType] = useState("");

  const providerValues = useMemo(
    () => ({ pageType, setPageType }),
    [pageType, setPageType]
  );

  return (
    <PageTypeContext.Provider value={providerValues}>
      {children}
    </PageTypeContext.Provider>
  );
}
