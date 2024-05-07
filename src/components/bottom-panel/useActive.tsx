import { matchPath, useLocation } from "react-router-dom";

export const useActive = (routes: string[]) => {
  const location = useLocation(); 
  return routes.some((route) => Boolean(matchPath(location.pathname, route)));
};
