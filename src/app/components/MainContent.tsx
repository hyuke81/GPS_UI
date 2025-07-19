"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./MainContent.module.css";
import SearchResults from "./SearchResults";
import AIFeatures from "./AIFeatures";

export default function MainContent() {
  const [sliderValue, setSliderValue] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const getSliderBackground = (value: number) => {
    const percentage = (value / 2) * 100;
    return `linear-gradient(to right, #007bff 0%, #007bff ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
    }
  };

  const handleBack = () => {
    setIsSearching(false);
  };

  if (isSearching) {
    return (
      <SearchResults 
        searchQuery={searchQuery}
        precision={sliderValue}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className={styles.container}>
      {/* 상단 검색 섹션 */}
      <section className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <div className={styles.searchHeader}>
            <Image
              src="/images/mainsearch_icon.png"
              alt="검색 아이콘"
              width={24}
              height={24}
              className={styles.searchIcon}
            />
            <h1 className={styles.searchTitle}>특허 주제 검색</h1>
          </div>
          
          <div className={styles.searchPrompt}>
            어떤 특허 주제를 찾고 있나요?
          </div>
          
          <div className={styles.searchInputContainer}>
            <input
              type="text"
              placeholder="예시: 태양광 패널"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              className={styles.searchButton}
              onClick={handleSearch}
              disabled={!searchQuery.trim()}
            >
              검색
            </button>
          </div>
          
          <div className={styles.precisionControl}>
            <h3 className={styles.precisionTitle}>검색 정밀도 조절</h3>
            <div className={styles.sliderContainer}>
              <input
                type="range"
                min="0"
                max="2"
                value={sliderValue}
                step="1"
                className={styles.slider}
                style={{ background: getSliderBackground(sliderValue) }}
                onChange={(e) => setSliderValue(Number(e.target.value))}
              />
              <div className={styles.sliderLabels}>
                <span className={sliderValue === 0 ? styles.activeLabel : ''}>포괄적 결과</span>
                <span className={sliderValue === 1 ? styles.activeLabel : ''}>균형적 결과</span>
                <span className={sliderValue === 2 ? styles.activeLabel : ''}>엄밀한 결과</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI 기능 소개 섹션 */}
      <AIFeatures />
    </div>
  );
} 