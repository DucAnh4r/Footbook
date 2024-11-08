import React from "react";
import Header from "./Header";

const MainLayout = (props) => {
    return (
        <>
        <Header />
        <div className="page-content">{props.children}</div>
        </>

    );
};

export default MainLayout;
