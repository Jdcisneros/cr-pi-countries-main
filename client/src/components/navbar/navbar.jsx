/* eslint-disable react/prop-types */

import styles from "./navbar.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import lupa from "../../assets/search.svg";

function Navbar({ handleChange, handleSubmit }) {
  return (
    <div className={styles.navbarContainer}>
      <div>
        <Link to="/countries">
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
            <h2>COUNTRIES</h2>
          </div>
        </Link>
      </div>
      <div className={styles.optionsContainer}>
        <div className={styles.optionsContainer2}>
          <Link to="/countries">
            <button>INICIO</button>
          </Link>
          <Link to="/countries/form">
            <button>CREAR ACTIVIDAD</button>
          </Link>
        </div>

        <form onChange={handleChange}>
          <input placeholder="Buscar pais..." type="search" />
          <button type="submit" onClick={handleSubmit} className={styles.buttonSearchNavbar}>
            <object type="image/svg+xml" data={lupa}>
              <img src={lupa} alt="lupa" />
            </object>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Navbar;
