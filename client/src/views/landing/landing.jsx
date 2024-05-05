
import styles from "./landing.module.css";
import { Link } from "react-router-dom";
import landingImg from "../../assets/LandingIMG2.webp"

function Landing() {
  return (
  <div  className={styles.landingContainer}>
    <div className={styles.landingContainer2}>
    <h2>COUNTRIES</h2>
    <Link to="/countries">
    <button>INGRESO</button>
    </Link>
    </div>
    <img src={landingImg}/>
  </div>
  );
}

export default Landing;