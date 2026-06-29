import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AssetsPage } from "./pages/AssetsPage";
import { CartPage } from "./pages/CartPage";
import { DiagnosisPage } from "./pages/DiagnosisPage";
import { PlanPage } from "./pages/PlanPage";
import { ReviewPage } from "./pages/ReviewPage";
import { SuccessPage } from "./pages/SuccessPage";

export function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/assets" element={<AssetsPage />} />
      <Route path="/diagnosis" element={<DiagnosisPage />} />
      <Route path="/plan" element={<PlanPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="*" element={<Navigate to="/cart" replace />} />
    </Routes>
  );
}
