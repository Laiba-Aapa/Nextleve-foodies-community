import Link from 'next/link'
import styles from './page.module.css'
import MealsGrid from '@/components/meals/meals-grid'
import { getMeals } from '@/lib/meals'
import { Suspense } from 'react';

export const metadata = {
    title: 'All meals',
    description: 'Browse the Delicious meals, shared by our vibrant community.',
};

async function Meals() {
    const meals = await getMeals();
    return <MealsGrid meals={meals} />
}
export default async function MealsPage() {
    const meals = await getMeals();
    return <>
        <header className={styles.header}>
            <h1>Delecious Meals, created <span className={styles.highlight}>by you</span></h1>
            <p>Choose Your favourite recipe and cook it yourself. It is easy and Fun!</p>
            <p className={styles.cta}>
                <Link href='/meals/share'>Share Your Favourite Recipe</Link>
            </p>
        </header>
        <Suspense fallback={<p className={styles.loading}>Fetching meals...</p>}>
            <main>
                <Meals />
            </main>
        </Suspense>
    </>
}