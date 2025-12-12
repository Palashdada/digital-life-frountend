import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Foter from "../components/Foter";

const HomeLayout = () => {
  return (
    <div>
      <section>
        <Navbar></Navbar>
      </section>
      <main>
        <Outlet></Outlet>
      </main>
      <section>
        <Foter></Foter>
      </section>
    </div>
  );
};

export default HomeLayout;
