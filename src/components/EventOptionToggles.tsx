import styles from '@/styles/Custom.module.css';

interface EventOptionTogglesProps {
    showFreeEvents: () => void;
    showNoBookingRequiredEvents: () => void;
    setMinAge: (minAge: number) => void;
    setMaxAge: (maxAge: number) => void;
};


export default function EventOptionToggles(props: EventOptionTogglesProps) {
    const { showFreeEvents, showNoBookingRequiredEvents, setMinAge, setMaxAge } = props;

    const minAgeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinAge(Number(e.target.value));
    };
    const maxAgeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxAge(Number(e.target.value));
    };

    
	return (
		<div className={`${styles.eventOptions} ${styles.optionsGrid}`}>
			<button className={styles.optionButton} onClick={showFreeEvents}>Free</button>
			<button className={styles.optionButton} onClick={showNoBookingRequiredEvents}>
				No booking required
			</button>
			<div className={styles.ageRange}>
				<p>Age</p> 
				<div className={styles.option}>
					<label htmlFor="minAge"></label>
					<input
						className={styles.optionInput}
						type="number"
						placeholder="min"
                        onChange={minAgeHandler}
					/>
					<label htmlFor="maxAge"></label>
					<input
						className={styles.optionInput}
						type="number"
						placeholder="max"
                        onChange={maxAgeHandler}
					/>
				</div>
			</div>
		</div>
	);
}

/* todo:
1. add onclick filter to free to filter events by cost === 0
2. add onclick filter to no booking required to filter events by booking === false
3. add onchange filter to age range to filter events by age range
4. add max === 12 to minAgeMonths and maxAgeMonths on createEvent
 */