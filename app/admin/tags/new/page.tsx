import { TagForm } from "@/components/Admin/TagForm";

export default function NewTagPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Create New Tag</h1>
      <TagForm />
    </div>
  );
}
