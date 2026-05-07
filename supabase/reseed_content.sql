-- Reto Biblico: reset parcial y seed de contenido
-- Generado automaticamente desde src/app/data/gameData.ts
-- Este script reinicia solo tablas de contenido y tablas auxiliares del juego.
-- No elimina auth.users ni configuraciones del proyecto.

begin;

create extension if not exists pgcrypto;

drop table if exists public.questions cascade;
drop table if exists public.levels cascade;
drop table if exists public.categories cascade;
drop table if exists public.user_level_progress cascade;
drop table if exists public.game_sessions cascade;

create table public.categories (
  id text primary key,
  name text not null,
  emoji text not null,
  description text,
  color_from text not null,
  color_to text not null,
  text_color text not null default '#FFFFFF',
  icon text,
  color text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.levels (
  id text primary key,
  category_id text not null references public.categories(id) on delete cascade,
  number integer not null,
  title text not null,
  points_per_question integer not null default 10,
  required_points integer not null default 0,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category_id, number)
);

create table public.questions (
  id text primary key,
  level_id text not null references public.levels(id) on delete cascade,
  text text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  options jsonb not null default '[]'::jsonb,
  correct_index integer not null default 0,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_level_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id text not null,
  level_id integer not null,
  points integer not null default 0,
  stars integer not null default 0,
  correct_answers integer not null default 0,
  total_questions integer not null default 0,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, category_id, level_id)
);

create table public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id text not null,
  level_id integer not null,
  score integer not null default 0,
  correct_answers integer not null default 0,
  wrong_answers integer not null default 0,
  local_lives integer not null default 3,
  completed boolean not null default false,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_levels_category_id on public.levels(category_id);
create index idx_questions_level_id on public.questions(level_id);
create index idx_user_level_progress_user_id on public.user_level_progress(user_id);
create index idx_game_sessions_user_id on public.game_sessions(user_id);

insert into public.categories (
  id,
  name,
  emoji,
  description,
  color_from,
  color_to,
  text_color,
  icon,
  color,
  is_active,
  sort_order
)
values
  ('antiguo-testamento', 'Antiguo Testamento', chr(128220), 'Génesis al Malaquías', '#4A7FD4', '#2C5FAA', '#FFFFFF', 'scroll', 'blue', true, 1),
  ('nuevo-testamento', 'Nuevo Testamento', chr(10013) || chr(65039), 'Mateo al Apocalipsis', '#7B5FBB', '#5A3F9A', '#FFFFFF', 'book-open', 'purple', true, 2),
  ('personajes', 'Personajes Bíblicos', chr(128100), 'Héroes de la fe', '#D4925B', '#B87040', '#FFFFFF', 'users', 'amber', true, 3),
  ('milagros', 'Milagros de Jesús', chr(10024), 'Obras maravillosas', '#D4A520', '#B88800', '#FFFFFF', 'sparkles', 'sky', true, 4),
  ('profetas', 'Profetas', chr(128302), 'Mensajeros de Dios', '#5BB89A', '#3A9878', '#FFFFFF', 'book-open', 'blue', true, 5),
  ('versiculos', 'Versículos', chr(128214), 'Palabras de vida', '#C4607A', '#A04060', '#FFFFFF', 'quote', 'gold', true, 6)
;

insert into public.levels (
  id,
  category_id,
  number,
  title,
  points_per_question,
  required_points,
  is_active,
  sort_order
)
values
  ('antiguo-testamento-1', 'antiguo-testamento', 1, 'Nivel Básico', 10, 0, true, 1),
  ('antiguo-testamento-2', 'antiguo-testamento', 2, 'Patriarcas', 15, 50, true, 2),
  ('antiguo-testamento-3', 'antiguo-testamento', 3, 'Éxodo y Reyes', 20, 100, true, 3),
  ('antiguo-testamento-4', 'antiguo-testamento', 4, 'Historia Sagrada', 25, 150, true, 4),
  ('antiguo-testamento-5', 'antiguo-testamento', 5, 'Maestría', 30, 200, true, 5),
  ('nuevo-testamento-1', 'nuevo-testamento', 1, 'Evangelios', 10, 0, true, 1),
  ('nuevo-testamento-2', 'nuevo-testamento', 2, 'Pasión y Resurrección', 15, 50, true, 2),
  ('nuevo-testamento-3', 'nuevo-testamento', 3, 'Hechos y Cartas', 20, 100, true, 3),
  ('nuevo-testamento-4', 'nuevo-testamento', 4, 'Epístolas', 25, 150, true, 4),
  ('nuevo-testamento-5', 'nuevo-testamento', 5, 'Maestría NT', 30, 200, true, 5),
  ('personajes-1', 'personajes', 1, 'Los Patriarcas', 10, 0, true, 1),
  ('personajes-2', 'personajes', 2, 'Líderes de Israel', 15, 50, true, 2),
  ('personajes-3', 'personajes', 3, 'Reyes y Reinas', 20, 100, true, 3),
  ('personajes-4', 'personajes', 4, 'Mujeres de Fe', 25, 150, true, 4),
  ('personajes-5', 'personajes', 5, 'Maestría PB', 30, 200, true, 5),
  ('milagros-1', 'milagros', 1, 'Primeros Milagros', 10, 0, true, 1),
  ('milagros-2', 'milagros', 2, 'Fe y Sanidad', 15, 50, true, 2),
  ('milagros-3', 'milagros', 3, 'Poder Divino', 20, 100, true, 3),
  ('milagros-4', 'milagros', 4, 'Señales y Maravillas', 25, 150, true, 4),
  ('milagros-5', 'milagros', 5, 'Maestría MJ', 30, 200, true, 5),
  ('profetas-1', 'profetas', 1, 'Grandes Profetas', 10, 0, true, 1),
  ('profetas-2', 'profetas', 2, 'Hombres Valientes', 15, 50, true, 2),
  ('profetas-3', 'profetas', 3, 'Visiones Proféticas', 20, 100, true, 3),
  ('profetas-4', 'profetas', 4, 'Mensajes Eternos', 25, 150, true, 4),
  ('profetas-5', 'profetas', 5, 'Maestría PR', 30, 200, true, 5),
  ('versiculos-1', 'versiculos', 1, 'Versículos Esenciales', 10, 0, true, 1),
  ('versiculos-2', 'versiculos', 2, 'Referencias Clave', 15, 50, true, 2),
  ('versiculos-3', 'versiculos', 3, 'Palabras de Vida', 20, 100, true, 3),
  ('versiculos-4', 'versiculos', 4, 'Promesas Divinas', 25, 150, true, 4),
  ('versiculos-5', 'versiculos', 5, 'Maestría VS', 30, 200, true, 5)
;

