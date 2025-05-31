
import { useLocation } from "react-router-dom";
type RouteInfo = {
    title: string;
}

type RouteMap = {
    [key: string]: RouteInfo;
}

export function usePageInfo(): RouteInfo {
    const location = useLocation();
    
    const routeInfo: RouteMap = {
        "/": { title: "Dashboard" },
        "/supporttickets": { title: "Support Tickets" },
        "/customers": { title: "Customers" },
        "/settings": { title: "Settings" }
    };
    
    return routeInfo[location.pathname] || { title: "Page Not Found" };
}
