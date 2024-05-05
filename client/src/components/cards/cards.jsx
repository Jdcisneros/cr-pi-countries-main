
/* eslint-disable react/prop-types */
import Card from "../card/card";
import styles from "./cards.module.css";

function Cards({allCountries}) {

  return (
  <div className={styles.cardsContainer}>


     {allCountries.map((country) => (
        <Card 
          key={country.id}
          id={country.id} 
          flags={country.flags} 
          name={country.name} 
          continents={country.continents}
      
          />
      ))}
  </div>
  );
}

export default Cards;