import Head from 'next/head';
import { GetStaticProps } from 'next';
import styles from '@/styles/Home.module.css';
// import prisma from '@/lib/prisma';
import prisma from '../../lib/prisma';
import { Event } from '@prismatypes';
import EventCard from '@/components/EventCard';

export const getStaticProps: GetStaticProps = async () => {
	const events: Events = await prisma.event.findMany({
		// no args = return all
	});

	return {
		props: { events: JSON.parse(JSON.stringify(events)) },
		revalidate: 10,
	};
};

type Events = Event[];

export default function Home(props: { events: Events }) {
	return (
		<>
			<Head>
				<title>Local events</title>
				<meta
					name="description"
					content="Local events for families"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/safari-pinned-tab.svg"
					color="#5bbad5"
				/>
				<meta name="msapplication-TileColor" content="#fff4c3" />
				<meta name="theme-color" content="#fff4c3" />
			</Head>
			<main className={styles.main}>
				<div>
					<h1>Events</h1>
					<div>
						{props.events.map((event: Event) => (
							<div key={event.id}>
								<EventCard event={event} />
							</div>
						))}
					</div>
				</div>
			</main>
		</>
	);
}
