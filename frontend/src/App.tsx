import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/login/*" element={<Login />} />
        <Route path="/dashboard/admin" element={<Dashboard param="Admin" />} />
        <Route path="/dashboard/brand" element={<Dashboard param="Brand" />} />
        <Route path="/dashboard/store" element={<Dashboard param="Store" />} />
        <Route
          path="/dashboard/:employeeNum"
          element={<Dashboard param="Employee" />}
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}
