import Image from "next/image";
import styles from "./AIFeatures.module.css";

export default function AIFeatures() {
  return (
    <section className={styles.aiSection}>
      <div className={styles.aiContainer}>
        <h2 className={styles.aiTitle}>AI 기반 특허 검색 시스템</h2>
        <p className={styles.aiDescription}>
          관심있는 특허 주제를 입력하면 관련된 특허를 자동으로 찾아드립니다.
        </p>
        
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Image
                src="/images/search_icon.png"
                alt="스마트 검색"
                width={40}
                height={40}
              />
            </div>
            <h3 className={styles.featureTitle}>스마트 검색</h3>
            <p className={styles.featureDescription}>AI가 최적의 검색식을 생성</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Image
                src="/images/light_bulb_icon.png"
                alt="유사도 분석"
                width={60}
                height={60}
              />
            </div>
            <h3 className={styles.featureTitle}>유사도 분석</h3>
            <p className={styles.featureDescription}>정확한 유사성 수치 제공</p>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Image
                src="/images/clipboard_full_icon.png"
                alt="정밀도 조절"
                width={40}
                height={40}
              />
            </div>
            <h3 className={styles.featureTitle}>정밀도 조절</h3>
            <p className={styles.featureDescription}>선택적 검색 가능</p>
          </div>
        </div>
      </div>
    </section>
  );
} 