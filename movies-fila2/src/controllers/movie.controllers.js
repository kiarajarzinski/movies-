import Movie from "../models/movie.model.js";

// Corrección de nombre de función
function isInteger(value) {
    return Number.isInteger(value);
}

export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las peliculas", error: error.message });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ message: "pelicula no encontrada" });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la pelicula", error: error.message });
    }
};

export const createMovie = async (req, res) => {
    const { title, director, duration, genre, description } = req.body;

    if (!title || !director || !duration || !genre) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (!isInteger(duration) || duration <= 0) {
        return res.status(400).json({ message: "La duracion debe ser un numero entero positivo" });
    }

    try {
        // Validación de unicidad de título
        const existingMovie = await Movie.findOne({ where: { title } });
        if (existingMovie) {
            return res.status(400).json({ message: "El título ya existe" });
        }

        const newMovie = await Movie.create({
            title,
            director,
            duration,
            genre,
            description,
        });
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la pelicula", error: error.message });
    }
};

export const updateMovie = async (req, res) => {
    const { id } = req.params;
    const { title, director, duration, genre, description } = req.body;

    if (!title || !director || !duration || !genre) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (!isInteger(duration) || duration <= 0) {
        return res.status(400).json({ message: "La duracion debe ser un numero entero positivo" });
    }

    try {
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ message: "pelicula no encontrada" });
        }

        // Validación de unicidad de título (excluyendo la película actual)
        if (title !== movie.title) {
            const existingMovie = await Movie.findOne({ where: { title } });
            if (existingMovie) {
                return res.status(400).json({ message: "El título ya existe" });
            }
        }

        movie.title = title;
        movie.director = director;
        movie.duration = duration;
        movie.genre = genre;
        movie.description = description;

        await movie.save();
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la pelicula", error: error.message });
    }
};

export const deleteMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ message: "pelicula no encontrada" });
        }
        await movie.destroy();
        res.json({ message: "Pelicula eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la pelicula", error: error.message });
    }
};