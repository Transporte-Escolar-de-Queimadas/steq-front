import React, { createContext, useState, useContext, useCallback } from 'react';

const RoutesContext = createContext();

export function RoutesProvider({ children }) {
    const [routes, setRoutes] = useState([]);

    const saveRoute = useCallback((newRoute) => {
        setRoutes([...routes, newRoute]);
    }, [routes]);

    const updateRoute = useCallback((updatedRoute) => {
        const reqIndex = routes.findIndex(req => req.id === updatedRoute.id);
        const updatedRoutes = [...routes];
        updatedRoutes[reqIndex] = updatedRoute;
        setRoutes(updatedRoutes);
    }, [routes]);

    return (
        <RoutesContext.Provider value={{ routes, setRoutes, saveRoute, updateRoute }}>
            {children}
        </RoutesContext.Provider>
    )
}

export function useRoutes() {
    const context = useContext(RoutesContext);
    if (!context) throw new Error("error: no routes context")
    const { routes, setRoutes, saveRoute, updateRoute } = context;
    return { routes, setRoutes, saveRoute, updateRoute };
}