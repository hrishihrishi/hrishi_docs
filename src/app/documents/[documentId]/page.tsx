// This server component resolves the current document route and prepares the
// document data before handing it to the interactive document UI.
// It authenticates the user with Clerk, requests a Convex token, and preloads
// the document query so the client component can consume it immediately.
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { Document } from "./document";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface DocumentIdPageProps {
  params: Promise<{ documentId: Id<"documents"> }>;
};

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  const { getToken } = await auth();
  const token = await getToken({ template: "convex" }) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    { id: documentId },
    { token }
  );
  // console.log("documentID : ", documentId, " | token : ", token)
  console.log(" - | page.tsx | preloadedDocument :", preloadedDocument)

  return <Document preloadedDocument={preloadedDocument} />;
}
 
export default DocumentIdPage;
