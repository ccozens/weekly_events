// ContactForm
import styles from '@/styles/Form.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ContactMessage } from '@/types/ContactMessage';
import { useHoneyPot } from './useHoneypot';

export default function Contact(props: {
	handleSubmitForm: SubmitHandler<ContactMessage>;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactMessage>();

	const { honeyPotField } = useHoneyPot();
	const onSubmit = props.handleSubmitForm;

	return (
		<div>
			<form
				className={`${styles.form} ${styles.contact}`}
				onSubmit={handleSubmit(onSubmit)}>
				{honeyPotField}
				<label htmlFor="name">Name:</label>
				<input
					className={`${styles.input} ${styles.contactInput}`}
					type="text"
					placeholder="Please enter your name"
					{...register('name', {
						required: '⚠ Please enter your name.',
					})}
				/>
				{errors.name && (
					<p className={styles.error}>{errors.name.message}</p>
				)}
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					className={`${styles.input} ${styles.contactInput}`}
					placeholder="Please enter your email address"
					{...register('email', {
						required: '⚠ Please enter your email address.',
					})}
				/>
				{errors.email && (
					<p className={styles.error}>{errors.email.message}</p>
				)}
				<label htmlFor="message">Message:</label>
				<textarea
					className={`${styles.input} ${styles.message}`}
					placeholder="Enter message here"
					{...register('message', {
						required:
							'⚠ Please enter a message, max 10000 characters.',
						maxLength: 10000,
					})}
				/>
				{errors.message && (
					<p className={styles.error}>{errors.message.message}</p>
				)}
				<input
					type="submit"
					className={`${styles.input} ${styles.submit}`}
				/>
			</form>
		</div>
	);
}
