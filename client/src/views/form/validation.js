const validate = (input) => {
  const errors = {};

  //VALIDACIONES DE NAME

  if (!/^[a-zA-Z\s]+$/.test(input.name)) {
    errors.name = "(El nombre no debe contener símbolos)";
  }

  if(input.name.trim() == "") {
    errors.name = "(Este campo no debe estar vacio)"
  }

  if (input.name.split(" ").length > 4) {
    errors.name = "(Este campo no puede tener mas de 4 espacios en blanco)"
  }


  for (let i = 0; i < input.name.length; i++) {
    if (!isNaN(parseInt(input.name[i]))) {
      errors.name = "(El nombre no debe contener un numero)";
    }
  }

  if (input.name.length > 20) {
    errors.name = "(Debe ser menor a 20 caracteres)";
  }

  //VALIDACIONES DE DIFICULTAD

  const difficultyNumber = parseInt(input.difficulty);
  
  if (isNaN(difficultyNumber) || difficultyNumber < 1 || difficultyNumber >5 ) {
    errors.difficulty = "(La dificultad debe ser un numero del 1 al 5)";
  }

  if (input.difficulty.trim() === "") {
    errors.difficulty = "(Este campo no debe estar vacio)"
  } else if (input.difficulty.trim().length > 1) {
    errors.difficulty = "(La dificultad debe tener 1 dígito)";
  }

  //VALIDACIONES DE DURACION

  const durationNumber = parseInt(input.duration);
  
  if (isNaN(durationNumber) || durationNumber < 1 || durationNumber >9 ) {
    errors.duration = "(La duracion debe ser un numero del 1 al 9 horas)";
  }

  if (input.duration.trim() === "") {
    errors.duration = "(Este campo no debe estar vacio)"
  } 
  
  if (input.duration.trim().length > 1) {
    errors.duration = "(La duracion debe tener un maximo de 1 dígito)"
  }

  if (input.season === "") {
    errors.season = "(Se debe seleccionar la temporada)"
  }
  if (input.countryIds.length === 0) {
    errors.countryIds = "(Se debe seleccionar al menos un país)"
  }
  

    return errors;
  }

export default validate;
