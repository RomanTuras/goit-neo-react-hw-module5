import { Link } from "react-router-dom";
import css from "./BackLink.module.css";

const BackLink = ({ to, children }) => {
  return <Link to={to} className={css.backLink}>⇽ {children}</Link>;
};

export default BackLink;
