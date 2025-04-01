import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { FaSearch } from 'react-icons/fa';
import StatCard from '../StatCard/StatCard';
import DataList from '../DataList/DataList';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Statistics state
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [averageBaseExperience, setAverageBaseExperience] = useState(0);
  const [typeCounts, setTypeCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch first 100 Pokémon from the PokéAPI
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        
        // Fetch detailed data for each Pokémon
        const pokemonDetailsPromises = response.data.results.map(pokemon => 
          axios.get(pokemon.url)
        );
        
        const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);
        const pokemonData = pokemonDetailsResponses.map(res => res.data);
        
        setData(pokemonData);
        calculateStatistics(pokemonData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch Pokémon data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate statistics from the Pokémon data
  const calculateStatistics = (data) => {
    // Total number of Pokémon
    setTotalPokemon(data.length);
    
    // Average base experience
    const totalBaseExperience = data.reduce((sum, pokemon) => sum + (pokemon.base_experience || 0), 0);
    setAverageBaseExperience((totalBaseExperience / data.length).toFixed(0));
    
    // Count by type
    const types = {};
    data.forEach(pokemon => {
      pokemon.types.forEach(typeInfo => {
        const typeName = typeInfo.type.name;
        if (types[typeName]) {
          types[typeName]++;
        } else {
          types[typeName] = 1;
        }
      });
    });
    setTypeCounts(types);
  };

  // Filter data based on search query and type filter
  const filteredData = data.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || 
      pokemon.types.some(typeInfo => typeInfo.type.name === typeFilter);
    return matchesSearch && matchesType;
  });

  // Get unique types for the filter dropdown
  const allTypes = data.flatMap(pokemon => pokemon.types.map(typeInfo => typeInfo.type.name));
  const types = ['all', ...new Set(allTypes)];

  return (
    <div className="dashboard">
      <h1>Pokémon Dashboard</h1>
      
      {loading ? (
        <div className="loading">Loading Pokémon data...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div className="stats-container">
            <StatCard title="Total Pokémon" value={totalPokemon} icon="🔴" />
            <StatCard title="Avg Base XP" value={averageBaseExperience} icon="⚡" />
            <StatCard 
              title="Types" 
              value={Object.keys(typeCounts).length} 
              icon="🏆" 
            />
          </div>
          
          <div className="filters">
            <div className="search-bar">
              <FaSearch />
              <input
                type="text"
                placeholder="Search Pokémon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="category-filter">
              <label htmlFor="type">Filter by Type:</label>
              <select
                id="type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <DataList data={filteredData} />
        </>
      )}
    </div>
  );
};

export default Dashboard;