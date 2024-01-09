import Categories from "@/components/Categories";
import SearchInput from "@/components/SearchInput";

export default function Dashboard() {
  return (
    <main className="p-4 space-y-2">
      <SearchInput />
      <Categories />
    </main>
  );
}
