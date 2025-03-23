import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "@/components/ecomerce";
import { useAppDispatch, useAppSelector } from "@/components/store/hooks";
import { actGetProductsByCatPrefix } from "@/components/store/products/productsSlice";
import Loading from "@/components/feedback/Loading/Loading";

const Products = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { loading, error, records } = useAppSelector((state) => state.products);

  useEffect(() => {
    let prefix: string = "";
    if (params.prefix && typeof params.prefix === "string") {
      prefix = params.prefix;
    }

    const controller = new AbortController();
    dispatch(actGetProductsByCatPrefix({ prefix, signal: controller.signal }));

    return () => {
      controller.abort();
    };
  }, [dispatch, params]);

  return (
    <Loading status={loading} error={error}>
      <div className="px-4 py-16 mx-auto sm:px-6 lg:px-8">
        {/* Titre ou description si nécessaire */}
        <h1 className="mb-8 text-2xl font-bold text-gray-900">Nos Produits</h1>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {records.map((record) => (
            <Product key={record.id} {...record} />
          ))}
        </div>
      </div>
    </Loading>
  );
};

export default Products;