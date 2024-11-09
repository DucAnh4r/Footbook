import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { homeRoutes } from "./allRoutes";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ExtendPage/ErrorPage";

const Index = () => {
    return (
        <React.Fragment>
                <Suspense>
                    <Routes>
                        <Route>
                            {homeRoutes.map((route, idx) => (
                                <Route path={route.path} element={<MainLayout>{route.component}</MainLayout>} key={idx} exact={true} />
                            ))}
                        </Route>
                        <Route path="*" element={<MainLayout><ErrorPage/></MainLayout>} />
                    </Routes>
                </Suspense>
        </React.Fragment>
    );
};

export default Index;