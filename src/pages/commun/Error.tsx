import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-8 text-center bg-white shadow-lg rounded-2xl">
        <AlertTriangle className="w-16 h-16 mx-auto text-red-500" />
        <h1 className="mt-4 text-2xl font-bold text-gray-800">Oups ! Une erreur est survenue</h1>
        <p className="mt-2 text-gray-600">La page que vous recherchez n'existe pas ou une erreur s'est produite.</p>
        <Link
          to="/"
          className="inline-block px-6 py-2 mt-4 font-semibold text-white transition rounded-lg shadow-md bg-primary hover:bg-primary-dark"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default Error;
