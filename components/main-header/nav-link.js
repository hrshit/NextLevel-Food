'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import classes from "./nav-link.module.css"

export default function NavLink({href, children}){
    const Path = usePathname();
    return (
        <Link 
        href={href}
        className={Path.startsWith(href) ? `${classes.link} ${classes.active}` : `${classes.link}` }
        >
         {children}
        </Link>
    )
}