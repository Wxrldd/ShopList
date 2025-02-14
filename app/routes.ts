import { type RouteConfig, index, prefix, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("manage", "routes/manage.tsx"),

  ...prefix("item", [
    layout("layouts/ItemLayout.tsx", [
      // index(""),
      route("add", "routes/showAddForm.tsx"),
      route("list", "routes/showItems.tsx"),
      route("update/:id", "routes/showItemCard.tsx"),
    ]),
  ])
] satisfies RouteConfig;
