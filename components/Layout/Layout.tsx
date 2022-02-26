import React, { useState } from "react";
import Header from "./Header";
import Head from "next/head";
import LateralMenu from "./LateralMenu";

interface ILayoutProps {
  children: any,
  hideLeftMenu?: boolean
}

const Layout = ({
  children,
  hideLeftMenu = false,
}: ILayoutProps) => {


  return (
    <>
      <Head>
        <title>Next Template</title>
        <meta
          content="Next template with tailwind and user context"
          name="description"
        />
        <link
          href="/static/images/favicon.png"
          rel="shortcut icon"
          type="image/x-icon"
        />

      </Head>
      {!hideLeftMenu && <Header />}

      <main className={`mt-16 md:mt-0 bg-white text-black`}>
          {children}
      </main>

    </>
  );
};

export default Layout;
