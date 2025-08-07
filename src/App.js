import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadCollection, saveCollection } from './utils/localStorageUtils';
import DiscoveryPage from './pages/DiscoverPage.jsx';
import CollectionPage from './pages/CollectionPage.jsx';
import Header from './components/Header';
import './styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    setCollection(loadCollection());
  }, []);

  const addToCollection = (pokemon) => {
    if (!collection.some(p => p.id === pokemon.id)) {
      const updated = [...collection, pokemon];
      setCollection(updated);
      saveCollection(updated);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header collectionCount={collection.length} />
        <Routes>
          <Route path="/" element={<DiscoveryPage addToCollection={addToCollection} collection={collection} />} />
          <Route path="/collection" element={<CollectionPage collection={collection} setCollection={setCollection} />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
