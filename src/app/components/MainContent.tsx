"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./MainContent.module.css";
import PatentList from "./PatentList";
import AIFeatures from "./AIFeatures";
import { dummyPatentData, PatentData } from "../data/dummyPatentData";

export default function MainContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<PatentData[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isDomestic, setIsDomestic] = useState(true);
  const [isForeign, setIsForeign] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      setShowResults(false);

      // 로딩 시뮬레이션 (2초)
      setTimeout(() => {
        setSearchResults(dummyPatentData);
        setIsLoading(false);
        setShowResults(true);
      }, 2000);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    setIsLoading(false);
  };

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
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className={styles.searchButton}
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isLoading}
            >
              {isLoading ? "검색 중..." : "검색"}
            </button>
          </div>

          {/* 국내/해외 체크박스 선택 영역 */}
          <div className={styles.countryCheckboxes}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isDomestic}
                onChange={() => setIsDomestic((prev) => !prev)}
              />
              국내
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isForeign}
                onChange={() => setIsForeign((prev) => !prev)}
              />
              해외
            </label>
          </div>

          {/* 로딩 상태 */}
          {isLoading && (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p>AI가 특허를 분석하고 있습니다...</p>
            </div>
          )}
        </div>
      </section>

      {/* 하단 섹션: 검색 결과 또는 AI 기능 소개 */}
      {showResults && searchResults.length > 0 ? (
        <section className={styles.resultsSection}>
          <div className={styles.resultsContainer}>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsTitle}>검색 결과</h2>
              <button onClick={handleReset} className={styles.resetButton}>
                초기화
              </button>
            </div>
            <PatentList
              patents={searchResults}
              totalCount={searchResults.length}
            />
          </div>
        </section>
      ) : (
        <AIFeatures />
      )}
    </div>
  );
}
