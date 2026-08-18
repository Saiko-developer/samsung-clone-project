import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import CollectionPage from "./pages/CollectionPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="collection/:collectionName" element={<CollectionPage />} />
      </Route>
    </Routes>
  );
}

export default App;