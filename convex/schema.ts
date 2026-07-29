import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    // Clerk user ID (`user.subject`) of the document creator.
    ownerId: v.string(),
    // Liveblocks room ID for real-time collaboration (mirrors the document _id).
    roomId: v.optional(v.string()),
    // Clerk organization ID — present only for org-owned documents.
    organizationId: v.optional(v.string()),
  })
    .index("by_owner_id", ["ownerId"])
    .index("by_organization_id", ["organizationId"])
    // Full-text search scoped by owner or org so users only search their own docs.
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["ownerId", "organizationId"],
    }),
});
