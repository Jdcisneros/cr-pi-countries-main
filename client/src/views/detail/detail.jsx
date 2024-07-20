import { Link, useParams } from "react-router-dom";
import styles from "./detail.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import { useSelector } from "react-redux";
import Loading from "../../components/loading/loading";

function Detail() {
  const params = useParams();
  const [country, setCountry] = useState({});
  const activityCountry = useSelector((state) => state.activitiesCountries);
  const activities = useSelector((state) => state.activities);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí puedes simular una carga de datos
    setTimeout(() => {
      setLoading(false); // Cuando termina la carga
    }, 1000); // Simulamos una carga de 3 segundos
  }, []);

  useEffect(() => {
    axios(`http://localhost:3001/countries/${params?.id}`)
      .then(({ data }) => {
        if (data?.id) {
          setCountry(data);
        } else {
          alert("no existe el Pais");
        }
      })
      .catch(() => {
        console.log("Se rompió");
      });

    return () => setCountry({});
  }, [params?.id]);

  console.log("activityCountry:", activityCountry);

  const filteredActivities = activityCountry.filter(
    (act) => String(act.CountryId) === params.id
  );

  const uniqueActivityIds = {};

  // Mapeamos las actividades filtradas y buscamos sus nombres en el estado activities
  const filteredNameActivity = filteredActivities
    .map((filteredAct) => {
      // Buscamos la actividad correspondiente en el estado activities
      const activity = activities.find(
        (act) => act.ActivityId === filteredAct.id
      );

      // Si encontramos la actividad y no está registrada previamente como única, la agregamos al objeto y la retornamos
      if (activity && !uniqueActivityIds[activity.ActivityId]) {
        uniqueActivityIds[activity.ActivityId] = true; // Marcamos el ID como registrado
        return {
          ActivityId: activity.ActivityId,
          name: activity.name,
        };
      }

      return null; // Retornamos null para filtrar actividades no encontradas
    })
    .filter((activity) => activity !== null); // Filtramos elementos nulos que puedan haber quedado
  console.log("filteredNameActivity:", filteredNameActivity);

  console.log("params id", params.id);
  console.log("activities", activities);
  console.log("Actividades filtradas:", filteredActivities);
  console.log("filteredNameActivity:", filteredNameActivity);

  return (
    <div>
       {loading ? <Loading /> : 
       <div>
      <div>

        <Navbar />
      </div>
      <div className={styles.detailContainer}>
        <div className={styles.cardDetail}>
          <Link to="/countries">
          <div className={styles.cardDetailbutton}>
        <button>🡨 Volver al inicio</button>
            </div>
          </Link>
          <div>
            <div className={styles.titleCountryDetail}>
              <h2>{country?.name}

              <p>({country?.id})</p>
              </h2>
            </div>
           

            
            
          </div>

          <div className={styles.detailInfoContainer}>
            <div>
            <p>Continente: {country?.continents}</p>
              <p>Capital: {country?.capital}</p>
              <p>Subregión: {country?.subregion}</p>
              <p>Área: {country?.area}</p>
              <p>Población: {country?.population}</p>
              <div className={styles.activitiesContainer}>
                <p>Actividades en {country?.name} :</p>
                <ul>
                  {filteredNameActivity.length > 0 ? (
                    filteredNameActivity.map((activity) => (
                      <li key={activity.ActivityId}>
                        <p>{activity.name}</p>
                      </li>
                    ))
                  ) : (
                    <li>
                      <p> No hay actividades disponibles</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className={styles.image}>
              <img src={country?.flags} alt={country.name} />
            </div>
          </div>
         </div>
       </div>
       </div>
}</div>
  );
}

export default Detail;
