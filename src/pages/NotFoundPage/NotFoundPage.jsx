import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <p>Ooops, page was not found!</p>
      <Link to="/">Visit home page</Link>
    </div>
  );
};

export default NotFoundPage;
