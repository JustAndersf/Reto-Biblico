import { Category } from "../types/game";

export const CATEGORIES: Category[] = [
  {
    id: "antiguo-testamento",
    name: "Antiguo Testamento",
    emoji: "📜",
    colorFrom: "#4A7FD4",
    colorTo: "#2C5FAA",
    textColor: "#FFFFFF",
    description: "Génesis al Malaquías",
    levels: [
      {
        id: 1,
        title: "Nivel Básico",
        pointsPerQuestion: 10,
        questions: [
          {
            id: "at-1-1",
            text: "¿Quién construyó el arca según el libro de Génesis?",
            options: ["Noé", "Abraham", "Moisés", "David"],
            correctIndex: 0,
          },
          {
            id: "at-1-2",
            text: "¿En qué jardín vivieron Adán y Eva al inicio?",
            options: ["Edén", "Getsemaní", "Sinaí", "Nazaret"],
            correctIndex: 0,
          },
          {
            id: "at-1-3",
            text: "¿Cuántos días y noches llovió durante el diluvio?",
            options: ["40 días y 40 noches", "7 días", "100 días", "20 días"],
            correctIndex: 0,
          },
          {
            id: "at-1-4",
            text: "¿Quién mató al gigante Goliat con una honda?",
            options: ["David", "Saúl", "Jonatán", "Elías"],
            correctIndex: 0,
          },
          {
            id: "at-1-5",
            text: "¿Cuántos mandamientos le dio Dios a Moisés en el monte Sinaí?",
            options: ["10", "5", "7", "12"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 2,
        title: "Patriarcas",
        pointsPerQuestion: 15,
        questions: [
          {
            id: "at-2-1",
            text: "¿Cuántos hijos tuvo Jacob, padre de las doce tribus?",
            options: ["12", "10", "7", "14"],
            correctIndex: 0,
          },
          {
            id: "at-2-2",
            text: "¿Quién fue vendido por sus hermanos a los egipcios?",
            options: ["José", "Benjamín", "Rubén", "Judá"],
            correctIndex: 0,
          },
          {
            id: "at-2-3",
            text: "¿Qué instrumento tocaba el rey David?",
            options: ["Arpa", "Flauta", "Trompeta", "Tambor"],
            correctIndex: 0,
          },
          {
            id: "at-2-4",
            text: "¿Qué animal habló con Eva en el jardín del Edén?",
            options: ["Una serpiente", "Un águila", "Un burro", "Un cordero"],
            correctIndex: 0,
          },
          {
            id: "at-2-5",
            text: "¿Cuál fue el primer rey de Israel?",
            options: ["Saúl", "David", "Salomón", "Samuel"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 3,
        title: "Éxodo y Reyes",
        pointsPerQuestion: 20,
        questions: [
          {
            id: "at-3-1",
            text: "¿Cuántos años estuvo el pueblo de Israel en el desierto?",
            options: ["40 años", "20 años", "100 años", "70 años"],
            correctIndex: 0,
          },
          {
            id: "at-3-2",
            text: "¿Qué cuerpo de agua cruzó Moisés con el pueblo de Israel?",
            options: ["El Mar Rojo", "El río Nilo", "El río Jordán", "El lago de Galilea"],
            correctIndex: 0,
          },
          {
            id: "at-3-3",
            text: "¿Con qué alimento milagroso alimentó Dios a los israelitas en el desierto?",
            options: ["Maná", "Pan horneado", "Carne de ángel", "Frutas del cielo"],
            correctIndex: 0,
          },
          {
            id: "at-3-4",
            text: "¿Quién fue el sabio rey que construyó el primer templo de Jerusalén?",
            options: ["Salomón", "David", "Ezequías", "Josías"],
            correctIndex: 0,
          },
          {
            id: "at-3-5",
            text: "¿Cuántas plagas envió Dios sobre Egipto?",
            options: ["10", "7", "12", "5"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 4,
        title: "Historia Sagrada",
        pointsPerQuestion: 25,
        questions: [
          {
            id: "at-4-1",
            text: "¿En qué libro bíblico está escrita la historia de la reina Ester?",
            options: ["Ester", "Rut", "Nehemías", "Esdrás"],
            correctIndex: 0,
          },
          {
            id: "at-4-2",
            text: "¿Qué profeta fue tragado por un gran pez?",
            options: ["Jonás", "Elías", "Ezequiel", "Jeremías"],
            correctIndex: 0,
          },
          {
            id: "at-4-3",
            text: "¿Qué profeta fue llevado al cielo en un carro de fuego?",
            options: ["Elías", "Moisés", "Enoc", "Ezequiel"],
            correctIndex: 0,
          },
          {
            id: "at-4-4",
            text: "¿De quién huyó David cuando era joven y perseguido?",
            options: ["Del rey Saúl", "De Goliat", "De los filisteos", "De Absalón"],
            correctIndex: 0,
          },
          {
            id: "at-4-5",
            text: "¿Quién escribió los cinco primeros libros de la Biblia?",
            options: ["Moisés", "David", "Salomón", "Samuel"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 5,
        title: "Maestría",
        pointsPerQuestion: 30,
        questions: [
          {
            id: "at-5-1",
            text: "¿Cuántos años vivió Matusalén, el hombre más longevo de la Biblia?",
            options: ["969 años", "777 años", "900 años", "850 años"],
            correctIndex: 0,
          },
          {
            id: "at-5-2",
            text: "¿Qué representaban las 7 vacas gordas en el sueño del Faraón que interpretó José?",
            options: ["7 años de abundancia", "7 reinos prósperos", "7 plagas", "7 eras de paz"],
            correctIndex: 0,
          },
          {
            id: "at-5-3",
            text: "¿Qué prometió Dios a Abraham como señal del pacto?",
            options: ["Descendencia como las estrellas", "Un reino eterno", "Un templo sagrado", "Un libro de sabiduría"],
            correctIndex: 0,
          },
          {
            id: "at-5-4",
            text: "¿En qué ciudad fue construido el templo de Salomón?",
            options: ["Jerusalén", "Belén", "Hebrón", "Samaria"],
            correctIndex: 0,
          },
          {
            id: "at-5-5",
            text: "¿Qué arma usó Sansón para derrotar a sus enemigos en una batalla?",
            options: ["Quijada de burro", "Una espada", "Una honda", "Una lanza"],
            correctIndex: 0,
          },
        ],
      },
    ],
  },
  {
    id: "nuevo-testamento",
    name: "Nuevo Testamento",
    emoji: "✝️",
    colorFrom: "#7B5FBB",
    colorTo: "#5A3F9A",
    textColor: "#FFFFFF",
    description: "Mateo al Apocalipsis",
    levels: [
      {
        id: 1,
        title: "Evangelios",
        pointsPerQuestion: 10,
        questions: [
          {
            id: "nt-1-1",
            text: "¿En qué ciudad nació Jesús?",
            options: ["Belén", "Nazaret", "Jerusalén", "Jericó"],
            correctIndex: 0,
          },
          {
            id: "nt-1-2",
            text: "¿Cuántos apóstoles eligió Jesús para su ministerio?",
            options: ["12", "10", "7", "14"],
            correctIndex: 0,
          },
          {
            id: "nt-1-3",
            text: "¿Quién bautizó a Jesús en el río Jordán?",
            options: ["Juan el Bautista", "Pedro", "Pablo", "Andrés"],
            correctIndex: 0,
          },
          {
            id: "nt-1-4",
            text: "¿En qué evento Jesús convirtió el agua en vino?",
            options: ["Bodas de Caná", "Bodas de Galilea", "Última Cena", "Pentecostés"],
            correctIndex: 0,
          },
          {
            id: "nt-1-5",
            text: "¿Cuántos días estuvo Jesús en el desierto siendo tentado por el diablo?",
            options: ["40 días", "7 días", "20 días", "3 días"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 2,
        title: "Pasión y Resurrección",
        pointsPerQuestion: 15,
        questions: [
          {
            id: "nt-2-1",
            text: "¿Quién traicionó a Jesús por 30 monedas de plata?",
            options: ["Judas Iscariote", "Pedro", "Tomás", "Bartolomé"],
            correctIndex: 0,
          },
          {
            id: "nt-2-2",
            text: "¿Cuántos panes usó Jesús para alimentar a 5000 personas?",
            options: ["5 panes", "7 panes", "3 panes", "10 panes"],
            correctIndex: 0,
          },
          {
            id: "nt-2-3",
            text: "¿Qué apóstol negó conocer a Jesús tres veces?",
            options: ["Pedro", "Juan", "Tomás", "Andrés"],
            correctIndex: 0,
          },
          {
            id: "nt-2-4",
            text: "¿En qué día resucitó Jesús según las Escrituras?",
            options: ["El primer día (domingo)", "El sábado", "El viernes", "El lunes"],
            correctIndex: 0,
          },
          {
            id: "nt-2-5",
            text: "¿Cuántos peces había junto a los panes para alimentar a la multitud?",
            options: ["2 peces", "5 peces", "7 peces", "3 peces"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 3,
        title: "Hechos y Cartas",
        pointsPerQuestion: 20,
        questions: [
          {
            id: "nt-3-1",
            text: "¿Quién escribió la mayoría de las cartas del Nuevo Testamento?",
            options: ["Pablo", "Pedro", "Juan", "Santiago"],
            correctIndex: 0,
          },
          {
            id: "nt-3-2",
            text: "¿En qué lugar fue crucificado Jesús?",
            options: ["El Gólgota (Calvario)", "El monte Sinaí", "El jardín de Getsemaní", "El templo"],
            correctIndex: 0,
          },
          {
            id: "nt-3-3",
            text: "¿Cuántos días después de morir resucitó Jesús?",
            options: ["Al tercer día", "Al primer día", "Al séptimo día", "A los 40 días"],
            correctIndex: 0,
          },
          {
            id: "nt-3-4",
            text: "¿A quién resucitó Jesús que era su querido amigo y llevaba 4 días muerto?",
            options: ["Lázaro", "Jairo", "Zaqueo", "Nicodemo"],
            correctIndex: 0,
          },
          {
            id: "nt-3-5",
            text: "¿En qué ciudad ocurrió el milagro de Pentecostés?",
            options: ["Jerusalén", "Belén", "Antioquía", "Roma"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 4,
        title: "Epístolas",
        pointsPerQuestion: 25,
        questions: [
          {
            id: "nt-4-1",
            text: "¿Quién fue el primer mártir cristiano mencionado en el libro de Hechos?",
            options: ["Esteban", "Pablo", "Pedro", "Jacobo"],
            correctIndex: 0,
          },
          {
            id: "nt-4-2",
            text: "¿Cuántos años tenía Jesús cuando comenzó su ministerio público?",
            options: ["30 años", "25 años", "33 años", "28 años"],
            correctIndex: 0,
          },
          {
            id: "nt-4-3",
            text: "¿Qué nombre significa 'el ungido' o 'el Mesías'?",
            options: ["Cristo", "Jesús", "Emanuel", "Señor"],
            correctIndex: 0,
          },
          {
            id: "nt-4-4",
            text: "¿Cómo se llama el último libro del Nuevo Testamento?",
            options: ["Apocalipsis", "Hebreos", "Judas", "3 Juan"],
            correctIndex: 0,
          },
          {
            id: "nt-4-5",
            text: "¿Cuántos libros tiene el Nuevo Testamento?",
            options: ["27 libros", "39 libros", "66 libros", "12 libros"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 5,
        title: "Maestría NT",
        pointsPerQuestion: 30,
        questions: [
          {
            id: "nt-5-1",
            text: "¿Quién escribió el libro de Apocalipsis?",
            options: ["Juan", "Pablo", "Pedro", "Mateo"],
            correctIndex: 0,
          },
          {
            id: "nt-5-2",
            text: "¿Qué significa el nombre 'Jesús' en hebreo (Yeshua)?",
            options: ["Dios salva", "Hijo de Dios", "Rey eterno", "Luz del mundo"],
            correctIndex: 0,
          },
          {
            id: "nt-5-3",
            text: "¿Dónde dio Jesús el famoso Sermón del Monte?",
            options: ["Monte de las Bienaventuranzas", "Monte Sinaí", "Monte Carmelo", "Monte Hermón"],
            correctIndex: 0,
          },
          {
            id: "nt-5-4",
            text: "¿Quiénes fueron los primeros apóstoles llamados por Jesús?",
            options: ["Andrés y Pedro", "Juan y Jacobo", "Mateo y Tomás", "Felipe y Natanael"],
            correctIndex: 0,
          },
          {
            id: "nt-5-5",
            text: "¿En qué versículo Jesús dice 'Yo soy el camino, la verdad y la vida'?",
            options: ["Juan 14:6", "Juan 3:16", "Juan 11:25", "Juan 10:9"],
            correctIndex: 0,
          },
        ],
      },
    ],
  },
  {
    id: "personajes",
    name: "Personajes Bíblicos",
    emoji: "👤",
    colorFrom: "#D4925B",
    colorTo: "#B87040",
    textColor: "#FFFFFF",
    description: "Héroes de la fe",
    levels: [
      {
        id: 1,
        title: "Los Patriarcas",
        pointsPerQuestion: 10,
        questions: [
          {
            id: "pb-1-1",
            text: "¿Quién es conocido como 'el padre de la fe' en la Biblia?",
            options: ["Abraham", "Moisés", "David", "Noé"],
            correctIndex: 0,
          },
          {
            id: "pb-1-2",
            text: "¿Quién fue la esposa de Abraham?",
            options: ["Sara", "Rebeca", "Raquel", "Lea"],
            correctIndex: 0,
          },
          {
            id: "pb-1-3",
            text: "¿Quién fue el hijo de la promesa de Abraham y Sara?",
            options: ["Isaac", "Ismael", "Esaú", "Jacob"],
            correctIndex: 0,
          },
          {
            id: "pb-1-4",
            text: "¿Qué hijo de Isaac robó la bendición de la primogenitura?",
            options: ["Jacob", "Esaú", "José", "Rubén"],
            correctIndex: 0,
          },
          {
            id: "pb-1-5",
            text: "¿Cómo se llamó la madre de Jesús?",
            options: ["María", "Marta", "Elizabet", "Ana"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 2,
        title: "Líderes de Israel",
        pointsPerQuestion: 15,
        questions: [
          {
            id: "pb-2-1",
            text: "¿Quién fue el general que conquistó la ciudad de Jericó?",
            options: ["Josué", "Moisés", "Caleb", "Gedeón"],
            correctIndex: 0,
          },
          {
            id: "pb-2-2",
            text: "¿Quién fue la primera mujer mencionada en la Biblia?",
            options: ["Eva", "Sara", "Raquel", "Rut"],
            correctIndex: 0,
          },
          {
            id: "pb-2-3",
            text: "¿Qué apóstol era cobrador de impuestos antes de seguir a Jesús?",
            options: ["Mateo", "Zaqueo", "Lucas", "Juan"],
            correctIndex: 0,
          },
          {
            id: "pb-2-4",
            text: "¿Quién era la hermana de Lázaro y amiga de Jesús?",
            options: ["Marta y María", "Salomé", "Lidia", "Priscila"],
            correctIndex: 0,
          },
          {
            id: "pb-2-5",
            text: "¿Quién fue el suegro de Moisés que lo aconsejó sabiamente?",
            options: ["Jetro", "Aarón", "Caleb", "Josué"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 3,
        title: "Reyes y Reinas",
        pointsPerQuestion: 20,
        questions: [
          {
            id: "pb-3-1",
            text: "¿Quién fue el segundo rey de Israel, amado por Dios?",
            options: ["David", "Saúl", "Salomón", "Roboam"],
            correctIndex: 0,
          },
          {
            id: "pb-3-2",
            text: "¿Qué apóstol dudó de la resurrección hasta ver a Jesús en persona?",
            options: ["Tomás", "Pedro", "Judas", "Felipe"],
            correctIndex: 0,
          },
          {
            id: "pb-3-3",
            text: "¿Quién visitó a Jesús de noche por temor a los judíos?",
            options: ["Nicodemo", "José de Arimatea", "Jairo", "Zaqueo"],
            correctIndex: 0,
          },
          {
            id: "pb-3-4",
            text: "¿Qué reina salvó a su pueblo de una masacre planeada?",
            options: ["Ester", "Rut", "Débora", "Abigaíl"],
            correctIndex: 0,
          },
          {
            id: "pb-3-5",
            text: "¿Quién interpretó los sueños del faraón de Egipto?",
            options: ["José", "Daniel", "Samuel", "Moisés"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 4,
        title: "Mujeres de Fe",
        pointsPerQuestion: 25,
        questions: [
          {
            id: "pb-4-1",
            text: "¿Quién fue la primera jueza y profetisa de Israel?",
            options: ["Débora", "Ester", "Rut", "Noemí"],
            correctIndex: 0,
          },
          {
            id: "pb-4-2",
            text: "¿Quién fue el primer homicida de la historia bíblica?",
            options: ["Caín", "Lamec", "Esaú", "Sansón"],
            correctIndex: 0,
          },
          {
            id: "pb-4-3",
            text: "¿Quién fue la suegra de Rut, que la guió con amor?",
            options: ["Noemí", "Ester", "Débora", "Ana"],
            correctIndex: 0,
          },
          {
            id: "pb-4-4",
            text: "¿Qué apóstol fue el primero en morir como mártir entre los doce?",
            options: ["Jacobo (Santiago)", "Pedro", "Juan", "Andrés"],
            correctIndex: 0,
          },
          {
            id: "pb-4-5",
            text: "¿Quién fue el padre de Juan el Bautista?",
            options: ["Zacarías", "Eliseo", "Simeón", "José"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 5,
        title: "Maestría PB",
        pointsPerQuestion: 30,
        questions: [
          {
            id: "pb-5-1",
            text: "¿Quién es conocido como 'el discípulo amado' de Jesús?",
            options: ["Juan", "Pedro", "Andrés", "Jacobo"],
            correctIndex: 0,
          },
          {
            id: "pb-5-2",
            text: "¿Quién fue el primer hombre que no murió sino que fue llevado al cielo directamente?",
            options: ["Enoc", "Elías", "Moisés", "Abel"],
            correctIndex: 0,
          },
          {
            id: "pb-5-3",
            text: "¿Quién fue el hijo de David que construyó el grandioso templo?",
            options: ["Salomón", "Absalón", "Adonías", "Natán"],
            correctIndex: 0,
          },
          {
            id: "pb-5-4",
            text: "¿Cómo se llamaba el padre adoptivo de Jesús?",
            options: ["José", "Zacarías", "Simón", "Cleofas"],
            correctIndex: 0,
          },
          {
            id: "pb-5-5",
            text: "¿Qué reina del sur viajó desde lejos para escuchar la sabiduría de Salomón?",
            options: ["Reina de Saba", "Reina de Egipto", "Jezabel", "Atalía"],
            correctIndex: 0,
          },
        ],
      },
    ],
  },
  {
    id: "milagros",
    name: "Milagros de Jesús",
    emoji: "✨",
    colorFrom: "#D4A520",
    colorTo: "#B88800",
    textColor: "#FFFFFF",
    description: "Obras maravillosas",
    levels: [
      {
        id: 1,
        title: "Primeros Milagros",
        pointsPerQuestion: 10,
        questions: [
          {
            id: "mj-1-1",
            text: "¿Cuál fue el primer milagro registrado de Jesús?",
            options: ["Convertir agua en vino", "Sanar un ciego", "Resucitar a Lázaro", "Caminar sobre el agua"],
            correctIndex: 0,
          },
          {
            id: "mj-1-2",
            text: "¿A quién resucitó Jesús que era su amado amigo?",
            options: ["Lázaro", "Jairo", "Bartimeo", "Zaqueo"],
            correctIndex: 0,
          },
          {
            id: "mj-1-3",
            text: "¿A cuántas personas alimentó Jesús con 5 panes y 2 peces?",
            options: ["5,000 personas", "1,000 personas", "3,000 personas", "10,000 personas"],
            correctIndex: 0,
          },
          {
            id: "mj-1-4",
            text: "¿Qué hizo Jesús cuando había una gran tormenta en el mar?",
            options: ["Calmó el viento y las olas", "Caminó sobre el agua", "Sacó a Pedro del agua", "Oró toda la noche"],
            correctIndex: 0,
          },
          {
            id: "mj-1-5",
            text: "¿Qué enfermedad tenían los 10 hombres que Jesús sanó a la vez?",
            options: ["Lepra", "Ceguera", "Sordera", "Parálisis"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 2,
        title: "Fe y Sanidad",
        pointsPerQuestion: 15,
        questions: [
          {
            id: "mj-2-1",
            text: "¿Qué apóstol caminó sobre el agua junto a Jesús?",
            options: ["Pedro", "Juan", "Andrés", "Jacobo"],
            correctIndex: 0,
          },
          {
            id: "mj-2-2",
            text: "¿Cómo llamó Jesús a Lázaro para resucitarlo?",
            options: ["'¡Lázaro, sal fuera!'", "'Lázaro, levántate'", "'Vive en el nombre de Dios'", "'Lázaro, despierta'"],
            correctIndex: 0,
          },
          {
            id: "mj-2-3",
            text: "¿Cuántos años llevaba enferma la mujer que tocó el manto de Jesús?",
            options: ["12 años", "7 años", "40 años", "3 años"],
            correctIndex: 0,
          },
          {
            id: "mj-2-4",
            text: "¿Qué le sucedía a la hija de Jairo que Jesús sanó milagrosamente?",
            options: ["Había muerto (la resucitó)", "Tenía lepra", "Era ciega de nacimiento", "Tenía fiebre alta"],
            correctIndex: 0,
          },
          {
            id: "mj-2-5",
            text: "¿En qué ciudad convirtió Jesús el agua en vino?",
            options: ["Caná", "Belén", "Nazaret", "Capernaúm"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 3,
        title: "Poder Divino",
        pointsPerQuestion: 20,
        questions: [
          {
            id: "mj-3-1",
            text: "¿Cuántas tinajas de agua convirtió Jesús en vino en las bodas?",
            options: ["6 tinajas", "3 tinajas", "12 tinajas", "7 tinajas"],
            correctIndex: 0,
          },
          {
            id: "mj-3-2",
            text: "¿Cómo sanó Jesús al ciego de nacimiento?",
            options: ["Hizo barro con tierra y lo puso en sus ojos", "Solo lo tocó", "Solo oró por él", "Le habló al oído"],
            correctIndex: 0,
          },
          {
            id: "mj-3-3",
            text: "¿A dónde mandó Jesús al ciego de nacimiento después de aplicarle el barro?",
            options: ["A lavarse en el estanque de Siloé", "Al río Jordán", "Al templo", "A su casa"],
            correctIndex: 0,
          },
          {
            id: "mj-3-4",
            text: "¿Qué árbol fue maldecido por Jesús y se secó completamente?",
            options: ["Una higuera", "Un olivo", "Un cedro", "Una vid"],
            correctIndex: 0,
          },
          {
            id: "mj-3-5",
            text: "¿Qué dijo Jesús al paralítico en Capernaúm para sanarlo?",
            options: ["'Levántate, toma tu camilla y anda'", "Solo lo tocó en la espalda", "'Ve y no peques más'", "Le echó agua sagrada"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 4,
        title: "Señales y Maravillas",
        pointsPerQuestion: 25,
        questions: [
          {
            id: "mj-4-1",
            text: "¿Qué le dijo Jesús a Bartimeo para sanarlo de la ceguera?",
            options: ["'Tu fe te ha sanado'", "'Quiero, sé limpio'", "'Levántate y anda'", "'Ve y muéstrate al sacerdote'"],
            correctIndex: 0,
          },
          {
            id: "mj-4-2",
            text: "¿Cómo se llamaba el endemoniado que tenía una 'Legión' de demonios?",
            options: ["El endemoniado gadareno", "El paralítico de Betesda", "El sordo de Decápolis", "El ciego de Jericó"],
            correctIndex: 0,
          },
          {
            id: "mj-4-3",
            text: "¿Qué sucedió con los demonios 'Legión' después de ser expulsados?",
            options: ["Entraron en cerdos que se lanzaron al mar", "Desaparecieron en el aire", "El hombre quedó inconsciente", "Los demonios atacaron a los fariseos"],
            correctIndex: 0,
          },
          {
            id: "mj-4-4",
            text: "¿Qué milagro hizo Jesús con la pesca después de su resurrección?",
            options: ["Los discípulos pescaron 153 peces exactos", "Los peces saltaron solos al bote", "Multiplicó los peces para comer", "Les dio peces del cielo"],
            correctIndex: 0,
          },
          {
            id: "mj-4-5",
            text: "¿A quién sanó Jesús cuando Pedro cortó su oreja en Getsemaní?",
            options: ["Al siervo del sumo sacerdote (Malco)", "A un soldado romano", "A uno de los discípulos", "A un espectador"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 5,
        title: "Maestría MJ",
        pointsPerQuestion: 30,
        questions: [
          {
            id: "mj-5-1",
            text: "¿Cuántos ciegos sanó Jesús cuando salía de Jericó, según el Evangelio de Mateo?",
            options: ["Dos ciegos", "Un ciego", "Tres ciegos", "Cuatro ciegos"],
            correctIndex: 0,
          },
          {
            id: "mj-5-2",
            text: "¿Qué milagro ocurrió en el templo en el momento en que Jesús murió en la cruz?",
            options: ["El velo se rasgó de arriba abajo", "Llovió por 40 días", "Se abrió el Mar Rojo", "Cayó fuego del cielo"],
            correctIndex: 0,
          },
          {
            id: "mj-5-3",
            text: "¿Qué milagro involucró una moneda que Pedro encontró en la boca de un pez?",
            options: ["Para pagar el impuesto del templo", "Para dar limosna al necesitado", "Para comprar pan para la multitud", "Para devolver lo robado"],
            correctIndex: 0,
          },
          {
            id: "mj-5-4",
            text: "¿Qué hizo Jesús milagrosamente al llegar al sepulcro de Lázaro?",
            options: ["Lloró y luego ordenó que quitaran la piedra", "Oró en silencio por horas", "Tocó la piedra y se abrió sola", "Ayunó tres días antes"],
            correctIndex: 0,
          },
          {
            id: "mj-5-5",
            text: "¿Qué enfermedad tenía el hombre del estanque de Betesda que Jesús sanó?",
            options: ["Parálisis (38 años enfermo)", "Ceguera de nacimiento", "Lepra avanzada", "Sordomudez"],
            correctIndex: 0,
          },
        ],
      },
    ],
  },
  {
    id: "profetas",
    name: "Profetas",
    emoji: "🕊️",
    colorFrom: "#5BB89A",
    colorTo: "#3A9878",
    textColor: "#FFFFFF",
    description: "Mensajeros de Dios",
    levels: [
      {
        id: 1,
        title: "Grandes Profetas",
        pointsPerQuestion: 10,
        questions: [
          {
            id: "pr-1-1",
            text: "¿Qué profeta fue tragado por un gran pez y obedeció a Dios?",
            options: ["Jonás", "Elías", "Isaías", "Amós"],
            correctIndex: 0,
          },
          {
            id: "pr-1-2",
            text: "¿Cuántos días estuvo Jonás dentro del gran pez?",
            options: ["3 días y 3 noches", "7 días", "40 días", "1 día"],
            correctIndex: 0,
          },
          {
            id: "pr-1-3",
            text: "¿Qué profeta anunció: 'La virgen concebirá y dará a luz un hijo'?",
            options: ["Isaías", "Jeremías", "Miqueas", "Daniel"],
            correctIndex: 0,
          },
          {
            id: "pr-1-4",
            text: "¿Qué profeta tuvo la visión del valle de huesos secos que revivieron?",
            options: ["Ezequiel", "Daniel", "Isaías", "Jeremías"],
            correctIndex: 0,
          },
          {
            id: "pr-1-5",
            text: "¿A qué gran ciudad fue enviado Jonás a predicar arrepentimiento?",
            options: ["Nínive", "Babilonia", "Jerusalén", "Damasco"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 2,
        title: "Hombres Valientes",
        pointsPerQuestion: 15,
        questions: [
          {
            id: "pr-2-1",
            text: "¿Qué profeta desafió a 450 profetas de Baal en el monte Carmelo?",
            options: ["Elías", "Eliseo", "Jeremías", "Amós"],
            correctIndex: 0,
          },
          {
            id: "pr-2-2",
            text: "¿Qué joven profeta fue echado al foso de los leones?",
            options: ["Daniel", "Jonás", "Ezequiel", "Amós"],
            correctIndex: 0,
          },
          {
            id: "pr-2-3",
            text: "¿Qué profeta fue llamado siendo muy joven, casi un niño?",
            options: ["Jeremías", "Isaías", "Amós", "Miqueas"],
            correctIndex: 0,
          },
          {
            id: "pr-2-4",
            text: "¿Qué profeta vivió en el palacio de Babilonia y tuvo visiones proféticas?",
            options: ["Daniel", "Ezequiel", "Isaías", "Nahúm"],
            correctIndex: 0,
          },
          {
            id: "pr-2-5",
            text: "¿Quién fue el maestro y mentor del profeta Eliseo?",
            options: ["Elías", "Samuel", "Moisés", "Isaías"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 3,
        title: "Visiones Proféticas",
        pointsPerQuestion: 20,
        questions: [
          {
            id: "pr-3-1",
            text: "¿Qué profeta profetizó que el Mesías nacería en Belén?",
            options: ["Miqueas", "Isaías", "Jeremías", "Amós"],
            correctIndex: 0,
          },
          {
            id: "pr-3-2",
            text: "¿Qué profeta vivió junto al río Quebar durante el cautiverio en Babilonia?",
            options: ["Ezequiel", "Isaías", "Daniel", "Jeremías"],
            correctIndex: 0,
          },
          {
            id: "pr-3-3",
            text: "¿Qué hizo Elías en el monte Carmelo para demostrar que Jehová era el verdadero Dios?",
            options: ["Pidió que cayera fuego del cielo", "Dividió las aguas", "Resucitó muertos", "Ayunó 40 días"],
            correctIndex: 0,
          },
          {
            id: "pr-3-4",
            text: "¿Qué profeta usó su propio matrimonio como símbolo del amor de Dios por Israel?",
            options: ["Oseas", "Amós", "Miqueas", "Nahúm"],
            correctIndex: 0,
          },
          {
            id: "pr-3-5",
            text: "¿En qué nación estuvo cautivo Daniel con sus amigos Sadrac, Mesac y Abed-nego?",
            options: ["Babilonia", "Egipto", "Asiria", "Persia"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 4,
        title: "Mensajes Eternos",
        pointsPerQuestion: 25,
        questions: [
          {
            id: "pr-4-1",
            text: "¿Qué profeta era pastor y recolector de higos antes de ser llamado por Dios?",
            options: ["Amós", "Miqueas", "Oseas", "Nahúm"],
            correctIndex: 0,
          },
          {
            id: "pr-4-2",
            text: "¿Cuántos capítulos tiene el libro de Isaías, igual que los libros de la Biblia?",
            options: ["66 capítulos", "40 capítulos", "52 capítulos", "77 capítulos"],
            correctIndex: 0,
          },
          {
            id: "pr-4-3",
            text: "¿Qué profeta escribió: '¿Puede una madre olvidarse de su hijo? Aunque ella lo hiciera, yo no te olvidaré'?",
            options: ["Isaías", "Jeremías", "Amós", "Oseas"],
            correctIndex: 0,
          },
          {
            id: "pr-4-4",
            text: "¿Qué profeta fue llevado al cielo sin morir, en un torbellino?",
            options: ["Elías", "Moisés", "Enoc", "Samuel"],
            correctIndex: 0,
          },
          {
            id: "pr-4-5",
            text: "¿Cuántos libros proféticos tiene el Antiguo Testamento en total?",
            options: ["17 libros", "12 libros", "5 libros", "7 libros"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 5,
        title: "Maestría PR",
        pointsPerQuestion: 30,
        questions: [
          {
            id: "pr-5-1",
            text: "¿Qué profeta del Nuevo Testamento preparó el camino para Jesús?",
            options: ["Juan el Bautista", "Zacarías", "Simeón", "Esteban"],
            correctIndex: 0,
          },
          {
            id: "pr-5-2",
            text: "¿Qué escribió Jeremías en el capítulo 29:11 sobre los planes de Dios?",
            options: ["'Conozco los planes que tengo para ustedes, planes de bienestar'", "'No temas, yo estoy contigo'", "'Con Dios todo es posible'", "'El amor de Dios es eterno'"],
            correctIndex: 0,
          },
          {
            id: "pr-5-3",
            text: "¿Qué significa el nombre del profeta 'Isaías'?",
            options: ["'Dios es salvación'", "'Dios habla'", "'Dios es luz'", "'Dios perdona'"],
            correctIndex: 0,
          },
          {
            id: "pr-5-4",
            text: "¿Qué profeta fue comisionado con las palabras 'Ve, come este rollo y llena tu vientre'?",
            options: ["Ezequiel", "Jeremías", "Isaías", "Zacarías"],
            correctIndex: 0,
          },
          {
            id: "pr-5-5",
            text: "¿Qué profeta anunció que habría un 'nuevo pacto' diferente al de Moisés?",
            options: ["Jeremías", "Isaías", "Ezequiel", "Daniel"],
            correctIndex: 0,
          },
        ],
      },
    ],
  },
  {
    id: "versiculos",
    name: "Versículos",
    emoji: "📖",
    colorFrom: "#C4607A",
    colorTo: "#A04060",
    textColor: "#FFFFFF",
    description: "Palabras de vida",
    levels: [
      {
        id: 1,
        title: "Versículos Esenciales",
        pointsPerQuestion: 10,
        questions: [
          {
            id: "vs-1-1",
            text: "¿Cómo comienza el famoso Salmo 23?",
            options: ["'El Señor es mi pastor'", "'En el principio era el Verbo'", "'Dios es amor'", "'Porque de tal manera amó Dios'"],
            correctIndex: 0,
          },
          {
            id: "vs-1-2",
            text: "¿Cuál es la referencia del versículo 'Porque de tal manera amó Dios al mundo...'?",
            options: ["Juan 3:16", "Romanos 8:28", "Salmos 23:1", "Mateo 5:3"],
            correctIndex: 0,
          },
          {
            id: "vs-1-3",
            text: "¿Qué dice Filipenses 4:13?",
            options: ["'Todo lo puedo en Cristo que me fortalece'", "'El amor es sufrido y benigno'", "'La fe es la certeza de lo que se espera'", "'Dios proveerá todas sus necesidades'"],
            correctIndex: 0,
          },
          {
            id: "vs-1-4",
            text: "¿Cuál es el primer versículo de toda la Biblia?",
            options: ["'En el principio creó Dios los cielos y la tierra'", "'El Señor es mi pastor'", "'Dios es amor'", "'En el principio era el Verbo'"],
            correctIndex: 0,
          },
          {
            id: "vs-1-5",
            text: "¿Cuál es considerado el versículo más corto de la Biblia?",
            options: ["'Jesús lloró' (Juan 11:35)", "'Dios amó' (Juan 3:16)", "'Dad gracias' (1 Tes 5:18)", "'Orad siempre' (1 Tes 5:17)"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 2,
        title: "Referencias Clave",
        pointsPerQuestion: 15,
        questions: [
          {
            id: "vs-2-1",
            text: "¿Dónde se encuentra 'Todo lo puedo en Cristo que me fortalece'?",
            options: ["Filipenses 4:13", "Romanos 8:28", "Juan 3:16", "Salmos 27:1"],
            correctIndex: 0,
          },
          {
            id: "vs-2-2",
            text: "¿Qué dice Romanos 8:28?",
            options: ["'Sabemos que a los que aman a Dios, todas las cosas les ayudan a bien'", "'El amor cubrirá multitud de pecados'", "'En el principio era el Verbo'", "'Todo lo puedo en Cristo'"],
            correctIndex: 0,
          },
          {
            id: "vs-2-3",
            text: "¿En qué versículo dice 'No temas, porque yo estoy contigo'?",
            options: ["Isaías 41:10", "Salmos 23:4", "Filipenses 4:13", "Juan 14:6"],
            correctIndex: 0,
          },
          {
            id: "vs-2-4",
            text: "¿Qué dice Proverbios 3:5?",
            options: ["'Confía en el Señor con todo tu corazón y no te apoyes en tu propio entendimiento'", "'El amor es sufrido'", "'Busca primero el reino de Dios'", "'La fe sin obras está muerta'"],
            correctIndex: 0,
          },
          {
            id: "vs-2-5",
            text: "¿En qué libro está 'Busca primero el reino de Dios y su justicia'?",
            options: ["Mateo 6:33", "Lucas 12:31", "Juan 14:1", "Marcos 8:34"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 3,
        title: "Palabras de Vida",
        pointsPerQuestion: 20,
        questions: [
          {
            id: "vs-3-1",
            text: "¿Qué dice Juan 14:6?",
            options: ["'Yo soy el camino, la verdad y la vida'", "'Dios es amor'", "'El Señor es mi pastor'", "'Todo lo puedo en Cristo'"],
            correctIndex: 0,
          },
          {
            id: "vs-3-2",
            text: "¿En qué versículo dice 'El Señor es mi luz y mi salvación; ¿a quién temeré?'",
            options: ["Salmos 27:1", "Salmos 23:1", "Isaías 41:10", "Juan 8:12"],
            correctIndex: 0,
          },
          {
            id: "vs-3-3",
            text: "¿Qué dice 1 Corintios 13:4?",
            options: ["'El amor es sufrido, es benigno; el amor no tiene envidia'", "'Todo lo puedo en Cristo'", "'Dios es amor'", "'En el amor no hay temor'"],
            correctIndex: 0,
          },
          {
            id: "vs-3-4",
            text: "¿En qué versículo dijo Jesús: 'Yo soy la resurrección y la vida'?",
            options: ["Juan 11:25", "Juan 3:16", "Juan 14:6", "Juan 10:9"],
            correctIndex: 0,
          },
          {
            id: "vs-3-5",
            text: "¿Qué dice Proverbios 22:6?",
            options: ["'Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él'", "'El sabio teme a Dios'", "'La sabiduría clama en las calles'", "'El hijo sabio alegra al padre'"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 4,
        title: "Promesas Divinas",
        pointsPerQuestion: 25,
        questions: [
          {
            id: "vs-4-1",
            text: "¿Qué dice Jeremías 29:11?",
            options: ["'Porque yo sé los planes que tengo para ustedes, planes de bienestar'", "'El amor de Dios es eterno'", "'Con Dios todo es posible'", "'No temas, yo estoy contigo'"],
            correctIndex: 0,
          },
          {
            id: "vs-4-2",
            text: "¿Dónde se encuentra la bendición 'El Señor te bendiga y te guarde'?",
            options: ["Números 6:24", "Salmos 121:8", "Proverbios 3:5", "Deuteronomio 6:4"],
            correctIndex: 0,
          },
          {
            id: "vs-4-3",
            text: "¿Qué dice Isaías 40:31?",
            options: ["'Los que esperan en el Señor renovarán sus fuerzas, volarán como águilas'", "'No temas porque yo estoy contigo'", "'Con Dios todo es posible'", "'El amor es sufrido y benigno'"],
            correctIndex: 0,
          },
          {
            id: "vs-4-4",
            text: "¿En qué versículos está la 'Gran Comisión' de Jesús a sus discípulos?",
            options: ["Mateo 28:19-20", "Marcos 16:15", "Lucas 24:47", "Juan 20:21"],
            correctIndex: 0,
          },
          {
            id: "vs-4-5",
            text: "¿Qué dice Juan 3:16 sobre el amor de Dios?",
            options: ["'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito'", "'Todo lo puedo en Cristo que me fortalece'", "'El Señor es mi pastor'", "'Yo soy el camino la verdad y la vida'"],
            correctIndex: 0,
          },
        ],
      },
      {
        id: 5,
        title: "Maestría VS",
        pointsPerQuestion: 30,
        questions: [
          {
            id: "vs-5-1",
            text: "¿Qué versículo dice 'La fe es la certeza de lo que se espera, la convicción de lo que no se ve'?",
            options: ["Hebreos 11:1", "Romanos 10:17", "Santiago 2:17", "1 Corintios 13:13"],
            correctIndex: 0,
          },
          {
            id: "vs-5-2",
            text: "¿Dónde dice 'El que comenzó en ustedes la buena obra la perfeccionará'?",
            options: ["Filipenses 1:6", "Romanos 8:28", "2 Timoteo 1:12", "1 Pedro 5:10"],
            correctIndex: 0,
          },
          {
            id: "vs-5-3",
            text: "¿Qué contiene Mateo 6:9-13?",
            options: ["El Padre Nuestro (la oración modelo)", "Las Bienaventuranzas", "El Gran Mandamiento", "La Gran Comisión"],
            correctIndex: 0,
          },
          {
            id: "vs-5-4",
            text: "¿Qué dice 2 Timoteo 3:16 sobre las Escrituras?",
            options: ["'Toda la Escritura es inspirada por Dios y útil para enseñar...'", "'El amor de Dios ha sido derramado'", "'La gracia de Dios ha aparecido'", "'Toda rodilla se doblará ante Dios'"],
            correctIndex: 0,
          },
          {
            id: "vs-5-5",
            text: "¿Qué dice Salmos 37:5?",
            options: ["'Encomienda a Jehová tu camino, confía en él; y él hará'", "'Proverbios 16:3 dice lo mismo'", "'El Señor es mi fuerza'", "'Solo en Dios halla descanso mi alma'"],
            correctIndex: 0,
          },
        ],
      },
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getLevelById(categoryId: string, levelId: number) {
  const category = getCategoryById(categoryId);
  return category?.levels.find((l) => l.id === levelId);
}

export const MAX_LIVES = 3;
export const TOTAL_QUESTIONS_PER_LEVEL = 5;
