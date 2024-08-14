"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const PaginationControls: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
}) => {
    const router = useRouter();

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;

        router.push(`/movies?page=${newPage}`);
    };

    return (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}>
                Previous
            </button>
            <span style={{ margin: "0 15px" }}>
                Page {currentPage} sur {totalPages}
            </span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}>
                Next
            </button>
        </div>
    );
};

export default PaginationControls;
