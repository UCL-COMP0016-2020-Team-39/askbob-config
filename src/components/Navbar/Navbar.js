import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "@material-ui/icons";
import PropTypes from "prop-types";

const Navbar = ({ links = [] }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

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
        {links.length > 0 && (
          <button
            aria-label='toggle-menu'
            className={styles.navbarBtn}
            onClick={() => {
              setOpen(prev => !prev);
            }}
          >
            <Menu />
          </button>
        )}
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

export default Navbar;
