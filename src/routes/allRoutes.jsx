import React, { lazy } from 'react';
import ShowFriendsPage from '../Pages/FriendsPage/Pages/ShowFriendsPage';
const Homepage = lazy(() => import('../Pages/Homepage/Homepage'));
const Messagepage = lazy(() => import('../Pages/MessagePage/Messagepage'));
const FriendsPage = lazy(() => import('../Pages/FriendsPage/FriendsHomePage'));
const FlagPage = lazy(() => import('../Pages/FlagPage/FlagPage'));
const GroupsPage = lazy(() => import('../Pages/GroupsPage/GroupsPage'));
const ProfilePage = lazy(() => import('../Pages/ProfilePage/UserProfilePage/ProfilePage'));
const FriendProfilePage = lazy(() => import('../Pages/ProfilePage/FriendProfilePage/FriendProfilePage'));

const homeRoutes = [
    { path: "/", component: <Homepage/>},
    { path: "/profile", component: <ProfilePage/>},
    { path: "/friendprofile", component: <FriendProfilePage/>},
    { path: "/friends", component: <FriendsPage/>},
    { path: "/friends/:type", component: <ShowFriendsPage /> },
    { path: "/pages", component: <FlagPage/>},
    { path: "/groups", component: <GroupsPage/>},

];

const messageRoutes = [
    { path: "/messages", component: <Messagepage/>},
];
export { homeRoutes, messageRoutes};
