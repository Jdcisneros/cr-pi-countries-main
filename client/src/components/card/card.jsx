/* eslint-disable react/prop-types */
import style from "./card.module.css";
import {Link} from "react-router-dom"

const Card = ({flags, name, continents, id}) => {
  return (
    <div className={style.cardContainer}>
    <Link to={`${id}`}>
    <div>
    <img src={flags} alt={name}/>
    <div className={style.cardContainer2}>
    <h2>{name}</h2>
    <p>{continents}</p>
    </div>
    </div>
    </Link>
    </div>
  );
}

export default Card;