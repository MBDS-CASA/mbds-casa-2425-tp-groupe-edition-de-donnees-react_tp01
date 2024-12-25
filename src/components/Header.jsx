import React from "react";

function Header() {
  return (
    <header style={{ textAlign: "center", margin: "20px 0" }}>
      <img
        src="/src/assets/logo1.png"
        alt="Logo Formation"
        style={{ width: "150px", height: "auto", marginBottom: "20px" }}
      />
      <h1>Introduction à React</h1>
      <h2>A la découverte des premières notions de React</h2>
    </header>
  );
}

export default Header;