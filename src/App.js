import {
  Redirect,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";

import AllQuote from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import PageNotFound from "./pages/PageNotFound";
import QuoteDetail from "./pages/QuoteDetail";

import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* in v5 we need exact for exactly matching the path but,
          in v6 it always looks for exact matches, but if you intentionally want that behaviour when multiple paths match the url you can use (/*) after the path  */}

          <Route path="/" element={<Navigate to="/quotes" replace />} />
          <Route path="/new-quote" element={<NewQuote />} />
          <Route path="/quotes" element={<AllQuote />} />
          <Route path="/quotes/:quoteId/*" element={<QuoteDetail />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
