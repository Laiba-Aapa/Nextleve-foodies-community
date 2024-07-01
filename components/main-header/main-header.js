'use client';
import Link from "next/link";
import Image from "next/image";
import logo from '@/assets/logo.png';
import hamburger from '@/assets/icons/hamburger.png'
import styles from './main-header.module.css'
import { usePathname } from "next/navigation";
import NavLink from "./nav/navlink";
import { useState } from "react";

export default function MainHeader() {
    const path = usePathname();

    const [menu, setMenu] = useState(false);

    function handleToggleMenu() {
        setMenu((prevState) => !prevState);

    }

    return (
        <header className={styles.header}>
            <Link href='/' className={styles.logo}>
                <Image src={logo} alt="A plate with some food on it " priority />
                NextLevel Food
            </Link>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink href='/meals'>Browse Meals</NavLink>
                    </li>
                    <li>
                        <NavLink href='/community'>Foodies Communities</NavLink>
                    </li>
                </ul>
            </nav>
            <div className={styles.hamburger}>
                <Image src={hamburger} alt="hamburger" fill onClick={handleToggleMenu} />

                <div className={`${styles.menu} ${menu === true ? styles.active : null} `}>
                    <nav className={`${styles.nav} `} >
                        <ul>
                            <li>
                                <NavLink href='/meals'>Browse Meals</NavLink>
                            </li>
                            <li>
                                <NavLink href='/community'>Foodies Communities</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}