import Header from "./components/Header";
import MainContent from "./components/MainContent";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <MainContent />
    </div>
  );
}
