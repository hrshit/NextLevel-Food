
import Link from "next/link"
export default function MealsPage(){
    return(
        <main>
        <h1>Meals here</h1>
        <h3> <Link href="/community">Community</Link> </h3>
        <h3> <Link href="/meals/share">meals share</Link> </h3>
        <h3> <Link href="/meals/buger">Burger</Link> </h3>
        <h3> <Link href="/meals/Pizza">Pizza</Link> </h3>
        </main>
    )
} 