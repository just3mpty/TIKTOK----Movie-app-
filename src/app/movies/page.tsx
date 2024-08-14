// src/app/movies/page.tsx
import Image from "next/image";
import React from "react";
import PaginationControls from "../../components/PaginationControls";
import Link from "next/link";

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
    const movies = data.results.slice(0, 16);
    const totalPages = data.total_pages;

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ textAlign: "center" }}>Popular Movies</h1>
            <Link href={"/"}>Back Home</Link>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px",
                }}>
                {movies.map((movie: Movie) => (
                    <div key={movie.id} style={{ textAlign: "center" }}>
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={200}
                            height={200}
                            style={{
                                borderRadius: "10px",
                                objectFit: "contain",
                            }}
                        />
                        <h2 style={{ fontSize: "1.2rem", margin: "10px 0" }}>
                            {movie.title}
                        </h2>
                    </div>
                ))}
            </div>
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default MoviesPage;
