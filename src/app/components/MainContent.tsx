"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./MainContent.module.css";
import PatentList from "./PatentList";
import AIFeatures from "./AIFeatures";
import Toast from "./Toast";
import { PatentData, getSimilarWordsByKeyword } from "../data/dummyPatentData";
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
  const [similarWords, setSimilarWords] = useState<string[]>([]);
  const [showSimilarWords, setShowSimilarWords] = useState(false);

  const showToast = (message: string, type: "info" | "warning" | "error" | "success" | "neutral" = "info") => {
    const id = toastId + 1;
    setToastId(id);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // 검색어가 변경될 때 유사단어를 가져오는 함수
  useEffect(() => {
    const loadSimilarWords = async () => {
      if (searchQuery.trim()) {
        try {
          const words = await getSimilarWordsByKeyword(searchQuery);
          setSimilarWords(words);
          setShowSimilarWords(words.length > 0);
        } catch (error) {
          console.error('Error loading similar words:', error);
          setSimilarWords([]);
          setShowSimilarWords(false);
        }
      } else {
        setSimilarWords([]);
        setShowSimilarWords(false);
      }
    };

    // 디바운싱: 500ms 후에 실행
    const timeoutId = setTimeout(loadSimilarWords, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

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

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      setShowResults(false);

      try {
        const results = await searchPatentsByKeyword(searchQuery);
        setSearchResults(results);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
        setShowResults(true);
        showToast("검색 중 오류가 발생했습니다.", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
    setIsLoading(false);
    setSimilarWords([]);
    setShowSimilarWords(false);
  };

  // 유사단어 클릭 핸들러
  const handleSimilarWordClick = (word: string) => {
    setSearchQuery(word);
    // 클릭한 단어로 즉시 검색 실행
    setTimeout(() => {
      handleSearch();
    }, 100);
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

      {!showResults && (
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
              placeholder="예시: 4륜, 기계식키보드, 물류로봇, 인공지능, 태양광발전"
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

          {/* 유사단어 표시 영역 */}
          {showSimilarWords && similarWords.length > 0 && (
            <div className={styles.similarWordsContainer}>
              <div className={styles.similarWordsHeader}>
                <span className={styles.similarWordsLabel}>유사 키워드</span>
              </div>
              <div className={styles.similarWordsList}>
                {similarWords.map((word, index) => (
                  <span 
                    key={index} 
                    className={styles.similarWordTag}
                    onClick={() => handleSimilarWordClick(word)}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}

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
      )}

      {showResults ? (
        <div className={styles.splitContainer}>
          <div className={styles.leftColumn}>
            <section className={styles.searchSectionInline}>
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
                    placeholder="예시: 4륜, 기계식키보드, 물류로봇, 인공지능, 태양광발전"
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

                {/* 유사단어 표시 영역 */}
                {showSimilarWords && similarWords.length > 0 && (
                  <div className={styles.similarWordsContainer}>
                    <div className={styles.similarWordsHeader}>
                      <span className={styles.similarWordsLabel}>유사 키워드</span>
                    </div>
                    <div className={styles.similarWordsList}>
                      {similarWords.map((word, index) => (
                        <span 
                          key={index} 
                          className={styles.similarWordTag}
                          onClick={() => handleSimilarWordClick(word)}
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

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
          </div>
          <div className={styles.rightColumn}>
            <section className={styles.resultsSectionInline}>
              <div className={styles.resultsContainerFull}>
                <div className={styles.resultsHeader}>
                  <h2 className={styles.resultsTitle}>검색 결과</h2>
                  <button onClick={handleReset} className={styles.resetButton}>
                    초기화
                  </button>
                </div>
                {searchResults.length > 0 ? (
                  <PatentList
                    patents={searchResults}
                  />
                ) : (
                  <div className={styles.noResults}>
                    <p>검색 결과가 없습니다. 다른 키워드로 검색해보세요.</p>
                    <p>예시: 4륜, 기계식키보드, 물류로봇, 인공지능, 태양광발전</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <AIFeatures />
      )}
    </div>
  );
}
