import { GetStaticProps, GetStaticPaths } from 'next';
import prisma from '@prismaclient';
import { Location } from '@prismatypes';
import styles from '@/styles/LocationPage.module.css';
import moreStyles from '@/styles/Custom.module.css';
import EventMap from '@/components/EventMap';
import { useLocationStore } from '@/stores/locationStore';
import Router from 'next/router';
import { useState, ReactNode } from 'react';
import Link from 'next/link';
import Modal from '@/components/confirmation/Modal';
import { fetchLocationPaths } from '@/functions/fetchLocationPaths';

export const getStaticProps: GetStaticProps = async (context) => {
	const locationId = context.params?.id;
	const location = await prisma.location.findUnique({
		where: { id: Number(locationId) },
	});

	return {
		props: { location: JSON.parse(JSON.stringify(location)) },
	};
};

export const getStaticPaths: GetStaticPaths = fetchLocationPaths;

export default function LocationPage({
	location,
}: {
	location: Location;
}) {
	const { name, address, website, phone, updatedAt } = location;
	const websitePresent = website ? (
		<Link
			className={`${styles.locationText} ${styles.locationLink}`}
			href={website}
			target="_blank"
			rel="noreferrer">
			{website}
		</Link>
	) : (
		<p className={styles.locationText}>unknown</p>
	);
	const phonePresent = phone ? (
		<Link
			className={`${styles.locationText} ${styles.locationLink}`}
			href={`tel:${phone}`}>
			{phone}
		</Link>
	) : (
		<p className={styles.locationText}>unknown</p>
	);

	const locationUpdated = new Date(updatedAt).toLocaleDateString(
		'en-GB'
	);

	// state flag for delete message
	const [deleteMessage, setDeleteMessage] = useState<ReactNode>('');
	const [errorMessage, setErrorMessage] = useState<ReactNode>('');
	const [showLocation, setShowLocation] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);
	const toggleModal = () => setShowModal(!showModal);

	// store location details in zustand store and push to edit location page
	const editLocation = (location: Location) => {
		// update location store with location details
		useLocationStore.setState({
			location: location,
		});
		// push to edit location page
		Router.push(`/locations/${location.id}/edit`);
	};

	//  delete location from database
	const deleteLocation = async (id: number): Promise<void> => {
		const response = await fetch(`/api/locations/${id}`, {
			method: 'DELETE',
		});
		if (response.ok) {
			setTimeout(() => {
				Router.push(`/locations`);
			}, 750);
			setDeleteMessage(
				<p className={moreStyles.successMessage}>
					Location deleted successfully.
				</p>
			),
				setShowLocation(false);
		} else {
			const errorData = await response.json();
			setErrorMessage(
				<p className={moreStyles.successMessage}>
					Failed to delete location: {errorData.error}
				</p>
			);
		}
	};

	return (
		<div>
			{showLocation && (
				<div className={styles.location}>
					<div className={styles.locationContainer}>
						<div className={styles.locationSummary}>
							<div className={styles.locationTitle}>{name}</div>
							<div>
								<p className={styles.locationTextLabel}>Address: </p>
								<p className={styles.locationText}>
									{address ? address : 'No address available'}
								</p>
								<p className={styles.locationTextLabel}>Website: </p>
								{websitePresent}
								<p className={styles.locationTextLabel}>Phone: </p>
								{phonePresent}
							</div>
						</div>
						<div className={styles.locationSummary}>
							<div className={styles.mapContainer}>
								<EventMap
									name={name}
									lat={(location.lat = 52.63367)}
									lng={(location.lng = -1.13222)}
								/>
							</div>
						</div>
					</div>
					<div className={styles.locationFooter}>
						<p className={styles.footerText}>
							Event last updated: {locationUpdated}
						</p>
						<button
							onClick={() => editLocation(location)}
							className={styles.footerButtons}>
							Edit location
						</button>
						<button
							onClick={toggleModal}
							className={styles.footerButtons}>
							Delete location
						</button>
					</div>
				</div>
			)}
			{showModal && (
				<Modal
					showModal={showModal}
					toggleModal={toggleModal}
					name={location.name}
					id={location.id}
					deleteLocation={deleteLocation}
				/>
			)}
			{deleteMessage}
			{errorMessage}
		</div>
	);
}
