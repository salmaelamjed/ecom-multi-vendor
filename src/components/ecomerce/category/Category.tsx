import { Link } from "react-router-dom";

interface IProps {
  title: string;
  prefix: string;
  img?: string;
}

const Category = ({ title, prefix }: IProps) => {
  return (
    <Link to={`/categories/products/${prefix}`}>
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
};

export default Category;