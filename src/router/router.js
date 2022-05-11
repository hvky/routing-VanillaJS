class Router {
  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoute();
  }

  loadRoute(...urlSegs) {
    const matchedRoute = this._matchUrtToRoute(urlSegs);

    const url = `/${urlSegs.join("/")}`;
    history.pushState({}, "", url);

    const routerOutElem = document.querySelectorAll("[data-router]")[0];
    routerOutElem.innerHTML = matchedRoute.template;
  }

  _matchUrtToRoute(urlSegs) {
    const matchedRoute = this.routes.find((route) => {
      const routePathSegs = route.path.split("/").slice(1);

      if (routePathSegs.length !== urlSegs.length) {
        return false;
      }

      return routePathSegs
        .every((routePathSeg, i) => routePathSeg === urlSegs[i]);
    });

    return matchedRoute;
  }

  _loadInitialRoute() {
    const pathNameSplit = window.location.pathname.split("/");
    const pathSegs = pathNameSplit.length > 0 ? pathNameSplit.slice(1) : "";

    this.loadRoute(...pathSegs);
  }
}
