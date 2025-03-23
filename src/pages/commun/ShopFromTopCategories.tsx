import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Heading from "@/components/shared/Heading/Heading";

const ShopFromTopCategories = () => {
  return (
    <section className="bg-white">
              <Heading title="Shop from top categories"/>
      <div className="max-w-screen-xl px-2 py-4 mx-auto sm:py-4 lg:px-6">
        <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
          {/* Première carte : Wines */}
          <div className="flex flex-col h-auto col-span-2 sm:col-span-1 md:col-span-2 bg-gray-50 md:h-full">
            <Card className="relative flex flex-col flex-grow px-4 pt-40 pb-4 overflow-hidden rounded-lg group">
              <img
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Wines"
                className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <CardHeader>
                <CardTitle className="absolute top-0 left-0 z-10 p-4 text-2xl font-medium text-white xs:text-xl md:text-3xl">
                  Wines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="mt-4">
                  <Link to="/wines">Shop Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Deuxième carte : Gin */}
          <div className="col-span-2 sm:col-span-1 md:col-span-2 bg-stone-50">
            <Card className="relative flex flex-col px-4 pt-40 pb-4 mb-4 overflow-hidden rounded-lg group">
              <img
                src="https://images.unsplash.com/photo-1504675099198-7023dd85f5a3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Gin"
                className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <CardHeader>
                <CardTitle className="absolute top-0 left-0 z-10 p-4 text-2xl font-medium text-white xs:text-xl md:text-3xl">
                  Gin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="mt-4">
                  <Link to="/gin">Shop Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Sous-cartes : Whiskey et Vodka */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-2">
              <Card className="relative flex flex-col px-4 pt-40 pb-4 overflow-hidden rounded-lg group">
                <img
                  src="https://images.unsplash.com/photo-1571104508999-893933ded431?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Whiskey"
                  className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <CardHeader>
                  <CardTitle className="absolute top-0 left-0 z-10 p-4 text-2xl font-medium text-white xs:text-xl md:text-3xl">
                    Whiskey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="mt-4">
                    <Link to="/whiskey">Shop Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="relative flex flex-col px-4 pt-40 pb-4 overflow-hidden rounded-lg group">
                <img
                  src="https://images.unsplash.com/photo-1626897505254-e0f811aa9bf7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Vodka"
                  className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                <CardHeader>
                  <CardTitle className="absolute top-0 left-0 z-10 p-4 text-2xl font-medium text-white xs:text-xl md:text-3xl">
                    Vodka
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="mt-4">
                    <Link to="/vodka">Shop Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Troisième carte : Brandy */}
          <div className="flex flex-col h-auto col-span-2 sm:col-span-1 md:col-span-1 bg-sky-50 md:h-full">
            <Card className="relative flex flex-col flex-grow px-4 pt-40 pb-4 overflow-hidden rounded-lg group">
              <img
                src="https://images.unsplash.com/photo-1693680501357-a342180f1946?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Brandy"
                className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
              <CardHeader>
                <CardTitle className="absolute top-0 left-0 z-10 p-4 text-2xl font-medium text-white xs:text-xl md:text-3xl">
                  Brandy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild variant="ghost" className="mt-4">
                  <Link to="/brandy">Shop Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopFromTopCategories;