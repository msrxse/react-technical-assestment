import Welcome from "./components/Welcome";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <Welcome />
    </div>
  );
}
