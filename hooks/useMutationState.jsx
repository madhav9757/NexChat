import { useMutation } from "convex/react";
import { useState } from "react";

export default function useMutationState(mutationToRun) {
  const [pending, setPending] = useState(false);
  const mutationFn = useMutation(mutationToRun);

  const mutate = async (payload) => {
    setPending(true);
    try {
      const res = await mutationFn(payload);
      return res;
    } catch (err) {
      throw err;
    } finally {
      setPending(false);
    }
  };

  return [mutate, pending];
}