import { useState } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import "./CreateGame.css";

function CreateGame() {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        genre: "",
        platform: [],
        releaseDate: "",
        developer: "",
        publisher: "",
        price: "",
        rating: "",
        multiplayer: false,
        description: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "platform") {
            const platforms = formData.platform.includes(value)
                ? formData.platform.filter((p) => p !== value)
                : [...formData.platform, value];

            setFormData({ ...formData, platform: platforms });
        } else if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/create-game", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success("Juego creado correctamente");
                navigate("/");
            } else {
                toast.error("Error creando juego");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error en la conexión con el servidor");
        }
    };

    return (
        <div className="container">
            <Toaster />
            <h2>Crear Juego</h2>
            <form onSubmit={handleSubmit} className="game-form">
                <label>Nombre:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Imagen (URL):</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} />

                <label>Género:</label>
                <select name="genre" value={formData.genre} onChange={handleChange} required>
                    <option value="">Selecciona un género</option>
                    {["Acción", "Aventura", "RPG", "Estrategia", "Deportes", "Carreras", "Puzzle", "Shooter"].map((genre) => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>

                <label>Plataformas:</label>
                <div className="checkbox-group">
                    {["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"].map((platform) => (
                        <label key={platform}>
                            <input
                                type="checkbox"
                                name="platform"
                                value={platform}
                                checked={formData.platform.includes(platform)}
                                onChange={handleChange}
                            />
                            {platform}
                        </label>
                    ))}
                </div>

                <label>Fecha de Lanzamiento:</label>
                <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleChange} required />

                <label>Desarrollador:</label>
                <input type="text" name="developer" value={formData.developer} onChange={handleChange} required />

                <label>Editor:</label>
                <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} />

                <label>Precio ($):</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} min="0" required />

                <label>Rating (0-10):</label>
                <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="0" max="10" />

                <label>
                    <input type="checkbox" name="multiplayer" checked={formData.multiplayer} onChange={handleChange} />
                    Modo Multijugador
                </label>

                <label>Descripción:</label>
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

                <button type="submit" className="submit-btn">Crear Juego</button>
            </form>
        </div>
    );
}

export default CreateGame;
