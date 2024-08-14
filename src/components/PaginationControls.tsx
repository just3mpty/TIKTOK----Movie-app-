"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "../app/page.module.css";

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

        router.push(`/?page=${newPage}`);
    };

    return (
        <div className={styles.navigation}>
            <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}>
                Previous
            </button>
            <span>
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