insert into public.questions (
  id,
  level_id,
  text,
  option_a,
  option_b,
  option_c,
  option_d,
  options,
  correct_index,
  is_active,
  sort_order
)
values
  ('at-1-1', 'antiguo-testamento-1', '¿Quién construyó el arca según el libro de Génesis?', 'Noé', 'Abraham', 'Moisés', 'David', '["Noé","Abraham","Moisés","David"]', 0, true, 1),
  ('at-1-2', 'antiguo-testamento-1', '¿En qué jardín vivieron Adán y Eva al inicio?', 'Edén', 'Getsemaní', 'Sinaí', 'Nazaret', '["Edén","Getsemaní","Sinaí","Nazaret"]', 0, true, 2),
  ('at-1-3', 'antiguo-testamento-1', '¿Cuántos días y noches llovió durante el diluvio?', '40 días y 40 noches', '7 días', '100 días', '20 días', '["40 días y 40 noches","7 días","100 días","20 días"]', 0, true, 3),
  ('at-1-4', 'antiguo-testamento-1', '¿Quién mató al gigante Goliat con una honda?', 'David', 'Saúl', 'Jonatán', 'Elías', '["David","Saúl","Jonatán","Elías"]', 0, true, 4),
  ('at-1-5', 'antiguo-testamento-1', '¿Cuántos mandamientos le dio Dios a Moisés en el monte Sinaí?', '10', '5', '7', '12', '["10","5","7","12"]', 0, true, 5),
  ('at-2-1', 'antiguo-testamento-2', '¿Cuántos hijos tuvo Jacob, padre de las doce tribus?', '12', '10', '7', '14', '["12","10","7","14"]', 0, true, 1),
  ('at-2-2', 'antiguo-testamento-2', '¿Quién fue vendido por sus hermanos a los egipcios?', 'José', 'Benjamín', 'Rubén', 'Judá', '["José","Benjamín","Rubén","Judá"]', 0, true, 2),
  ('at-2-3', 'antiguo-testamento-2', '¿Qué instrumento tocaba el rey David?', 'Arpa', 'Flauta', 'Trompeta', 'Tambor', '["Arpa","Flauta","Trompeta","Tambor"]', 0, true, 3),
  ('at-2-4', 'antiguo-testamento-2', '¿Qué animal habló con Eva en el jardín del Edén?', 'Una serpiente', 'Un águila', 'Un burro', 'Un cordero', '["Una serpiente","Un águila","Un burro","Un cordero"]', 0, true, 4),
  ('at-2-5', 'antiguo-testamento-2', '¿Cuál fue el primer rey de Israel?', 'Saúl', 'David', 'Salomón', 'Samuel', '["Saúl","David","Salomón","Samuel"]', 0, true, 5),
  ('at-3-1', 'antiguo-testamento-3', '¿Cuántos años estuvo el pueblo de Israel en el desierto?', '40 años', '20 años', '100 años', '70 años', '["40 años","20 años","100 años","70 años"]', 0, true, 1),
  ('at-3-2', 'antiguo-testamento-3', '¿Qué cuerpo de agua cruzó Moisés con el pueblo de Israel?', 'El Mar Rojo', 'El río Nilo', 'El río Jordán', 'El lago de Galilea', '["El Mar Rojo","El río Nilo","El río Jordán","El lago de Galilea"]', 0, true, 2),
  ('at-3-3', 'antiguo-testamento-3', '¿Con qué alimento milagroso alimentó Dios a los israelitas en el desierto?', 'Maná', 'Pan horneado', 'Carne de ángel', 'Frutas del cielo', '["Maná","Pan horneado","Carne de ángel","Frutas del cielo"]', 0, true, 3),
  ('at-3-4', 'antiguo-testamento-3', '¿Quién fue el sabio rey que construyó el primer templo de Jerusalén?', 'Salomón', 'David', 'Ezequías', 'Josías', '["Salomón","David","Ezequías","Josías"]', 0, true, 4),
  ('at-3-5', 'antiguo-testamento-3', '¿Cuántas plagas envió Dios sobre Egipto?', '10', '7', '12', '5', '["10","7","12","5"]', 0, true, 5),
  ('at-4-1', 'antiguo-testamento-4', '¿En qué libro bíblico está escrita la historia de la reina Ester?', 'Ester', 'Rut', 'Nehemías', 'Esdrás', '["Ester","Rut","Nehemías","Esdrás"]', 0, true, 1),
  ('at-4-2', 'antiguo-testamento-4', '¿Qué profeta fue tragado por un gran pez?', 'Jonás', 'Elías', 'Ezequiel', 'Jeremías', '["Jonás","Elías","Ezequiel","Jeremías"]', 0, true, 2),
  ('at-4-3', 'antiguo-testamento-4', '¿Qué profeta fue llevado al cielo en un carro de fuego?', 'Elías', 'Moisés', 'Enoc', 'Ezequiel', '["Elías","Moisés","Enoc","Ezequiel"]', 0, true, 3),
  ('at-4-4', 'antiguo-testamento-4', '¿De quién huyó David cuando era joven y perseguido?', 'Del rey Saúl', 'De Goliat', 'De los filisteos', 'De Absalón', '["Del rey Saúl","De Goliat","De los filisteos","De Absalón"]', 0, true, 4),
  ('at-4-5', 'antiguo-testamento-4', '¿Quién escribió los cinco primeros libros de la Biblia?', 'Moisés', 'David', 'Salomón', 'Samuel', '["Moisés","David","Salomón","Samuel"]', 0, true, 5),
  ('at-5-1', 'antiguo-testamento-5', '¿Cuántos años vivió Matusalén, el hombre más longevo de la Biblia?', '969 años', '777 años', '900 años', '850 años', '["969 años","777 años","900 años","850 años"]', 0, true, 1),
  ('at-5-2', 'antiguo-testamento-5', '¿Qué representaban las 7 vacas gordas en el sueño del Faraón que interpretó José?', '7 años de abundancia', '7 reinos prósperos', '7 plagas', '7 eras de paz', '["7 años de abundancia","7 reinos prósperos","7 plagas","7 eras de paz"]', 0, true, 2),
  ('at-5-3', 'antiguo-testamento-5', '¿Qué prometió Dios a Abraham como señal del pacto?', 'Descendencia como las estrellas', 'Un reino eterno', 'Un templo sagrado', 'Un libro de sabiduría', '["Descendencia como las estrellas","Un reino eterno","Un templo sagrado","Un libro de sabiduría"]', 0, true, 3),
  ('at-5-4', 'antiguo-testamento-5', '¿En qué ciudad fue construido el templo de Salomón?', 'Jerusalén', 'Belén', 'Hebrón', 'Samaria', '["Jerusalén","Belén","Hebrón","Samaria"]', 0, true, 4),
  ('at-5-5', 'antiguo-testamento-5', '¿Qué arma usó Sansón para derrotar a sus enemigos en una batalla?', 'Quijada de burro', 'Una espada', 'Una honda', 'Una lanza', '["Quijada de burro","Una espada","Una honda","Una lanza"]', 0, true, 5),
  ('nt-1-1', 'nuevo-testamento-1', '¿En qué ciudad nació Jesús?', 'Belén', 'Nazaret', 'Jerusalén', 'Jericó', '["Belén","Nazaret","Jerusalén","Jericó"]', 0, true, 1),
  ('nt-1-2', 'nuevo-testamento-1', '¿Cuántos apóstoles eligió Jesús para su ministerio?', '12', '10', '7', '14', '["12","10","7","14"]', 0, true, 2),
  ('nt-1-3', 'nuevo-testamento-1', '¿Quién bautizó a Jesús en el río Jordán?', 'Juan el Bautista', 'Pedro', 'Pablo', 'Andrés', '["Juan el Bautista","Pedro","Pablo","Andrés"]', 0, true, 3),
  ('nt-1-4', 'nuevo-testamento-1', '¿En qué evento Jesús convirtió el agua en vino?', 'Bodas de Caná', 'Bodas de Galilea', 'Última Cena', 'Pentecostés', '["Bodas de Caná","Bodas de Galilea","Última Cena","Pentecostés"]', 0, true, 4),
  ('nt-1-5', 'nuevo-testamento-1', '¿Cuántos días estuvo Jesús en el desierto siendo tentado por el diablo?', '40 días', '7 días', '20 días', '3 días', '["40 días","7 días","20 días","3 días"]', 0, true, 5),
  ('nt-2-1', 'nuevo-testamento-2', '¿Quién traicionó a Jesús por 30 monedas de plata?', 'Judas Iscariote', 'Pedro', 'Tomás', 'Bartolomé', '["Judas Iscariote","Pedro","Tomás","Bartolomé"]', 0, true, 1),
  ('nt-2-2', 'nuevo-testamento-2', '¿Cuántos panes usó Jesús para alimentar a 5000 personas?', '5 panes', '7 panes', '3 panes', '10 panes', '["5 panes","7 panes","3 panes","10 panes"]', 0, true, 2),
  ('nt-2-3', 'nuevo-testamento-2', '¿Qué apóstol negó conocer a Jesús tres veces?', 'Pedro', 'Juan', 'Tomás', 'Andrés', '["Pedro","Juan","Tomás","Andrés"]', 0, true, 3),
  ('nt-2-4', 'nuevo-testamento-2', '¿En qué día resucitó Jesús según las Escrituras?', 'El primer día (domingo)', 'El sábado', 'El viernes', 'El lunes', '["El primer día (domingo)","El sábado","El viernes","El lunes"]', 0, true, 4),
  ('nt-2-5', 'nuevo-testamento-2', '¿Cuántos peces había junto a los panes para alimentar a la multitud?', '2 peces', '5 peces', '7 peces', '3 peces', '["2 peces","5 peces","7 peces","3 peces"]', 0, true, 5),
  ('nt-3-1', 'nuevo-testamento-3', '¿Quién escribió la mayoría de las cartas del Nuevo Testamento?', 'Pablo', 'Pedro', 'Juan', 'Santiago', '["Pablo","Pedro","Juan","Santiago"]', 0, true, 1),
  ('nt-3-2', 'nuevo-testamento-3', '¿En qué lugar fue crucificado Jesús?', 'El Gólgota (Calvario)', 'El monte Sinaí', 'El jardín de Getsemaní', 'El templo', '["El Gólgota (Calvario)","El monte Sinaí","El jardín de Getsemaní","El templo"]', 0, true, 2),
  ('nt-3-3', 'nuevo-testamento-3', '¿Cuántos días después de morir resucitó Jesús?', 'Al tercer día', 'Al primer día', 'Al séptimo día', 'A los 40 días', '["Al tercer día","Al primer día","Al séptimo día","A los 40 días"]', 0, true, 3),
  ('nt-3-4', 'nuevo-testamento-3', '¿A quién resucitó Jesús que era su querido amigo y llevaba 4 días muerto?', 'Lázaro', 'Jairo', 'Zaqueo', 'Nicodemo', '["Lázaro","Jairo","Zaqueo","Nicodemo"]', 0, true, 4),
  ('nt-3-5', 'nuevo-testamento-3', '¿En qué ciudad ocurrió el milagro de Pentecostés?', 'Jerusalén', 'Belén', 'Antioquía', 'Roma', '["Jerusalén","Belén","Antioquía","Roma"]', 0, true, 5),
  ('nt-4-1', 'nuevo-testamento-4', '¿Quién fue el primer mártir cristiano mencionado en el libro de Hechos?', 'Esteban', 'Pablo', 'Pedro', 'Jacobo', '["Esteban","Pablo","Pedro","Jacobo"]', 0, true, 1),
  ('nt-4-2', 'nuevo-testamento-4', '¿Cuántos años tenía Jesús cuando comenzó su ministerio público?', '30 años', '25 años', '33 años', '28 años', '["30 años","25 años","33 años","28 años"]', 0, true, 2),
  ('nt-4-3', 'nuevo-testamento-4', '¿Qué nombre significa ''el ungido'' o ''el Mesías''?', 'Cristo', 'Jesús', 'Emanuel', 'Señor', '["Cristo","Jesús","Emanuel","Señor"]', 0, true, 3),
  ('nt-4-4', 'nuevo-testamento-4', '¿Cómo se llama el último libro del Nuevo Testamento?', 'Apocalipsis', 'Hebreos', 'Judas', '3 Juan', '["Apocalipsis","Hebreos","Judas","3 Juan"]', 0, true, 4),
  ('nt-4-5', 'nuevo-testamento-4', '¿Cuántos libros tiene el Nuevo Testamento?', '27 libros', '39 libros', '66 libros', '12 libros', '["27 libros","39 libros","66 libros","12 libros"]', 0, true, 5),
  ('nt-5-1', 'nuevo-testamento-5', '¿Quién escribió el libro de Apocalipsis?', 'Juan', 'Pablo', 'Pedro', 'Mateo', '["Juan","Pablo","Pedro","Mateo"]', 0, true, 1),
  ('nt-5-2', 'nuevo-testamento-5', '¿Qué significa el nombre ''Jesús'' en hebreo (Yeshua)?', 'Dios salva', 'Hijo de Dios', 'Rey eterno', 'Luz del mundo', '["Dios salva","Hijo de Dios","Rey eterno","Luz del mundo"]', 0, true, 2),
  ('nt-5-3', 'nuevo-testamento-5', '¿Dónde dio Jesús el famoso Sermón del Monte?', 'Monte de las Bienaventuranzas', 'Monte Sinaí', 'Monte Carmelo', 'Monte Hermón', '["Monte de las Bienaventuranzas","Monte Sinaí","Monte Carmelo","Monte Hermón"]', 0, true, 3),
  ('nt-5-4', 'nuevo-testamento-5', '¿Quiénes fueron los primeros apóstoles llamados por Jesús?', 'Andrés y Pedro', 'Juan y Jacobo', 'Mateo y Tomás', 'Felipe y Natanael', '["Andrés y Pedro","Juan y Jacobo","Mateo y Tomás","Felipe y Natanael"]', 0, true, 4),
  ('nt-5-5', 'nuevo-testamento-5', '¿En qué versículo Jesús dice ''Yo soy el camino, la verdad y la vida''?', 'Juan 14:6', 'Juan 3:16', 'Juan 11:25', 'Juan 10:9', '["Juan 14:6","Juan 3:16","Juan 11:25","Juan 10:9"]', 0, true, 5),
  ('pb-1-1', 'personajes-1', '¿Quién es conocido como ''el padre de la fe'' en la Biblia?', 'Abraham', 'Moisés', 'David', 'Noé', '["Abraham","Moisés","David","Noé"]', 0, true, 1),
  ('pb-1-2', 'personajes-1', '¿Quién fue la esposa de Abraham?', 'Sara', 'Rebeca', 'Raquel', 'Lea', '["Sara","Rebeca","Raquel","Lea"]', 0, true, 2),
  ('pb-1-3', 'personajes-1', '¿Quién fue el hijo de la promesa de Abraham y Sara?', 'Isaac', 'Ismael', 'Esaú', 'Jacob', '["Isaac","Ismael","Esaú","Jacob"]', 0, true, 3),
  ('pb-1-4', 'personajes-1', '¿Qué hijo de Isaac robó la bendición de la primogenitura?', 'Jacob', 'Esaú', 'José', 'Rubén', '["Jacob","Esaú","José","Rubén"]', 0, true, 4),
  ('pb-1-5', 'personajes-1', '¿Cómo se llamó la madre de Jesús?', 'María', 'Marta', 'Elizabet', 'Ana', '["María","Marta","Elizabet","Ana"]', 0, true, 5),
  ('pb-2-1', 'personajes-2', '¿Quién fue el general que conquistó la ciudad de Jericó?', 'Josué', 'Moisés', 'Caleb', 'Gedeón', '["Josué","Moisés","Caleb","Gedeón"]', 0, true, 1),
  ('pb-2-2', 'personajes-2', '¿Quién fue la primera mujer mencionada en la Biblia?', 'Eva', 'Sara', 'Raquel', 'Rut', '["Eva","Sara","Raquel","Rut"]', 0, true, 2),
  ('pb-2-3', 'personajes-2', '¿Qué apóstol era cobrador de impuestos antes de seguir a Jesús?', 'Mateo', 'Zaqueo', 'Lucas', 'Juan', '["Mateo","Zaqueo","Lucas","Juan"]', 0, true, 3),
  ('pb-2-4', 'personajes-2', '¿Quién era la hermana de Lázaro y amiga de Jesús?', 'Marta y María', 'Salomé', 'Lidia', 'Priscila', '["Marta y María","Salomé","Lidia","Priscila"]', 0, true, 4),
  ('pb-2-5', 'personajes-2', '¿Quién fue el suegro de Moisés que lo aconsejó sabiamente?', 'Jetro', 'Aarón', 'Caleb', 'Josué', '["Jetro","Aarón","Caleb","Josué"]', 0, true, 5),
  ('pb-3-1', 'personajes-3', '¿Quién fue el segundo rey de Israel, amado por Dios?', 'David', 'Saúl', 'Salomón', 'Roboam', '["David","Saúl","Salomón","Roboam"]', 0, true, 1),
  ('pb-3-2', 'personajes-3', '¿Qué apóstol dudó de la resurrección hasta ver a Jesús en persona?', 'Tomás', 'Pedro', 'Judas', 'Felipe', '["Tomás","Pedro","Judas","Felipe"]', 0, true, 2),
  ('pb-3-3', 'personajes-3', '¿Quién visitó a Jesús de noche por temor a los judíos?', 'Nicodemo', 'José de Arimatea', 'Jairo', 'Zaqueo', '["Nicodemo","José de Arimatea","Jairo","Zaqueo"]', 0, true, 3),
  ('pb-3-4', 'personajes-3', '¿Qué reina salvó a su pueblo de una masacre planeada?', 'Ester', 'Rut', 'Débora', 'Abigaíl', '["Ester","Rut","Débora","Abigaíl"]', 0, true, 4),
  ('pb-3-5', 'personajes-3', '¿Quién interpretó los sueños del faraón de Egipto?', 'José', 'Daniel', 'Samuel', 'Moisés', '["José","Daniel","Samuel","Moisés"]', 0, true, 5),
  ('pb-4-1', 'personajes-4', '¿Quién fue la primera jueza y profetisa de Israel?', 'Débora', 'Ester', 'Rut', 'Noemí', '["Débora","Ester","Rut","Noemí"]', 0, true, 1),
  ('pb-4-2', 'personajes-4', '¿Quién fue el primer homicida de la historia bíblica?', 'Caín', 'Lamec', 'Esaú', 'Sansón', '["Caín","Lamec","Esaú","Sansón"]', 0, true, 2),
  ('pb-4-3', 'personajes-4', '¿Quién fue la suegra de Rut, que la guió con amor?', 'Noemí', 'Ester', 'Débora', 'Ana', '["Noemí","Ester","Débora","Ana"]', 0, true, 3),
  ('pb-4-4', 'personajes-4', '¿Qué apóstol fue el primero en morir como mártir entre los doce?', 'Jacobo (Santiago)', 'Pedro', 'Juan', 'Andrés', '["Jacobo (Santiago)","Pedro","Juan","Andrés"]', 0, true, 4),
  ('pb-4-5', 'personajes-4', '¿Quién fue el padre de Juan el Bautista?', 'Zacarías', 'Eliseo', 'Simeón', 'José', '["Zacarías","Eliseo","Simeón","José"]', 0, true, 5),
  ('pb-5-1', 'personajes-5', '¿Quién es conocido como ''el discípulo amado'' de Jesús?', 'Juan', 'Pedro', 'Andrés', 'Jacobo', '["Juan","Pedro","Andrés","Jacobo"]', 0, true, 1),
  ('pb-5-2', 'personajes-5', '¿Quién fue el primer hombre que no murió sino que fue llevado al cielo directamente?', 'Enoc', 'Elías', 'Moisés', 'Abel', '["Enoc","Elías","Moisés","Abel"]', 0, true, 2),
  ('pb-5-3', 'personajes-5', '¿Quién fue el hijo de David que construyó el grandioso templo?', 'Salomón', 'Absalón', 'Adonías', 'Natán', '["Salomón","Absalón","Adonías","Natán"]', 0, true, 3),
  ('pb-5-4', 'personajes-5', '¿Cómo se llamaba el padre adoptivo de Jesús?', 'José', 'Zacarías', 'Simón', 'Cleofas', '["José","Zacarías","Simón","Cleofas"]', 0, true, 4),
  ('pb-5-5', 'personajes-5', '¿Qué reina del sur viajó desde lejos para escuchar la sabiduría de Salomón?', 'Reina de Saba', 'Reina de Egipto', 'Jezabel', 'Atalía', '["Reina de Saba","Reina de Egipto","Jezabel","Atalía"]', 0, true, 5),
  ('mj-1-1', 'milagros-1', '¿Cuál fue el primer milagro registrado de Jesús?', 'Convertir agua en vino', 'Sanar un ciego', 'Resucitar a Lázaro', 'Caminar sobre el agua', '["Convertir agua en vino","Sanar un ciego","Resucitar a Lázaro","Caminar sobre el agua"]', 0, true, 1),
  ('mj-1-2', 'milagros-1', '¿A quién resucitó Jesús que era su amado amigo?', 'Lázaro', 'Jairo', 'Bartimeo', 'Zaqueo', '["Lázaro","Jairo","Bartimeo","Zaqueo"]', 0, true, 2),
  ('mj-1-3', 'milagros-1', '¿A cuántas personas alimentó Jesús con 5 panes y 2 peces?', '5,000 personas', '1,000 personas', '3,000 personas', '10,000 personas', '["5,000 personas","1,000 personas","3,000 personas","10,000 personas"]', 0, true, 3),
  ('mj-1-4', 'milagros-1', '¿Qué hizo Jesús cuando había una gran tormenta en el mar?', 'Calmó el viento y las olas', 'Caminó sobre el agua', 'Sacó a Pedro del agua', 'Oró toda la noche', '["Calmó el viento y las olas","Caminó sobre el agua","Sacó a Pedro del agua","Oró toda la noche"]', 0, true, 4),
  ('mj-1-5', 'milagros-1', '¿Qué enfermedad tenían los 10 hombres que Jesús sanó a la vez?', 'Lepra', 'Ceguera', 'Sordera', 'Parálisis', '["Lepra","Ceguera","Sordera","Parálisis"]', 0, true, 5),
  ('mj-2-1', 'milagros-2', '¿Qué apóstol caminó sobre el agua junto a Jesús?', 'Pedro', 'Juan', 'Andrés', 'Jacobo', '["Pedro","Juan","Andrés","Jacobo"]', 0, true, 1),
  ('mj-2-2', 'milagros-2', '¿Cómo llamó Jesús a Lázaro para resucitarlo?', '''¡Lázaro, sal fuera!''', '''Lázaro, levántate''', '''Vive en el nombre de Dios''', '''Lázaro, despierta''', '["''¡Lázaro, sal fuera!''","''Lázaro, levántate''","''Vive en el nombre de Dios''","''Lázaro, despierta''"]', 0, true, 2),
  ('mj-2-3', 'milagros-2', '¿Cuántos años llevaba enferma la mujer que tocó el manto de Jesús?', '12 años', '7 años', '40 años', '3 años', '["12 años","7 años","40 años","3 años"]', 0, true, 3),
  ('mj-2-4', 'milagros-2', '¿Qué le sucedía a la hija de Jairo que Jesús sanó milagrosamente?', 'Había muerto (la resucitó)', 'Tenía lepra', 'Era ciega de nacimiento', 'Tenía fiebre alta', '["Había muerto (la resucitó)","Tenía lepra","Era ciega de nacimiento","Tenía fiebre alta"]', 0, true, 4),
  ('mj-2-5', 'milagros-2', '¿En qué ciudad convirtió Jesús el agua en vino?', 'Caná', 'Belén', 'Nazaret', 'Capernaúm', '["Caná","Belén","Nazaret","Capernaúm"]', 0, true, 5),
  ('mj-3-1', 'milagros-3', '¿Cuántas tinajas de agua convirtió Jesús en vino en las bodas?', '6 tinajas', '3 tinajas', '12 tinajas', '7 tinajas', '["6 tinajas","3 tinajas","12 tinajas","7 tinajas"]', 0, true, 1),
  ('mj-3-2', 'milagros-3', '¿Cómo sanó Jesús al ciego de nacimiento?', 'Hizo barro con tierra y lo puso en sus ojos', 'Solo lo tocó', 'Solo oró por él', 'Le habló al oído', '["Hizo barro con tierra y lo puso en sus ojos","Solo lo tocó","Solo oró por él","Le habló al oído"]', 0, true, 2),
  ('mj-3-3', 'milagros-3', '¿A dónde mandó Jesús al ciego de nacimiento después de aplicarle el barro?', 'A lavarse en el estanque de Siloé', 'Al río Jordán', 'Al templo', 'A su casa', '["A lavarse en el estanque de Siloé","Al río Jordán","Al templo","A su casa"]', 0, true, 3),
  ('mj-3-4', 'milagros-3', '¿Qué árbol fue maldecido por Jesús y se secó completamente?', 'Una higuera', 'Un olivo', 'Un cedro', 'Una vid', '["Una higuera","Un olivo","Un cedro","Una vid"]', 0, true, 4),
  ('mj-3-5', 'milagros-3', '¿Qué dijo Jesús al paralítico en Capernaúm para sanarlo?', '''Levántate, toma tu camilla y anda''', 'Solo lo tocó en la espalda', '''Ve y no peques más''', 'Le echó agua sagrada', '["''Levántate, toma tu camilla y anda''","Solo lo tocó en la espalda","''Ve y no peques más''","Le echó agua sagrada"]', 0, true, 5),
  ('mj-4-1', 'milagros-4', '¿Qué le dijo Jesús a Bartimeo para sanarlo de la ceguera?', '''Tu fe te ha sanado''', '''Quiero, sé limpio''', '''Levántate y anda''', '''Ve y muéstrate al sacerdote''', '["''Tu fe te ha sanado''","''Quiero, sé limpio''","''Levántate y anda''","''Ve y muéstrate al sacerdote''"]', 0, true, 1),
  ('mj-4-2', 'milagros-4', '¿Cómo se llamaba el endemoniado que tenía una ''Legión'' de demonios?', 'El endemoniado gadareno', 'El paralítico de Betesda', 'El sordo de Decápolis', 'El ciego de Jericó', '["El endemoniado gadareno","El paralítico de Betesda","El sordo de Decápolis","El ciego de Jericó"]', 0, true, 2),
  ('mj-4-3', 'milagros-4', '¿Qué sucedió con los demonios ''Legión'' después de ser expulsados?', 'Entraron en cerdos que se lanzaron al mar', 'Desaparecieron en el aire', 'El hombre quedó inconsciente', 'Los demonios atacaron a los fariseos', '["Entraron en cerdos que se lanzaron al mar","Desaparecieron en el aire","El hombre quedó inconsciente","Los demonios atacaron a los fariseos"]', 0, true, 3),
  ('mj-4-4', 'milagros-4', '¿Qué milagro hizo Jesús con la pesca después de su resurrección?', 'Los discípulos pescaron 153 peces exactos', 'Los peces saltaron solos al bote', 'Multiplicó los peces para comer', 'Les dio peces del cielo', '["Los discípulos pescaron 153 peces exactos","Los peces saltaron solos al bote","Multiplicó los peces para comer","Les dio peces del cielo"]', 0, true, 4),
  ('mj-4-5', 'milagros-4', '¿A quién sanó Jesús cuando Pedro cortó su oreja en Getsemaní?', 'Al siervo del sumo sacerdote (Malco)', 'A un soldado romano', 'A uno de los discípulos', 'A un espectador', '["Al siervo del sumo sacerdote (Malco)","A un soldado romano","A uno de los discípulos","A un espectador"]', 0, true, 5),
  ('mj-5-1', 'milagros-5', '¿Cuántos ciegos sanó Jesús cuando salía de Jericó, según el Evangelio de Mateo?', 'Dos ciegos', 'Un ciego', 'Tres ciegos', 'Cuatro ciegos', '["Dos ciegos","Un ciego","Tres ciegos","Cuatro ciegos"]', 0, true, 1),
  ('mj-5-2', 'milagros-5', '¿Qué milagro ocurrió en el templo en el momento en que Jesús murió en la cruz?', 'El velo se rasgó de arriba abajo', 'Llovió por 40 días', 'Se abrió el Mar Rojo', 'Cayó fuego del cielo', '["El velo se rasgó de arriba abajo","Llovió por 40 días","Se abrió el Mar Rojo","Cayó fuego del cielo"]', 0, true, 2),
  ('mj-5-3', 'milagros-5', '¿Qué milagro involucró una moneda que Pedro encontró en la boca de un pez?', 'Para pagar el impuesto del templo', 'Para dar limosna al necesitado', 'Para comprar pan para la multitud', 'Para devolver lo robado', '["Para pagar el impuesto del templo","Para dar limosna al necesitado","Para comprar pan para la multitud","Para devolver lo robado"]', 0, true, 3),
  ('mj-5-4', 'milagros-5', '¿Qué hizo Jesús milagrosamente al llegar al sepulcro de Lázaro?', 'Lloró y luego ordenó que quitaran la piedra', 'Oró en silencio por horas', 'Tocó la piedra y se abrió sola', 'Ayunó tres días antes', '["Lloró y luego ordenó que quitaran la piedra","Oró en silencio por horas","Tocó la piedra y se abrió sola","Ayunó tres días antes"]', 0, true, 4),
  ('mj-5-5', 'milagros-5', '¿Qué enfermedad tenía el hombre del estanque de Betesda que Jesús sanó?', 'Parálisis (38 años enfermo)', 'Ceguera de nacimiento', 'Lepra avanzada', 'Sordomudez', '["Parálisis (38 años enfermo)","Ceguera de nacimiento","Lepra avanzada","Sordomudez"]', 0, true, 5),
  ('pr-1-1', 'profetas-1', '¿Qué profeta fue tragado por un gran pez y obedeció a Dios?', 'Jonás', 'Elías', 'Isaías', 'Amós', '["Jonás","Elías","Isaías","Amós"]', 0, true, 1),
  ('pr-1-2', 'profetas-1', '¿Cuántos días estuvo Jonás dentro del gran pez?', '3 días y 3 noches', '7 días', '40 días', '1 día', '["3 días y 3 noches","7 días","40 días","1 día"]', 0, true, 2),
  ('pr-1-3', 'profetas-1', '¿Qué profeta anunció: ''La virgen concebirá y dará a luz un hijo''?', 'Isaías', 'Jeremías', 'Miqueas', 'Daniel', '["Isaías","Jeremías","Miqueas","Daniel"]', 0, true, 3),
  ('pr-1-4', 'profetas-1', '¿Qué profeta tuvo la visión del valle de huesos secos que revivieron?', 'Ezequiel', 'Daniel', 'Isaías', 'Jeremías', '["Ezequiel","Daniel","Isaías","Jeremías"]', 0, true, 4),
  ('pr-1-5', 'profetas-1', '¿A qué gran ciudad fue enviado Jonás a predicar arrepentimiento?', 'Nínive', 'Babilonia', 'Jerusalén', 'Damasco', '["Nínive","Babilonia","Jerusalén","Damasco"]', 0, true, 5),
  ('pr-2-1', 'profetas-2', '¿Qué profeta desafió a 450 profetas de Baal en el monte Carmelo?', 'Elías', 'Eliseo', 'Jeremías', 'Amós', '["Elías","Eliseo","Jeremías","Amós"]', 0, true, 1),
  ('pr-2-2', 'profetas-2', '¿Qué joven profeta fue echado al foso de los leones?', 'Daniel', 'Jonás', 'Ezequiel', 'Amós', '["Daniel","Jonás","Ezequiel","Amós"]', 0, true, 2),
  ('pr-2-3', 'profetas-2', '¿Qué profeta fue llamado siendo muy joven, casi un niño?', 'Jeremías', 'Isaías', 'Amós', 'Miqueas', '["Jeremías","Isaías","Amós","Miqueas"]', 0, true, 3),
  ('pr-2-4', 'profetas-2', '¿Qué profeta vivió en el palacio de Babilonia y tuvo visiones proféticas?', 'Daniel', 'Ezequiel', 'Isaías', 'Nahúm', '["Daniel","Ezequiel","Isaías","Nahúm"]', 0, true, 4),
  ('pr-2-5', 'profetas-2', '¿Quién fue el maestro y mentor del profeta Eliseo?', 'Elías', 'Samuel', 'Moisés', 'Isaías', '["Elías","Samuel","Moisés","Isaías"]', 0, true, 5),
  ('pr-3-1', 'profetas-3', '¿Qué profeta profetizó que el Mesías nacería en Belén?', 'Miqueas', 'Isaías', 'Jeremías', 'Amós', '["Miqueas","Isaías","Jeremías","Amós"]', 0, true, 1),
  ('pr-3-2', 'profetas-3', '¿Qué profeta vivió junto al río Quebar durante el cautiverio en Babilonia?', 'Ezequiel', 'Isaías', 'Daniel', 'Jeremías', '["Ezequiel","Isaías","Daniel","Jeremías"]', 0, true, 2),
  ('pr-3-3', 'profetas-3', '¿Qué hizo Elías en el monte Carmelo para demostrar que Jehová era el verdadero Dios?', 'Pidió que cayera fuego del cielo', 'Dividió las aguas', 'Resucitó muertos', 'Ayunó 40 días', '["Pidió que cayera fuego del cielo","Dividió las aguas","Resucitó muertos","Ayunó 40 días"]', 0, true, 3),
  ('pr-3-4', 'profetas-3', '¿Qué profeta usó su propio matrimonio como símbolo del amor de Dios por Israel?', 'Oseas', 'Amós', 'Miqueas', 'Nahúm', '["Oseas","Amós","Miqueas","Nahúm"]', 0, true, 4),
  ('pr-3-5', 'profetas-3', '¿En qué nación estuvo cautivo Daniel con sus amigos Sadrac, Mesac y Abed-nego?', 'Babilonia', 'Egipto', 'Asiria', 'Persia', '["Babilonia","Egipto","Asiria","Persia"]', 0, true, 5),
  ('pr-4-1', 'profetas-4', '¿Qué profeta era pastor y recolector de higos antes de ser llamado por Dios?', 'Amós', 'Miqueas', 'Oseas', 'Nahúm', '["Amós","Miqueas","Oseas","Nahúm"]', 0, true, 1),
  ('pr-4-2', 'profetas-4', '¿Cuántos capítulos tiene el libro de Isaías, igual que los libros de la Biblia?', '66 capítulos', '40 capítulos', '52 capítulos', '77 capítulos', '["66 capítulos","40 capítulos","52 capítulos","77 capítulos"]', 0, true, 2),
  ('pr-4-3', 'profetas-4', '¿Qué profeta escribió: ''¿Puede una madre olvidarse de su hijo? Aunque ella lo hiciera, yo no te olvidaré''?', 'Isaías', 'Jeremías', 'Amós', 'Oseas', '["Isaías","Jeremías","Amós","Oseas"]', 0, true, 3),
  ('pr-4-4', 'profetas-4', '¿Qué profeta fue llevado al cielo sin morir, en un torbellino?', 'Elías', 'Moisés', 'Enoc', 'Samuel', '["Elías","Moisés","Enoc","Samuel"]', 0, true, 4),
  ('pr-4-5', 'profetas-4', '¿Cuántos libros proféticos tiene el Antiguo Testamento en total?', '17 libros', '12 libros', '5 libros', '7 libros', '["17 libros","12 libros","5 libros","7 libros"]', 0, true, 5),
  ('pr-5-1', 'profetas-5', '¿Qué profeta del Nuevo Testamento preparó el camino para Jesús?', 'Juan el Bautista', 'Zacarías', 'Simeón', 'Esteban', '["Juan el Bautista","Zacarías","Simeón","Esteban"]', 0, true, 1),
  ('pr-5-2', 'profetas-5', '¿Qué escribió Jeremías en el capítulo 29:11 sobre los planes de Dios?', '''Conozco los planes que tengo para ustedes, planes de bienestar''', '''No temas, yo estoy contigo''', '''Con Dios todo es posible''', '''El amor de Dios es eterno''', '["''Conozco los planes que tengo para ustedes, planes de bienestar''","''No temas, yo estoy contigo''","''Con Dios todo es posible''","''El amor de Dios es eterno''"]', 0, true, 2),
  ('pr-5-3', 'profetas-5', '¿Qué significa el nombre del profeta ''Isaías''?', '''Dios es salvación''', '''Dios habla''', '''Dios es luz''', '''Dios perdona''', '["''Dios es salvación''","''Dios habla''","''Dios es luz''","''Dios perdona''"]', 0, true, 3),
  ('pr-5-4', 'profetas-5', '¿Qué profeta fue comisionado con las palabras ''Ve, come este rollo y llena tu vientre''?', 'Ezequiel', 'Jeremías', 'Isaías', 'Zacarías', '["Ezequiel","Jeremías","Isaías","Zacarías"]', 0, true, 4),
  ('pr-5-5', 'profetas-5', '¿Qué profeta anunció que habría un ''nuevo pacto'' diferente al de Moisés?', 'Jeremías', 'Isaías', 'Ezequiel', 'Daniel', '["Jeremías","Isaías","Ezequiel","Daniel"]', 0, true, 5),
  ('vs-1-1', 'versiculos-1', '¿Cómo comienza el famoso Salmo 23?', '''El Señor es mi pastor''', '''En el principio era el Verbo''', '''Dios es amor''', '''Porque de tal manera amó Dios''', '["''El Señor es mi pastor''","''En el principio era el Verbo''","''Dios es amor''","''Porque de tal manera amó Dios''"]', 0, true, 1),
  ('vs-1-2', 'versiculos-1', '¿Cuál es la referencia del versículo ''Porque de tal manera amó Dios al mundo...''?', 'Juan 3:16', 'Romanos 8:28', 'Salmos 23:1', 'Mateo 5:3', '["Juan 3:16","Romanos 8:28","Salmos 23:1","Mateo 5:3"]', 0, true, 2),
  ('vs-1-3', 'versiculos-1', '¿Qué dice Filipenses 4:13?', '''Todo lo puedo en Cristo que me fortalece''', '''El amor es sufrido y benigno''', '''La fe es la certeza de lo que se espera''', '''Dios proveerá todas sus necesidades''', '["''Todo lo puedo en Cristo que me fortalece''","''El amor es sufrido y benigno''","''La fe es la certeza de lo que se espera''","''Dios proveerá todas sus necesidades''"]', 0, true, 3),
  ('vs-1-4', 'versiculos-1', '¿Cuál es el primer versículo de toda la Biblia?', '''En el principio creó Dios los cielos y la tierra''', '''El Señor es mi pastor''', '''Dios es amor''', '''En el principio era el Verbo''', '["''En el principio creó Dios los cielos y la tierra''","''El Señor es mi pastor''","''Dios es amor''","''En el principio era el Verbo''"]', 0, true, 4),
  ('vs-1-5', 'versiculos-1', '¿Cuál es considerado el versículo más corto de la Biblia?', '''Jesús lloró'' (Juan 11:35)', '''Dios amó'' (Juan 3:16)', '''Dad gracias'' (1 Tes 5:18)', '''Orad siempre'' (1 Tes 5:17)', '["''Jesús lloró'' (Juan 11:35)","''Dios amó'' (Juan 3:16)","''Dad gracias'' (1 Tes 5:18)","''Orad siempre'' (1 Tes 5:17)"]', 0, true, 5),
  ('vs-2-1', 'versiculos-2', '¿Dónde se encuentra ''Todo lo puedo en Cristo que me fortalece''?', 'Filipenses 4:13', 'Romanos 8:28', 'Juan 3:16', 'Salmos 27:1', '["Filipenses 4:13","Romanos 8:28","Juan 3:16","Salmos 27:1"]', 0, true, 1),
  ('vs-2-2', 'versiculos-2', '¿Qué dice Romanos 8:28?', '''Sabemos que a los que aman a Dios, todas las cosas les ayudan a bien''', '''El amor cubrirá multitud de pecados''', '''En el principio era el Verbo''', '''Todo lo puedo en Cristo''', '["''Sabemos que a los que aman a Dios, todas las cosas les ayudan a bien''","''El amor cubrirá multitud de pecados''","''En el principio era el Verbo''","''Todo lo puedo en Cristo''"]', 0, true, 2),
  ('vs-2-3', 'versiculos-2', '¿En qué versículo dice ''No temas, porque yo estoy contigo''?', 'Isaías 41:10', 'Salmos 23:4', 'Filipenses 4:13', 'Juan 14:6', '["Isaías 41:10","Salmos 23:4","Filipenses 4:13","Juan 14:6"]', 0, true, 3),
  ('vs-2-4', 'versiculos-2', '¿Qué dice Proverbios 3:5?', '''Confía en el Señor con todo tu corazón y no te apoyes en tu propio entendimiento''', '''El amor es sufrido''', '''Busca primero el reino de Dios''', '''La fe sin obras está muerta''', '["''Confía en el Señor con todo tu corazón y no te apoyes en tu propio entendimiento''","''El amor es sufrido''","''Busca primero el reino de Dios''","''La fe sin obras está muerta''"]', 0, true, 4),
  ('vs-2-5', 'versiculos-2', '¿En qué libro está ''Busca primero el reino de Dios y su justicia''?', 'Mateo 6:33', 'Lucas 12:31', 'Juan 14:1', 'Marcos 8:34', '["Mateo 6:33","Lucas 12:31","Juan 14:1","Marcos 8:34"]', 0, true, 5),
  ('vs-3-1', 'versiculos-3', '¿Qué dice Juan 14:6?', '''Yo soy el camino, la verdad y la vida''', '''Dios es amor''', '''El Señor es mi pastor''', '''Todo lo puedo en Cristo''', '["''Yo soy el camino, la verdad y la vida''","''Dios es amor''","''El Señor es mi pastor''","''Todo lo puedo en Cristo''"]', 0, true, 1),
  ('vs-3-2', 'versiculos-3', '¿En qué versículo dice ''El Señor es mi luz y mi salvación; ¿a quién temeré?''', 'Salmos 27:1', 'Salmos 23:1', 'Isaías 41:10', 'Juan 8:12', '["Salmos 27:1","Salmos 23:1","Isaías 41:10","Juan 8:12"]', 0, true, 2),
  ('vs-3-3', 'versiculos-3', '¿Qué dice 1 Corintios 13:4?', '''El amor es sufrido, es benigno; el amor no tiene envidia''', '''Todo lo puedo en Cristo''', '''Dios es amor''', '''En el amor no hay temor''', '["''El amor es sufrido, es benigno; el amor no tiene envidia''","''Todo lo puedo en Cristo''","''Dios es amor''","''En el amor no hay temor''"]', 0, true, 3),
  ('vs-3-4', 'versiculos-3', '¿En qué versículo dijo Jesús: ''Yo soy la resurrección y la vida''?', 'Juan 11:25', 'Juan 3:16', 'Juan 14:6', 'Juan 10:9', '["Juan 11:25","Juan 3:16","Juan 14:6","Juan 10:9"]', 0, true, 4),
  ('vs-3-5', 'versiculos-3', '¿Qué dice Proverbios 22:6?', '''Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él''', '''El sabio teme a Dios''', '''La sabiduría clama en las calles''', '''El hijo sabio alegra al padre''', '["''Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él''","''El sabio teme a Dios''","''La sabiduría clama en las calles''","''El hijo sabio alegra al padre''"]', 0, true, 5),
  ('vs-4-1', 'versiculos-4', '¿Qué dice Jeremías 29:11?', '''Porque yo sé los planes que tengo para ustedes, planes de bienestar''', '''El amor de Dios es eterno''', '''Con Dios todo es posible''', '''No temas, yo estoy contigo''', '["''Porque yo sé los planes que tengo para ustedes, planes de bienestar''","''El amor de Dios es eterno''","''Con Dios todo es posible''","''No temas, yo estoy contigo''"]', 0, true, 1),
  ('vs-4-2', 'versiculos-4', '¿Dónde se encuentra la bendición ''El Señor te bendiga y te guarde''?', 'Números 6:24', 'Salmos 121:8', 'Proverbios 3:5', 'Deuteronomio 6:4', '["Números 6:24","Salmos 121:8","Proverbios 3:5","Deuteronomio 6:4"]', 0, true, 2),
  ('vs-4-3', 'versiculos-4', '¿Qué dice Isaías 40:31?', '''Los que esperan en el Señor renovarán sus fuerzas, volarán como águilas''', '''No temas porque yo estoy contigo''', '''Con Dios todo es posible''', '''El amor es sufrido y benigno''', '["''Los que esperan en el Señor renovarán sus fuerzas, volarán como águilas''","''No temas porque yo estoy contigo''","''Con Dios todo es posible''","''El amor es sufrido y benigno''"]', 0, true, 3),
  ('vs-4-4', 'versiculos-4', '¿En qué versículos está la ''Gran Comisión'' de Jesús a sus discípulos?', 'Mateo 28:19-20', 'Marcos 16:15', 'Lucas 24:47', 'Juan 20:21', '["Mateo 28:19-20","Marcos 16:15","Lucas 24:47","Juan 20:21"]', 0, true, 4),
  ('vs-4-5', 'versiculos-4', '¿Qué dice Juan 3:16 sobre el amor de Dios?', '''Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito''', '''Todo lo puedo en Cristo que me fortalece''', '''El Señor es mi pastor''', '''Yo soy el camino la verdad y la vida''', '["''Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito''","''Todo lo puedo en Cristo que me fortalece''","''El Señor es mi pastor''","''Yo soy el camino la verdad y la vida''"]', 0, true, 5),
  ('vs-5-1', 'versiculos-5', '¿Qué versículo dice ''La fe es la certeza de lo que se espera, la convicción de lo que no se ve''?', 'Hebreos 11:1', 'Romanos 10:17', 'Santiago 2:17', '1 Corintios 13:13', '["Hebreos 11:1","Romanos 10:17","Santiago 2:17","1 Corintios 13:13"]', 0, true, 1),
  ('vs-5-2', 'versiculos-5', '¿Dónde dice ''El que comenzó en ustedes la buena obra la perfeccionará''?', 'Filipenses 1:6', 'Romanos 8:28', '2 Timoteo 1:12', '1 Pedro 5:10', '["Filipenses 1:6","Romanos 8:28","2 Timoteo 1:12","1 Pedro 5:10"]', 0, true, 2),
  ('vs-5-3', 'versiculos-5', '¿Qué contiene Mateo 6:9-13?', 'El Padre Nuestro (la oración modelo)', 'Las Bienaventuranzas', 'El Gran Mandamiento', 'La Gran Comisión', '["El Padre Nuestro (la oración modelo)","Las Bienaventuranzas","El Gran Mandamiento","La Gran Comisión"]', 0, true, 3),
  ('vs-5-4', 'versiculos-5', '¿Qué dice 2 Timoteo 3:16 sobre las Escrituras?', '''Toda la Escritura es inspirada por Dios y útil para enseñar...''', '''El amor de Dios ha sido derramado''', '''La gracia de Dios ha aparecido''', '''Toda rodilla se doblará ante Dios''', '["''Toda la Escritura es inspirada por Dios y útil para enseñar...''","''El amor de Dios ha sido derramado''","''La gracia de Dios ha aparecido''","''Toda rodilla se doblará ante Dios''"]', 0, true, 4),
  ('vs-5-5', 'versiculos-5', '¿Qué dice Salmos 37:5?', '''Encomienda a Jehová tu camino, confía en él; y él hará''', '''Proverbios 16:3 dice lo mismo''', '''El Señor es mi fuerza''', '''Solo en Dios halla descanso mi alma''', '["''Encomienda a Jehová tu camino, confía en él; y él hará''","''Proverbios 16:3 dice lo mismo''","''El Señor es mi fuerza''","''Solo en Dios halla descanso mi alma''"]', 0, true, 5)
;

alter table public.categories enable row level security;
alter table public.levels enable row level security;
alter table public.questions enable row level security;
alter table public.profiles enable row level security;
alter table public.user_level_progress enable row level security;
alter table public.game_sessions enable row level security;

drop policy if exists "Public categories are readable" on public.categories;
create policy "Public categories are readable"
on public.categories
for select
using (is_active = true);

drop policy if exists "Public levels are readable" on public.levels;
create policy "Public levels are readable"
on public.levels
for select
using (is_active = true);

drop policy if exists "Public questions are readable" on public.questions;
create policy "Public questions are readable"
on public.questions
for select
using (is_active = true);

drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "Profiles are insertable by owner" on public.profiles;
create policy "Profiles are insertable by owner"
on public.profiles
for insert
with check (auth.uid() = id);

drop policy if exists "Profiles are updatable by owner" on public.profiles;
create policy "Profiles are updatable by owner"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Progress is readable by owner" on public.user_level_progress;
create policy "Progress is readable by owner"
on public.user_level_progress
for select
using (auth.uid() = user_id);

drop policy if exists "Progress is insertable by owner" on public.user_level_progress;
create policy "Progress is insertable by owner"
on public.user_level_progress
for insert
with check (auth.uid() = user_id);

drop policy if exists "Progress is updatable by owner" on public.user_level_progress;
create policy "Progress is updatable by owner"
on public.user_level_progress
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Sessions are readable by owner" on public.game_sessions;
create policy "Sessions are readable by owner"
on public.game_sessions
for select
using (auth.uid() = user_id);

drop policy if exists "Sessions are insertable by owner" on public.game_sessions;
create policy "Sessions are insertable by owner"
on public.game_sessions
for insert
with check (auth.uid() = user_id);

drop policy if exists "Sessions are updatable by owner" on public.game_sessions;
create policy "Sessions are updatable by owner"
on public.game_sessions
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

commit;
