import { nextAuthOptions } from "@/auth";
import CompanionForm from "@/components/CompanionForm";
import { Category, sortedCategoryRef } from "@/lib/converters/Category";
import { getCompanionDocumentReferenceById } from "@/lib/converters/Companion";
import { getDoc, getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface CompanionByIdPageProps {
  params: {
    companionId: string;
  };
}

async function CompanionByIdPage({
  params: { companionId },
}: CompanionByIdPageProps) {
  // @todo check subscription
  const session = await getServerSession(nextAuthOptions);

  const companion = await getDoc(
    getCompanionDocumentReferenceById(session?.user.id!, companionId)
  ).then((doc) => doc.data());
  const categories = await getDocs(sortedCategoryRef()).then(({ docs }) =>
    docs.map((data) => data.data())
  );

  return (
    <div>
      <CompanionForm initialForm={companion} categories={categories} />
    </div>
  );
}

export default CompanionByIdPage;
