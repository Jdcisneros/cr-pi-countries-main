import { CREATE_ACTIVITY, GET_BY_NAME, GET_COUNTRIES,GET_ACTIVITIES, GET_ACTIVITIES_COUNTRIES } from "./actions";

let inicialState = { allCountries: [], activities: [], activitiesCountries: [] };

function rootReducer(state = inicialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        allCountries: action.payload,
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    case GET_ACTIVITIES:
    return {
      ...state,
      activities: action.payload,
    };
    case GET_ACTIVITIES_COUNTRIES:
    return {
      ...state,
      activitiesCountries: action.payload,
    };
    default:
      return state;
  }
}

export default rootReducer;
