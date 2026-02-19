"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteTagButtonProps {
  tagId: string;
  tagName: string;
}

export function DeleteTagButton({ tagId, tagName }: DeleteTagButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${tagName}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/tags/${tagId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete tag");
      }
    } catch {
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-muted-foreground hover:text-destructive hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
