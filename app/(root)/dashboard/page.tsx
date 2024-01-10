import { nextAuthOptions } from "@/auth";
import { getCompanionDocumentReferenceByCategoryIdOrCompanionName as getCompanionsQuery } from "@/lib/converters/Companion";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import Categories from "@/components/Categories";
import CompanionsList from "@/components/CompanionsList";
import SearchInput from "@/components/SearchInput";

interface DashboardProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const session = await getServerSession(nextAuthOptions);

  const companionsQuery = getCompanionsQuery(
    session?.user.id!,
    searchParams.categoryId,
    searchParams.name
  );

  const companions = (await getDocs(companionsQuery)).docs.map((doc) =>
    doc.data()
  );

  return (
    <main className="p-4 space-y-2">
      <SearchInput />
      <Categories />
      <CompanionsList companions={companions} />
    </main>
  );
}
