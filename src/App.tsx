import { Route, Routes } from 'react-router';
import './App.css';
import AppLayout from './component/layouts/AppLayout';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path='/product/:productId' element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
