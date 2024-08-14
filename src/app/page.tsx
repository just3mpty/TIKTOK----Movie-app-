import Link from "next/link";

export default function Home() {
    return (
        <main>
            <Link href={"/movies"}>Go to movies</Link>
        </main>
    );
}
