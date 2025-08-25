"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./MainContent.module.css";
import PatentList from "./PatentList";
import AIFeatures from "./AIFeatures";
import Toast from "./Toast";
import { PatentData } from "../data/dummyPatentData";
import { searchPatentsByKeyword } from "../data/patentDataService";

interface ToastMessage {
  id: number;
  message: string;
  type: "info" | "warning" | "error" | "success" | "neutral";
}

export default function MainContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<PatentData[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isDomestic, setIsDomestic] = useState(true);
  const [isForeign, setIsForeign] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [toastId, setToastId] = useState(0);

  const showToast = (message: string, type: "info" | "warning" | "error" | "success" | "neutral" = "info") => {
    const id = toastId + 1;
    setToastId(id);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleDomesticChange = (checked: boolean) => {
    setIsDomestic(checked);
    if (!checked && !isForeign) {
      setIsDomestic(true);
    }
  };

  const handleForeignChange = (checked: boolean) => {
    // 해외 검색은 비활성: 항상 체크 해제 상태 유지하고 토스트만 표시
    if (checked) {
      showToast("해외 검색 서비스는 현재 준비 중입니다.", "neutral");
    }
    setIsForeign(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      setShowResults(false);

      setTimeout(() => {
        try {
          const results = searchPatentsByKeyword(searchQuery);
          setSearchResults(results);
          setShowResults(true);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
          setShowResults(true);
        } finally {
          setIsLoading(false);
        }
      }, 1000);
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
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

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
              placeholder="예시: 태양광, 풍력, 친환경"
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

          <div className={styles.countryCheckboxes}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isDomestic}
                onChange={(e) => handleDomesticChange(e.target.checked)}
              />
              국내
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isForeign}
                onChange={(e) => handleForeignChange(e.target.checked)}
              />
              해외
            </label>
          </div>

          {isLoading && (
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p>AI가 특허를 분석하고 있습니다...</p>
            </div>
          )}
        </div>
      </section>

      {showResults ? (
        <section className={styles.resultsSection}>
          <div className={styles.resultsContainer}>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsTitle}>검색 결과</h2>
              <button onClick={handleReset} className={styles.resetButton}>
                초기화
              </button>
            </div>
            {searchResults.length > 0 ? (
              <PatentList
                patents={searchResults}
                totalCount={searchResults.length}
              />
            ) : (
              <div className={styles.noResults}>
                <p>검색 결과가 없습니다. 다른 키워드로 검색해보세요.</p>
                <p>예시: 태양광, 풍력, 친환경</p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <AIFeatures />
      )}
    </div>
  );
}
