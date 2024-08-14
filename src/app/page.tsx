import Image from "next/image";
import React from "react";
import PaginationControls from "../components/PaginationControls";
import styles from "./page.module.css";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

async function fetchMovies(page: number) {
    const API_KEY = process.env.TMDB_API_KEY;
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`
    );
    const data = await res.json();
    return data;
}

const MoviesPage = async ({
    searchParams,
}: {
    searchParams: { page?: string };
}) => {
    const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
    const data = await fetchMovies(currentPage);
    const movies = data.results.slice(0, 9);
    const totalPages = data.total_pages;

    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h1>Films populaires</h1>
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
            <div className={styles.grid}>
                {movies.map((movie: Movie) => (
                    <div className={styles.movie} key={movie.id}>
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={200}
                            height={200}
                        />
                        <p>{movie.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviesPage;
