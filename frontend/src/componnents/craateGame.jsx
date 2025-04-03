import { useState } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Toaster />
            <div className="max-w-4xl w-full p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Crear Nuevo Juego
                </h2>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen (URL):</label>
                            <input 
                                type="text" 
                                name="image" 
                                value={formData.image} 
                                onChange={handleChange} 
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Género:</label>
                            <select 
                                name="genre" 
                                value={formData.genre} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Selecciona un género</option>
                                {["Acción", "Aventura", "RPG", "Estrategia", "Deportes", "Carreras", "Puzzle", "Shooter"].map((genre) => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plataformas:</label>
                            <div className="flex flex-wrap gap-3">
                                {["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"].map((platform) => (
                                    <label key={platform} className="inline-flex items-center">
                                        <input 
                                            type="checkbox" 
                                            name="platform" 
                                            value={platform} 
                                            checked={formData.platform.includes(platform)} 
                                            onChange={handleChange} 
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-2 text-gray-700 text-sm">{platform}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Lanzamiento:</label>
                            <input 
                                type="date" 
                                name="releaseDate" 
                                value={formData.releaseDate} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Desarrollador:</label>
                            <input 
                                type="text" 
                                name="developer" 
                                value={formData.developer} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Editor:</label>
                            <input 
                                type="text" 
                                name="publisher" 
                                value={formData.publisher} 
                                onChange={handleChange} 
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Precio ($):</label>
                            <input 
                                type="number" 
                                name="price" 
                                value={formData.price} 
                                onChange={handleChange} 
                                min="0" 
                                required 
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0-10):</label>
                            <input 
                                type="number" 
                                name="rating" 
                                value={formData.rating} 
                                onChange={handleChange} 
                                min="0" 
                                max="10" 
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                name="multiplayer" 
                                checked={formData.multiplayer} 
                                onChange={handleChange} 
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">Modo Multijugador</label>
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción:</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            rows={4}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>

                        <button 
                            type="submit" 
                            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                        >
                            Crear Juego
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateGame;