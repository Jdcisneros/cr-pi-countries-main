import axios from 'axios'

export const GET_COUNTRIES = "GET_COUNTRIES"
export const GET_BY_NAME = "GET_BY_NAME"
export const CREATE_ACTIVITY = "CREATE_ACTIVITY"
export const GET_ACTIVITIES = "GET_ACTIVITIES"
export const GET_ACTIVITIES_COUNTRIES = "GET_ACTIVITIES_COUNTRIES"


export function  getCountries(){
    return async function(dispatch){
        const response = await axios("http://localhost:3001/countries")
        return dispatch({
            type:"GET_COUNTRIES",
            payload:response.data
        })
    }
}

export function  getCountryByName(name){
    return async function(dispatch){
        const response = await axios(`http://localhost:3001/countries?name=${name}`)
        return dispatch({
            type:"GET_BY_NAME",
            payload:response.data
        })
    }
}

export function createActivity(input) {
    return async function (dispatch) {
      try {
        // Validar que haya al menos un país seleccionado
        if (input.countryIds.length === 0) {
          console.error('Debes seleccionar al menos un país para la actividad.');
          return;
        }
  
        // Realizar la solicitud POST para crear la actividad
        const response = await axios.post("http://localhost:3001/activities/create", input);
        const createdActivity = response.data;
  
        console.log('Actividad creada:', createdActivity);
  
        // Despachar la acción para actualizar el estado de la aplicación
        dispatch({
          type: "CREATE_ACTIVITY",
          payload: createdActivity,
        });
  
        // Retornar la actividad creada por si se necesita manejarla en componentes
        return createdActivity;
  
      } catch (error) {
        console.error('Error al crear la actividad:', error);
        console.error('Error en la configuración de la solicitud:', error.message);
        // Puedes lanzar el error nuevamente para que sea manejado por el componente que llamó a esta acción
        throw error;
      }
    };
  }

export function allActivities(){
return async function(dispatch){
    const response = await axios("http://localhost:3001/activities")
    return dispatch({
        type:"GET_ACTIVITIES",
        payload:response.data
    })

}
}

export function getActivityCountry(){
    return async function(dispatch){
        const response = await axios("http://localhost:3001/activities-countries")
        return dispatch({
            type:"GET_ACTIVITIES_COUNTRIES",
            payload:response.data
        })
    
    }
    }