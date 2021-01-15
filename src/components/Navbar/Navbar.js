import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "@material-ui/icons";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const links = [
    { name: "Home", slug: "/" },
    { name: "Questions", slug: "/questions" },
    { name: "Responses", slug: "/responses" },
    { name: "About", slug: "/about" },
    { name: "Contact", slug: "/contact" },
  ];

  return (
    <header
      className={styles.container}
      onMouseLeave={() => {
        setOpen(false);
      }}
      onBlurCapture={e => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setOpen(false);
          console.log("hit");
        }
      }}
    >
      <nav className={styles.navbar}>
        <h1>
          <Link
            to='/'
            className={styles.logo}
            onClick={() => {
              setOpen(false);
            }}
          >
            AskBob
          </Link>
        </h1>

        <ul className={`${styles.navbarLinks} ${open ? styles.open : ""}`}>
          {links.map((link, index) => {
            const { name, slug } = link;
            const activeClass = pathname === slug ? styles.activeLink : "";
            return (
              <li key={index} className={`${styles.navbarLink} ${activeClass}`}>
                <Link
                  to={slug}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          className={styles.navbarBtn}
          onClick={() => {
            setOpen(prev => !prev);
          }}
        >
          <Menu />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
