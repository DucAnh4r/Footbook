import React, { lazy } from 'react';
const Homepage = lazy(() => import('../Pages/Homepage/Homepage'));
const Messagepage = lazy(() => import('../Pages/MessagePage/Messagepage'));
const FriendsPage = lazy(() => import('../Pages/FriendsPage/FriendsPage'));
const FlagPage = lazy(() => import('../Pages/FlagPage/FlagPage'));
const GroupsPage = lazy(() => import('../Pages/GroupsPage/GroupsPage'));
const ProfilePage = lazy(() => import('../Pages/ProfilePage/ProfilePage'));

const homeRoutes = [
    { path: "/", component: <Homepage/>},
    { path: "/profile", component: <ProfilePage/>},
    { path: "/friends", component: <FriendsPage/>},
    { path: "/pages", component: <FlagPage/>},
    { path: "/groups", component: <GroupsPage/>},

];

const messageRoutes = [
    { path: "/messages", component: <Messagepage/>},
];
export { homeRoutes, messageRoutes};
