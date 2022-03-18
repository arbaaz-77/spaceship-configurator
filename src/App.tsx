import { useState } from "react";
import { Cart } from "./components/Cart";
import { Category, SimpleModuleProps, Options } from "./components/Options";

const App = () => {
  const [cart, setCart] = useState<SimpleModuleProps[]>([
    { category: Category.BasePrice, name: "", cost: 1000 },
  ]);

  const addToCart = (module: SimpleModuleProps) => {
    setCart([...cart.filter((m) => m.category !== module.category), module]);
  };

  return (
    <main className="app">
      <section className="configurator">
        <h1>Spaceship configurator</h1>
        <div className="categories">
          <Options
            title="Select color"
            modules={[
              {
                category: Category.Color,
                color: "white",
                name: "Snow",
                cost: 0,
              },
              {
                category: Category.Color,
                color: "#ff7a00",
                name: "Volcano",
                cost: 100,
              },
              {
                category: Category.Color,
                color: "#6be4ff",
                name: "Sky",
                cost: 100,
              },
            ]}
            categorySelect={addToCart}
          />
          <Options
            title="Select power"
            modules={[
              { category: Category.Power, name: "100 MW", cost: 0 },
              { category: Category.Power, name: "150 MW", cost: 200 },
              { category: Category.Power, name: "200 MW", cost: 500 },
            ]}
            categorySelect={addToCart}
          />
          <Options
            title="Warp drive"
            modules={[
              { category: Category.WarpDrive, name: "NO", cost: 0 },
              { category: Category.WarpDrive, name: "YES", cost: 1000 },
            ]}
            categorySelect={addToCart}
          />
          <Options
            title="Select option package"
            modules={[
              {
                category: Category.OptionPackage,
                name: "Basic",
                cost: 0,
                packageDetails: ["Air conditioning", "Cloth seats", "Fm radio"],
              },
              {
                category: Category.OptionPackage,
                name: "Sport",
                cost: 100,
                packageDetails: [
                  "Air conditioning",
                  "Cloth seats",
                  "Fm radio",
                  "Personal tech support",
                ],
              },
              {
                category: Category.OptionPackage,
                name: "Lux",
                cost: 500,
                packageDetails: [
                  "Air conditioning",
                  "Luxury seats",
                  "Fm radio",
                  "Chrome wheels",
                  "Window tint",
                  "Subwoofer",
                ],
              },
            ]}
            categorySelect={addToCart}
          />
        </div>
        <Cart cart={cart} />
      </section>
    </main>
  );
};

export default App;
