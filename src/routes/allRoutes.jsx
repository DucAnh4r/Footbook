import React, { lazy } from 'react';

const Homepage = lazy(() => import('../Pages/Homepage/Homepage'));

const homeRoutes = [
    { path: "/", component: <Homepage/>},
];


export { homeRoutes};
