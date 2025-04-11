import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
export type Card = {
  id: string
  data: string;
  type: string;
  timestamp: Date | string;
  name: string;
  notes?: string ;
  backgroundColor: string | string[];
};

export const useCards = () => {
  const queryClient = useQueryClient();

  const result = useQuery<Card[]>({
    queryKey: ['cards'],
      queryFn: () => Promise.resolve([]),
    staleTime: Infinity,
  });

  const addCard = useMutation<Card, Error, Card>({
    mutationFn: async (newCard) => newCard,
    onSuccess: (newCard) => {
      queryClient.setQueryData<Card[]>(['cards'], (oldData = []) => [...oldData, newCard]);
    },
  });
  const deleteCard = useMutation<void, Error, Date>({
    mutationFn: async () => {
      return Promise.resolve()
    },
    onSuccess: (_, timestampToDelete) => {
      queryClient.setQueryData<Card[]>(['cards'], (oldData = []) => {
        const updatedData = oldData.filter(
          (card) => card.timestamp !== timestampToDelete
        )
        return updatedData;
      })
      // queryClient.invalidateQueries({ queryKey: ['cards'] })
    },
  })
  const editCard = useMutation<void, Error, Card>({
    mutationFn: async () => { return Promise.resolve()},
    onSuccess: (_, updatedCardData) => {
      queryClient.setQueryData<Card[]>(['cards'], (oldData = []) => {
        return oldData.map(card =>
          card.id === updatedCardData.id ? updatedCardData : card 
        );
      });
    }
  });
  return {
    cards: result.data,
    isLoading: result.isLoading,
    addCard: addCard.mutate,
    deleteCard: deleteCard.mutate,
    editCard: editCard.mutate
  };
};
