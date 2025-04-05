import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
type Card = {
  data: string;
  type: string;
  timestamp: Date;
  name?: string;
  notes?: string;
  backgroundColor?: string;
};

export const useCards = () => {
  const queryClient = useQueryClient();

  const result = useQuery<Card[]>({
    queryKey: ['cards'],
    queryFn: () => {
     return [] },
    initialData: [],
    staleTime: Infinity,
  // cacheTime: Infinity, 
  })
  
  const addCard = useMutation<Card, Error, Card>({
    mutationFn: async (newCard) => {

      return newCard; 
    },
    onSuccess: (newCard) => {
      queryClient.setQueryData<Card[]>(['cards'], (oldData = []) => [...oldData, newCard]);
    },
  });


  return {
    cards: result.data,
    isLoading: result.isLoading,
    addCard: addCard.mutate,
  }
}