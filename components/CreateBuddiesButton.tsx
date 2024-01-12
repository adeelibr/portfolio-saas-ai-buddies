import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";

function CreateBuddiesButton() {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const addBuddies = async () => {
    setLoading(true);

    await axios("/api/init/buddies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        toast({
          description: "Added buddies successfully",
          className: "bg-green-600 text-white",
        });

        router.refresh();
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Something went wrong adding buddies, try again!",
          variant: "destructive",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Button
      variant="premium"
      size="sm"
      className="flex items-center gap-x-2"
      disabled={loading}
      onClick={addBuddies}
    >
      Create Buddies
      {loading ? <LoadingSpinner /> : <PlusIcon className="h-3 w-3" />}
    </Button>
  );
}

export default CreateBuddiesButton;
