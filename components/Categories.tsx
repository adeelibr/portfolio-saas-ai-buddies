"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCollectionData } from "react-firebase-hooks/firestore";
import qs from "query-string";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "./LoadingSpinner";
import { Category, sortedCategoryRef } from "@/lib/converters/Category";

function Categories() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const { toast } = useToast();

  // const addCategories = async () => {
  //   setLoading(true);
  //   toast({
  //     title: "Adding categories",
  //     description: "Wait while we add your core categories ..",
  //   });

  //   await fetch("/api/init/post", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       toast({
  //         title: "Added successfully",
  //         description: "Categories have been added",
  //         className: "bg-green-600 text-white",
  //       });
  //       router.replace("/dashboard");
  //     })
  //     .catch((error) => {
  //       toast({
  //         title: "Error",
  //         description: "There was an error adding categories",
  //         variant: "destructive",
  //       });
  //     })
  //     .finally(() => setLoading(false));
  // };

  const [categories, loadingCategories, error] = useCollectionData<Category>(
    sortedCategoryRef()
  );

  const handleClick = (id: string | undefined) => {
    const query = {
      categoryId: id,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="w-full overflow-x-auto space-x-2 p-1">
      <div>
        {loadingCategories ? (
          <LoadingSpinner />
        ) : (
          <section className="flex flex-wrap gap-x-2">
            <Button
              variant="outline"
              className={cn(
                `
                flex 
                gap-x-2
                items-center
                text-center
                text-xs
                md:text-sm
                px-2
                md:px-4
                py-2
                md:py-3
                rounded-md
                bg-primary/10
                hover:opacity-95
                transition
            `,
                !categoryId ? "bg-primary/25" : "bg-primary/10"
              )}
              onClick={() => handleClick(undefined)}
            >
              Newest
            </Button>
            {categories?.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                className={cn(
                  `
                  flex 
                  gap-x-2
                  items-center
                  text-center
                  text-xs
                  md:text-sm
                  px-2
                  md:px-4
                  py-2
                  md:py-3
                  rounded-md
                  bg-primary/10
                  hover:opacity-95
                  transition
                `,
                  category.id === categoryId ? "bg-primary/25" : "bg-primary/10"
                )}
                onClick={() => handleClick(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default Categories;
