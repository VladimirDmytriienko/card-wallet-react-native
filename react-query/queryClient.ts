import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,

    },
  },
});

export const initReactQueryPersist = async () => {
  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  persistQueryClient({
    queryClient,
    persister: asyncStoragePersister,
    // maxAge: 1000 * 60 * 60 * 24, // 24 часа
  });
};
