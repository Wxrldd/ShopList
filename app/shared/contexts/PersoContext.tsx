import { createContext, useState } from "react";
import type { PersoI } from "../interfaces/Perso.interface";

export const PersoContext = createContext<any>();

export default function PersoProvider({ children }: any) {
  const MIN: number = 10;
  const MAX: number = 25;

  let [perso, setPerso] = useState<PersoI>({
    id: undefined,
    pseudo: undefined,
    title: undefined,
    job: undefined,
    stats: {
      strength: 0,
      dexterity: 0,
      luck: 0,
      intelligence: 0,
      wisdom: 0,
    },
    creation_date: undefined,
  });

  let [jobs, setJobs] = useState([
    {
      value: "warrior",
      name: "Guerrier",
    },

    {
      value: "priest",
      name: "Prêtre",
    },
    {
      value: "noob",
      name: "Noob",
    },
    {
      value: "warlock",
      name: "Démoniste",
    },
    {
      value: "rogue",
      name: "Voleur",
    },
  ]);

  let generateRandomIndex = (min: number, max: number) => {
    min = Math.ceil(min);

    max = Math.floor(max);

    let getRandomIndex = Math.floor(
      Math.random() * (max - min + 1) + min
    );
    return getRandomIndex;
  };

  const randomStats = (classPerso: string): any => {
    let range = {
      min: 0,
      max: 0,
    };

    switch (classPerso) {
      case "warlock":
        range = {
          min: MIN + (MAX - MIN) / 3,
          max: MAX,
        };
        break;
      case "priest":
        range = {
          min: MIN + (MAX - MIN) / 5,
          max: MAX - (MAX - MIN) / 3,
        };
        break;
      case "warrior":
        range = {
          min: MIN + (MAX - MIN) / 1.5,
          max: MAX,
        };
        break;
      case "noob":
      default:
        range = {
          min: MIN,
          max: MAX - (MAX - MIN) / 1.5,
        };
        break;
    }
    console.table(range);
    setPerso((perso) => {
      perso.stats = {
        strength: generateRandomIndex(range.min, range.max),
        dexterity: generateRandomIndex(
          range.min,
          range.max
        ),
        luck: generateRandomIndex(range.min, range.max),
        intelligence: generateRandomIndex(
          range.min,
          range.max
        ),
        wisdom: generateRandomIndex(range.min, range.max),
      };
      return perso;
    });
  };

  return (
    <PersoContext.Provider
      value={{
        MIN,
        MAX,
        perso,
        setPerso,
        jobs,
        setJobs,
        randomStats,
      }}
    >
      {children}
    </PersoContext.Provider>
  );
}
