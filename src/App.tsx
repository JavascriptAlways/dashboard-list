import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard';
import List from './components/list';
import {Item} from "./components/interfaces.ts";

function App() {
  const [itemList, setItemList] = useState<Item[]>([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard itemList={itemList} />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );
}

export default App
