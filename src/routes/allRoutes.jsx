import React, { lazy } from 'react';

const Homepage = lazy(() => import('../Pages/Homepage/Homepage'));
const ProfilePage = lazy(() => import('../Pages/ProfilePage/ProfilePage'));

const homeRoutes = [
    { path: "/", component: <Homepage/>},
    { path: "/profile", component: <ProfilePage/>},
];


export { homeRoutes};
