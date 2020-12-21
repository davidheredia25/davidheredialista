
//MAIN
// Datos de la tabla para cargar dinamicamente
let datos = `{
  "personas": [
      {
       "Nombre": "Yasuyoshi",
        "Apellido": "Chiba",
        "Edad": 48,
        "Nacionalidad": "Japones"
      },
      {
        "Nombre": "Lee-Ann",
        "Apellido": "Olwage",
        "Edad": 34,
        "Nacionalidad": "Sudafricana"
      },
      {
        "Nombre": "Tatsiana",
        "Apellido": "Tkachova",
        "Edad": 30,
        "Nacionalidad": "Rusa"
      },
      {
        "Nombre": "Matthew",
        "Apellido": "Abbott",
        "Edad": 54,
        "Nacionalidad": "Australiano"
      },
      {
        "Nombre": "Steve",
        "Apellido": "Winter",
        "Edad": 63,
        "Nacionalidad": "Estadounidense"
      },
      {
        "Nombre": "Silvia",
        "Apellido": "Izquierdo",
        "Edad": 26,
        "Nacionalidad": "Brasileña"
      }
  ]
}`

//al iniciar el script cargar los datos/botones dinamicamente
window.addEventListener("load", () => {
  processedData = JSON.parse(datos);
  let arregloclave = Object.keys(processedData.personas[0]);
  crearHeader(arregloclave);
  for (let i = 0; i < processedData.personas.length; i++) {
      crearTabla(processedData.personas[i]);
  }
  agregarBoton();
});
