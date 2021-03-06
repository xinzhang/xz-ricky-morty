import Head from 'next/head';
import styles from 'styles/Home.module.css';
import Link from 'next/link';

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

// export async function getServerSideProps({ query }) {
//   const { id } = query;
//   const res = await fetch(`${defaultEndpoint}${id}`);
//   const data = await res.json();
//   return {
//     props: { data },
//   };
// }

export async function getStaticProps({ params }) {
  const { id } = params;
  const res = await fetch(`${defaultEndpoint}${id}`);
  const data = await res.json();
  return {
    props: { data },
  };
}

export async function getStaticPaths() {
  return {
    paths: [...Array(100).keys()].map((key) => ({ params: { id: String(key) } })),
    fallback: false,
  };
}

export default function Character({ data }) {
  const { name, image, gender, location, origin, species, status } = data;
  return (
    <div className={styles.container}>
      <Head>
        <title>{name}</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Wubba Lubba Dub Dub!</h1>

        <div className={styles.profile}>
          <div className={styles['profile-image']}>
            <img src={image} alt={name} />
          </div>
          <div className={styles['profile-details']}>
            <h2>Character Details</h2>
            <ul>
              <li>
                <strong>Name:</strong> {name}
              </li>
              <li>
                <strong>Status:</strong> {status}
              </li>
              <li>
                <strong>Gender:</strong> {gender}
              </li>
              <li>
                <strong>Species:</strong> {species}
              </li>
              <li>
                <strong>Location:</strong> {location?.name}
              </li>
              <li>
                <strong>Originally From:</strong> {origin?.name}
              </li>
            </ul>
          </div>
        </div>

        <p className={styles.back}>
          <Link href="/">
            <a>Back to All Characters</a>
          </Link>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
