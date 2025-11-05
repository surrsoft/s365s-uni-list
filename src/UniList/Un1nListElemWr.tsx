import styles from './Un1nListElemWr.module.css';

/**
 * Обёртка для элемента списка
 */
export function Un1nListElemWr({ children }: { children: React.ReactNode }) {
    return <div className={styles.wrapper}>
        {children}
    </div>
}