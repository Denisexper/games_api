import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Games() {
    const [games, setGames] = useState([]);
    const [expandedGame, setExpandedGame] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/get-all");
                const data = await response.json();
                console.log(data)
                if(data && data.games && data.games.length > 0) {
                    setGames(data.games);
                } else {
                    toast.error("No se encontraron juegos");
                }
            } catch (error) {
                toast.error("Error al cargar los juegos");
                console.error("Error fetching games:", error);
            }
        };
        fetchGames();
    }, []);

    const handleCreateGame = () => {
        navigate("/create-game");
    };

    const toggleExpand = (id) => {
        setExpandedGame(expandedGame === id ? null : id);
    };

    const styles = `
    @keyframes fadeIn {
      from { opacity: 0; max-height: 0; }
      to { opacity: 1; max-height: 500px; }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out forwards;
    }
    `;

    return (
        <div className="relative min-h-screen bg-gray-900 overflow-hidden">
            {/* Inyecta los estilos aquí */}
            <style>{styles}</style>
            {/* Fondo con imagen oscurecida */}
            <div className="fixed inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Background" 
                    className="w-full h-full object-cover object-center brightness-[0.3]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900"></div>
            </div>
            
            <Toaster />
            <div className="relative z-10 container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-red-500 uppercase tracking-wider">JUEGOS</h1>
                    <button 
                        onClick={handleCreateGame}
                        className="bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 uppercase tracking-wider shadow-lg hover:shadow-red-900/50"
                    >
                        Crear Nuevo Juego
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game) => (
                        <div key={game._id} className="bg-gray-800/90 border border-gray-700 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-red-500">
                            {/* Imagen del juego */}
                            {game.image && (
                                <div className="h-40 overflow-hidden">
                                    <img 
                                        src={game.image} 
                                        alt={game.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            
                            {/* Contenido de la card */}
                            <div className="p-4">
                                <h2 className="text-2xl font-bold text-red-500 uppercase mb-2">{game.name}</h2>
                                <p className="text-gray-300 text-sm mb-4">Desarrollador: {game.developer}</p>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-400">Género: {game.genre}</span>
                                    <button 
                                        onClick={() => toggleExpand(game._id)}
                                        className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1 px-3 rounded transition"
                                    >
                                        {expandedGame === game._id ? "Ocultar" : "Info +"}
                                    </button>
                                </div>
                            </div>

                            {/* Información expandida */}
                            {expandedGame === game._id && (
                                <div className="bg-gray-700/80 p-4 border-t border-gray-600 animate-fadeIn">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-gray-400 text-xs">Plataformas:</p>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {game.platform.map((platform, index) => (
                                                    <span key={index} className="bg-gray-600 text-gray-200 text-xs px-2 py-1 rounded">
                                                        {platform}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs">Fecha Lanzamiento:</p>
                                            <p className="text-gray-300 text-sm mt-1">
                                                {new Date(game.releaseDate).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs">Editor:</p>
                                            <p className="text-gray-300 text-sm mt-1">{game.publisher || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-xs">Precio:</p>
                                            <p className="text-gray-300 text-sm mt-1">${game.price || '0'}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <p className="text-gray-400 text-xs">Rating:</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-full bg-gray-600 rounded-full h-2.5 flex-1">
                                                <div 
                                                    className="bg-red-500 h-2.5 rounded-full" 
                                                    style={{ width: `${game.rating * 10}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-gray-300 text-sm">{game.rating}/10</span>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <p className="text-gray-400 text-xs mb-1">Descripción:</p>
                                        <p className="text-gray-300 text-sm bg-gray-600/50 p-2 rounded max-h-32 overflow-y-auto">
                                            {game.description || 'Sin descripción disponible'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Estilos para animación */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; max-height: 0; }
                    to { opacity: 1; max-height: 500px; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

export default Games;