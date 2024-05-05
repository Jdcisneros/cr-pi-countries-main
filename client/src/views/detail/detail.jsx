
import { useParams } from "react-router-dom";
import styles from "./detail.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";

function Detail() {
  const params = useParams();
  const [country, setCountry] = useState({})

  useEffect(()=>{
    axios(`http://localhost:3001/countries/${params?.id}`).then(({data})=>{
    if(data?.id) {
      setCountry(data);
    } else {
      alert('no existe el Pais')
    }
  }).catch(()=> {
    console.log('Se rompió')
})

return ()=> setCountry({})
  },[params?.id])


  return (
  <div >
    <Navbar/>
    <div className={styles.detailContainer}>
    <div className={styles.cardDetail}>
    <h2>{country?.name}<p>({country?.id})</p><p>{country?.continents}</p></h2>
    <p>Capital: {country?.capital}</p>
    <p>Subregión: {country?.subregion}</p>
    <p>Área: {country?.area}</p>
    <p>Población: {country?.population}</p>
  </div>
  <div className={styles.image}>
    <img src={country?.flags} alt={country.name}/>

    </div>
  </div>
  </div>
  );
}

export default Detail;