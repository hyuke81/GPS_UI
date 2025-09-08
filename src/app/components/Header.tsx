"use client";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <a
          href="#"
          aria-label="검색 초기 상태로 초기화"
          onClick={(e) => {
            e.preventDefault();
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("gps:reset-search"));
            }
          }}
        >
          <Image
            src="/images/main_logo.png"
            alt="특허 검색 시스템"
            width={170}
            height={60}
            className={styles.mainLogo}
          />
        </a>
      </div>
      
      <div className={styles.rightSection}>
        <Image
          src="/images/lawfirm_icon.png"
          alt="수호 특허법률사무소 아이콘"
          width={50}
          height={50}
          className={styles.lawfirmIcon}
        />
        <Image
          src="/images/lawfirm_logo.png"
          alt="수호 특허법률사무소 로고"
          width={170}
          height={60}
          className={styles.lawfirmLogo}
        />
      </div>
    </header>
  );
} 