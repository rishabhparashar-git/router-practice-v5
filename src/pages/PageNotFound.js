import NotFound from "../assets/404.png";
export default function PageNotFound() {
  return (
    <div className="centered">
      <img style={{ height: 500 }} src={NotFound} alt="page not found" />
    </div>
  );
}
