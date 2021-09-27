/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import FrontendFooter from "./frontend-footer";
import FrontendHeader from "./frontend-header";
import "../scss/global.scss";
import React from "react";

const FrontendLayout = ({ title, children }) => {
  return (
    <div>
      <FrontendHeader />
      <main className="mainPageContent">
        <h1 className="header">{title}</h1>
        <div className="container">{children}</div>
      </main>
      <FrontendFooter />
    </div>
  );
};

export default FrontendLayout;
