export const relativeRoutes = {
    clientError: {
        path: "/400",
    },
    serverError: {
        path: "/500",
    },
    forum: {
        path: "/forum",
    },
    topic: {
        path: "/forum/:id",
    },
    leaderBoard: {
        path: "/leader-board",
    },
    game: {
        path: "/play",
    },
    profile: {
        path: "/profile",
    },
    auth: {
        path: "/auth",
    },
    signIn: {
        path: "/sign-in",
        parent: "auth",
    },
    singUp: {
        path: "/sign-up",
        parent: "auth",
    },
    startPage: {
        path: "/main",
    },
};

type TRouteKeys = keyof typeof relativeRoutes;
type TRouteData = { path: string };
type TRelativeRouteData = (typeof relativeRoutes)[TRouteKeys];
type TRoutes = Record<TRouteKeys, TRouteData>;

const routes: TRoutes = {} as TRoutes;

const getRoute = (route: TRelativeRouteData): TRouteData | undefined => {
    if (!route) return;

    const parent = ("parent" in route ? route.parent : undefined) as TRouteKeys;
    const parentRoute = parent ? getRoute(relativeRoutes[parent]) : undefined;

    if (!parentRoute) return { path: route.path };
    return { path: parentRoute.path + route.path };
};

Object.entries(relativeRoutes).forEach(([key, route]) => {
    const routeKey = key as TRouteKeys;
    const preparedRoute = getRoute(route);

    if (!preparedRoute) return;
    routes[routeKey] = preparedRoute;
});

export { routes };
