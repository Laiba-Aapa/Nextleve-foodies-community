import { getMeal } from '@/lib/meals'
import styles from './page.module.css'
import Image from 'next/image'
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const meal = getMeal(params.mealsSlug);

    if (!meal) {
        notFound(); // it will go to the nearesr not found page
    }
    return {
        title: meal.title,
        description: meal.summary,
    }
}

export default function MealsDetail({ params }) {

    const meal = getMeal(params.mealsSlug);

    if (!meal) {
        notFound(); // it will go to the nearesr not found page
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br/>')
    return <>
        <header className={styles.header}>
            <div className={styles.image}>
                <Image src={meal.image} alt={meal.title} fill />
            </div>
            <div className={styles.headerText}>
                <h1>{meal.title}</h1>
                <p className={styles.creator}>
                    by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                </p>
                <p className={styles.summary}>{meal.summary}</p>
            </div>
        </header>
        <main>
            <p className={styles.instructions} dangerouslySetInnerHTML={{
                __html: meal.instructions
            }}></p>
        </main>
    </>
}