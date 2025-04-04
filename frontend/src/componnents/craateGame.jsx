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

        if (type === "checkbox" && name === "platform") {
            setFormData((prev) => ({
                ...prev,
                platform: checked
                    ? [...prev.platform, value]
                    : prev.platform.filter((p) => p !== value),
            }));
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success("Juego creado correctamente");
                setFormData({
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
                })
                navigate("/")
            } else {
                toast.error(data.message || "Error creando juego");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error en la conexión con el servidor");
        }

        
    };

    return (
        <div className="relative flex items-center justify-center p-4 h-screen overflow-hidden bg-gray-900">
            
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Background" 
                    className="w-full h-full object-cover object-center brightness-[0.3]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900"></div>
            </div>
            
            <Toaster />
            <div className="w-full max-w-md bg-gray-800/90 p-4 rounded-lg border border-gray-700 relative z-10 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-center mb-3 text-red-500 uppercase">
                    CREAR NUEVO JUEGO
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Nombre:</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                            className="w-full p-1.5 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>

                    {/* Imagen y Género */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Imagen (URL):</label>
                            <input 
                                type="text" 
                                name="image" 
                                value={formData.image} 
                                onChange={handleChange} 
                                className="w-full p-1.5 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Género:</label>
                            <select 
                                name="genre" 
                                value={formData.genre} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-1.5 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            >
                                <option value="">Selecciona un género</option>
                                {["Acción", "Aventura", "RPG", "Estrategia"].map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Plataformas */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Plataformas:</label>
                        <div className="flex flex-wrap gap-2">
                            {["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"].map((platform) => (
                                <label key={platform} className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        name="platform" 
                                        value={platform} 
                                        checked={formData.platform.includes(platform)} 
                                        onChange={handleChange}
                                        className="h-3.5 w-3.5 text-red-600 border-gray-600 rounded bg-gray-700 mr-1 focus:ring-red-500"
                                    />
                                    <span className="text-xs text-gray-300">{platform}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Fecha y Desarrollador */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Fecha Lanzamiento:</label>
                            <input 
                                type="date" 
                                name="releaseDate" 
                                value={formData.releaseDate} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-1.5 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Desarrollador:</label>
                            <input 
                                type="text" 
                                name="developer" 
                                value={formData.developer} 
                                onChange={handleChange} 
                                required 
                                className="w-full p-1.5 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Editor y Precio */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Editor:</label>
                            <input 
                                type="text" 
                                name="publisher" 
                                value={formData.publisher} 
                                onChange={handleChange} 
                                className="w-full p-1.5 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Precio ($):</label>
                            <input 
                                type="number" 
                                name="price" 
                                value={formData.price} 
                                onChange={handleChange} 
                                min="0" 
                                className="w-full p-1.5 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Rating y Multijugador */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Rating (0-10):</label>
                            <input 
                                type="number" 
                                name="rating" 
                                value={formData.rating} 
                                onChange={handleChange} 
                                min="0" 
                                max="10"
                                className="w-full p-1.5 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-end">
                            <label className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    name="multiplayer" 
                                    checked={formData.multiplayer} 
                                    onChange={handleChange} 
                                    className="h-3.5 w-3.5 text-red-600 border-gray-600 rounded bg-gray-700 mr-1 focus:ring-red-500"
                                />
                                <span className="text-xs text-gray-300">Modo Multijugador</span>
                            </label>
                        </div>
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Descripción:</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            rows={2}
                            className="w-full p-1.5 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-1 focus:ring-red-500 focus:border-transparent"
                        ></textarea>
                    </div>

                    {/* Botón */}
                    <div className="pt-2">
                        <button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-medium py-1.5 px-4 rounded text-sm transition shadow-md hover:shadow-red-900/50"
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