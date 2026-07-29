"use client";
// This component creates the collaborative Liveblocks environment for a document.
// Behind the scenes, it does three important jobs:
// 1. It loads workspace users from Clerk so mention suggestions and presence can be resolved.
// 2. It configures Liveblocks with an authentication endpoint and room-specific callbacks.
// 3. It wraps the child UI in a RoomProvider and Suspense boundary so the editor only renders
//    once the collaboration layer is ready.
import { toast } from "sonner";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";
import { getUsers, getDocuments } from "./actions";
import { Id } from "../../../../convex/_generated/dataModel";

type User = { id: string; name: string; avatar: string; color: string; };

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUsers();
        setUsers(list);
      } catch(error) {
        console.log({
          error: error,
        });
        toast.error("Failed to fetch users");
      }
    },[],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  console.log("InsideRoom | room.tsx | users: ",users, "(note: )")
  console.log("current documentId: ",params.documentId)

  /**
   * @param throttle - broadcast limit 60fps
   * @param authEndpoint - async function that securely fetches authorization tokens from your backend (/api/liveblocks-auth), 
   * sending the current documentId so the server knows which document the user is trying to access.
   * @param resolveUsers - resolve users from Clerk (Takes a list of user IDs participating in the room and maps them to actual user objects from a local users array so cursors and avatars can display names/avatars.)
   * @param resolveMentionSuggestions - resolve mention suggestions from Clerk ( Takes the text typed after the @ symbol and returns a list of matching user IDs to show as suggestions in the mention menu.)
   * @param resolveRoomsInfo - resolve rooms info from Clerk (Takes a list of room IDs and returns information about each room, list of documents in it etc.)
   */
  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = params.documentId as string;

        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        });

        return await response.json();
      }}
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined
        )
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) => 
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
    >
      <RoomProvider 
        id={params.documentId as string} 
        initialStorage={{ leftMargin: LEFT_MARGIN_DEFAULT, rightMargin: RIGHT_MARGIN_DEFAULT }}
      >
        <ClientSideSuspense fallback={<FullscreenLoader label="Room loading..." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}