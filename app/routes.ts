import { type RouteConfig, index, prefix, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("perso", [
    layout("layouts/PersoLayout.tsx", [
      // index(""),
      route("add", "routes/showAddForm.tsx"),
      route("list", "routes/showPersos.tsx"),
      route("update/:id", "routes/showPersoCard.tsx")
    ]),
  ])
] satisfies RouteConfig;
