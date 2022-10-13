import { useEffect } from "react";
import { useParams, Link, Route, Routes } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

export default function QuoteDetail() {
  const params = useParams();
  const quoteId = params.quoteId;
  // const quoteData = QUOTES.find((quote) => quote.id === quoteId);

  const {
    sendRequest,
    status,
    data: quoteData,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="focused centered">{error}</p>;
  }

  if (!quoteData.text) {
    return <p className="entered">No Quote Found</p>;
  }

  return (
    <>
      <HighlightedQuote text={quoteData.text} author={quoteData.author} />
      <Routes>
        <Route
          path=""
          element={
            <div className="centered">
              <Link
                // onClick={() => {
                //   navigate("comments");
                // }}
                to="comments"
                className="btn--flat"
              >
                Load Comments
              </Link>
            </div>
          }
        />
        <Route path="comments" element={<Comments />} />
      </Routes>
    </>
  );
}
