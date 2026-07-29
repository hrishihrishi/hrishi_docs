"use client";
// This client component acts as the main document shell.
// It receives a preloaded Convex query result, reads the actual document data,
// and composes the collaboration room, top navigation, toolbar, and editor UI.
import { Preloaded, usePreloadedQuery } from "convex/react";
import { Room } from "./room";
import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";
import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
};

/**
 * @param preloadedDocument - preloaded document query 
 * @returns JSX.Element
 * @description
 * - usePreloadedQuery - retrieves the data from the preloaded query(preloadedDocument)
 * - Room - provides room context for collaboration
 * - Navbar - displays document title and collaboration information
 * - Toolbar - provides tools for document editing
 * - Editor - displays and edits document content
 */
export const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);
  console.log("InsideSheet | document.tsx | document: ", document, " (fetched this using usePreloadedQuery)")
  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
          <Navbar data={document} />
          <Toolbar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
   );
};
