// Insert feedback into the database

import { supabase } from "@/lib/supabaseClient";

export const submitFeedback = async (feedback: string) => {
  const {} = await supabase
    .from("Pokemon_Feedback")
    .insert([{ Feedback: feedback }]);
};
