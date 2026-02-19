import { CategoryForm } from "@/components/Admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-8">Create New Category</h1>
      <CategoryForm />
    </div>
  );
}
