import { createContext, useState } from "react";
import type { ItemI } from "../interfaces/Item.interface";

export const ItemContext = createContext<any>(null);

export default function ItemProvider({ children }: any) {
  const MIN: number = 1;
  const MAX: number = 10;

  let [item, setItem] = useState<ItemI>({
    id: undefined,
    name: undefined,
    quantity: 0,
    created_at: undefined,
  });

  let [categories, setCategories] = useState([
    {
      value: "fruit",
      name: "Fruit",
    },
    {
      value: "vegetable",
      name: "Légume",
    },
    {
      value: "dairy",
      name: "Produit laitier",
    },
    {
      value: "meat",
      name: "Viande",
    },
    {
      value: "bakery",
      name: "Boulangerie",
    },
  ]);

  let generateRandomIndex = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let getRandomIndex = Math.floor(Math.random() * (max - min + 1) + min);
    return getRandomIndex;
  };

  const randomQuantity = (category: string): void => {
    let range = {
      min: 0,
      max: 0,
    };

    switch (category) {
      case "fruit":
        range = {
          min: MIN,
          max: MIN + (MAX - MIN) / 2,
        };
        break;
      case "vegetable":
        range = {
          min: MIN + (MAX - MIN) / 3,
          max: MAX - (MAX - MIN) / 3,
        };
        break;
      case "dairy":
        range = {
          min: MIN + (MAX - MIN) / 4,
          max: MAX - (MAX - MIN) / 4,
        };
        break;
      case "meat":
        range = {
          min: MIN + (MAX - MIN) / 5,
          max: MAX,
        };
        break;
      case "bakery":
      default:
        range = {
          min: MIN,
          max: MAX - (MAX - MIN) / 5,
        };
        break;
    }
    console.table(range);
    setItem((item) => {
      item.quantity = generateRandomIndex(range.min, range.max);
      return item;
    });
  };

  return (
    <ItemContext.Provider
      value={{
        MIN,
        MAX,
        item,
        setItem,
        categories,
        setCategories,
        randomQuantity,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}
