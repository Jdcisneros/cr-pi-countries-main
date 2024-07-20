import { useEffect, useState } from "react";
import styles from "./form.module.css";
import validate from "./validation";
import { createActivity } from "../../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import { Link } from "react-router-dom";

function Form() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countryIds: [], // Cambiar a countryIds para almacenar IDs de países
  });

  const [error, setError] = useState({});

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showActivityCreated, setShowActivityCreated] = useState(false);
  const [createdActivityInfo, setCreatedActivityInfo] = useState({});

  // Obtener la lista de países
  const getCountries = async () => {
    try {
      const response = await axios.get("http://localhost:3001/countries");
      const data = response.data;
      data.sort((a, b) => a.name.localeCompare(b.name));
      setCountries(data);
    } catch (error) {
      console.error("Error al obtener la lista de países", error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    if (e.target.name === "country") {
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setInput((prevInput) => ({
        ...prevInput,
        countryIds: [...prevInput.countryIds, ...selectedOptions],
      }));

      console.log("selectedOptions:", selectedOptions);
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // Manejar cambios en la búsqueda de países
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const { name, difficulty, duration, season, countryIds } = input;
  
    // Validar que todos los campos necesarios estén definidos
    if (!name || !difficulty || !duration || !season || countryIds.length === 0) {
      console.error("Algunos campos están sin definir");
      return;
    }
  
    const formattedInput = {
      name: input.name,
      difficulty: parseInt(input.difficulty),
      duration: parseInt(input.duration),
      season: input.season,
      countryIds: input.countryIds.map((id) => id.toString()), // Convertir cada ID a string si es necesario
    };
  
    // Realizar la llamada al backend para crear la actividad
    dispatch(createActivity(formattedInput))
      .then((res) => {
        setCreatedActivityInfo({
          name: res.name,
          difficulty: res.difficulty,
          duration: res.duration,
          season: res.season,
          countryNames: res.countryNames // Aquí accedes a los nombres de los países
        });

        console.log("res",res)
        setShowActivityCreated(true);
      })
      .catch((err) => {
        console.error("Error al crear la actividad", err);
      });
  
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countryIds: [],
    });
  };

  useEffect(() => {
    // Aquí podemos acceder correctamente a `createdActivityInfo.countryIds`
    console.log("Country IDs actualizados:", createdActivityInfo.countryIds);
  }, [createdActivityInfo]);

  // Validar el formulario cuando hay cambios en los inputs
  useEffect(() => {
    const validationErrors = validate(input);
    setError(validationErrors);
  }, [input]);

  // Manejar la eliminación de países seleccionados
  const handleRemoveCountry = (countryToRemoveId) => {
    setInput((prevInput) => ({
      ...prevInput,
      countryIds: prevInput.countryIds.filter((id) => id !== countryToRemoveId),
    }));
  };

  // Filtrar países según el término de búsqueda
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <Navbar className={styles.fixedNavbar} />
      </div>
      <div className={styles.formAllContainer}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h2>CREA TU ACTIVIDAD</h2>
          {showActivityCreated && (
            <div className={styles.activityCreated}>
              <p>Actividad creada exitosamente!</p>
              <p>Información de la actividad:</p>
              <ul>
                <li>Nombre: {createdActivityInfo?.name}</li>
                <li>Dificultad: {createdActivityInfo?.difficulty}</li>
                <li>Duración: {createdActivityInfo?.duration} HS</li>
                <li>Temporada: {createdActivityInfo?.season}</li>
                {createdActivityInfo?.countryNames?.length > 0 && (
                  <ul>
                    <li>Países:</li>
                    {createdActivityInfo.countryNames.map((countryName) => (
                      <li key={countryName}>{countryName}</li>
                    ))}
                  </ul>
                )}
              </ul>
              <button onClick={() => setShowActivityCreated(false)}>
                Cerrar
              </button>
              <Link to="/countries">
              <button>
                Volver al home
              </button>
              </Link>
            </div>
          )}
          <div>
            <label> Nombre:</label>
            <div>
              {error.name && <span className={styles.error}>{error.name}</span>}
            </div>
            <input
              name="name"
              value={input.name}
              onChange={handleChange}
              placeholder="Seleccion de nombre"
            />
          </div>
          <div>
            <label> Dificultad:</label>
            <div>
              {error.difficulty && (
                <span className={styles.error}>{error.difficulty}</span>
              )}
            </div>

            <select name="difficulty" value={input.difficulty} onChange={handleChange}>
              <option value="">Seleccion de dificultad</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            {/* <input
              name="difficulty"
              value={input.difficulty}
              onChange={handleChange}
              placeholder="Seleccion de dificultad (Donde 1 es fácil y 5 es difícil)"
            /> */}
          </div>
          <div>
            <label> Duración:</label>
            <div>
              {error.duration && (
                <span className={styles.error}>{error.duration}</span>
              )}
            </div>
            <select name="duration" value={input.duration} onChange={handleChange}>
              <option value="">Seleccion de duración</option>
              <option value="1">1 hora</option>
              <option value="2">2 hrs</option>
              <option value="3">3 hrs</option>
              <option value="4">4 hrs</option>
              <option value="5">5 hrs</option>
            </select>
            {/* <input
              name="duration"
              value={input.duration}
              onChange={handleChange}
              placeholder="Seleccion de Duración en Horas"
            /> */}
          </div>
          <div>
            <label> Temporada:</label>
            <div>
              {error.season && (
                <span className={styles.error}>{error.season}</span>
              )}
            </div>
            <select name="season" value={input.season} onChange={handleChange}>
              <option value="">Seleccion de temporada</option>
              <option value="Verano">Verano</option>
              <option value="Primavera">Primavera</option>
              <option value="Invierno">Invierno</option>
              <option value="Otoño">Otoño</option>
            </select>
          </div>
          <div>
            <label> País:</label>
            <div>
              {error.countryIds && (
                <span className={styles.error}>{error.countryIds}</span>
              )}
            </div>
            <input
              type="text"
              placeholder="Buscar país"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select
              name="country"
              multiple
              value={input.countryIds}
              onChange={handleChange}
            >
              {filteredCountries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.paisSelect}>
            <label> Países seleccionados: </label>
            <ul>
              {input.countryIds.length > 0 ? (
                input.countryIds.map((countryId, index) => (
                  <li key={index}>
                    <p>

                    {countries.find((c) => c.id === countryId)?.name}
                    </p>
                    <button
                      className={styles.buttonSelect}
                      onClick={() => handleRemoveCountry(countryId)}
                    >
                      x
                    </button>
                  </li>
                ))
              ) : (
                <li style={{ border: 'none', pointerEvents: 'none' }}>No hay países seleccionados</li>
              )}
            </ul>
          </div>
          {Object.keys(error).length === 0 && (
            <button type="submit" className={styles.buttonSelect2}>
              Crear actividad turística
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
