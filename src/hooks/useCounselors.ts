import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Counselor } from "@/components/CounselorCard";

export const useCounselors = () => {
  return useQuery<Counselor[]>({
    queryKey: ["counselors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("counselors")
        .select("id, name, specialty, rating, sessions, avatar_url, available, bio")
        .order("rating", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};
