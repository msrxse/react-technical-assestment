import styles from './Welcome.module.css';

export default function Welcome() {
  return (
    <>
      <div className={styles.welcome}>
        <h1>Welcome To My App</h1>
        <p>This is going to be the coolest app in the world!</p>
      </div>
    </>
  );
}
