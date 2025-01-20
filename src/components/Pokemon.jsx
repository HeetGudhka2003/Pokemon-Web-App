import { useState, useEffect } from "react";

import PokemonCards from "./PokemonCards.jsx";

const Pokemon = () => {

    const API = "https://pokeapi.co/api/v2/pokemon?limit=200";

    const [pokemon, setPokemon] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    const fetchPokemon = async () => {

        try {

            const response = await fetch(API);

            const data = await response.json();

            const detailedPokemonData = data.results.map(async (currentPokemon) => {

                const response = await fetch(currentPokemon.url);

                const data = await response.json();

                return data;
            })

            const detailedResponses = await Promise.all(detailedPokemonData);

            console.log(detailedResponses);

            setPokemon(detailedResponses);

            setLoading(false);

        } catch (error) {

            console.error(error);

            setLoading(false);

            setError(error);
        }
    }

    useEffect(() => {

        fetchPokemon();

    }, []);

    if (loading) {

        return (

            <div>

                <h1>Loading...</h1>

            </div>
        )
    }

    if (error) {

        return (

            <div>

                <h1>{error.message}</h1>

            </div>
        )
    }

    const searchedPokemon = pokemon.filter((currentPokemon) => {

        return currentPokemon.name.toLowerCase().includes(search.toLowerCase());
    })

    return (

        <>

            <section className="container">

                <header>

                    <h1>Let's Catch Pokemon</h1>

                </header>

                <div className="pokemon-search">

                    <input type="text" placeholder="Search Pokemon" name="search" value={search} onChange={(e) => setSearch(e.target.value)} />

                </div>

                <div>

                    <ul className="cards">

                        {
                            searchedPokemon.map((currentPokemon) => {

                                return (

                                    <PokemonCards key={currentPokemon.id} pokemonData={currentPokemon} />
                                )
                            })
                        }

                    </ul>

                </div>

            </section>

        </>
    )
}

export default Pokemon;