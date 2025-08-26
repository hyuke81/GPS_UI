"use client";
import { useState, useMemo } from "react";
import { PatentData } from "../data/dummyPatentData";
import styles from "./PatentList.module.css";

// 유사도 설정 옵션
const similarityOptions = [
  { value: "broad", label: "포괄" },
  { value: "balanced", label: "균형" },
  { value: "strict", label: "엄밀" },
];

interface PatentListProps {
  patents: PatentData[];
  totalCount?: number;
}

export default function PatentList({ patents }: PatentListProps) {
  const [similaritySetting, setSimilaritySetting] = useState("broad");
  const [sortOption, setSortOption] = useState("none");
  const [filterOption, setFilterOption] = useState("all");

  const sortOptions = [
    { value: "none", label: "정렬" },
    { value: "similarity", label: "유사도순" },
    { value: "date_old", label: "오래된순" },
    { value: "date_new", label: "최근순" },
  ];

  const filterOptions = [
    { value: "all", label: "전체" },
    { value: "recent", label: "최근 1년" },
    { value: "high_similarity", label: "유사도 80% 이상" },
  ];

  // 필터링된 특허 데이터
  const filteredPatents = useMemo(() => {
    switch (filterOption) {
      case "recent":
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        return patents.filter(
          (patent) => new Date(patent.applicationDate) >= oneYearAgo
        );
      case "high_similarity":
        return patents.filter((patent) => patent.similarity >= 80);
      default:
        return patents;
    }
  }, [patents, filterOption]);

  // 정렬된 특허 데이터
  const sortedPatents = useMemo(() => {
    const sorted = [...filteredPatents];

    switch (sortOption) {
      case "similarity":
        return sorted.sort((a, b) => b.similarity - a.similarity);
      case "date_old":
        return sorted.sort(
          (a, b) =>
            new Date(a.applicationDate).getTime() -
            new Date(b.applicationDate).getTime()
        );
      case "date_new":
        return sorted.sort(
          (a, b) =>
            new Date(b.applicationDate).getTime() -
            new Date(a.applicationDate).getTime()
        );
      case "none":
      default:
        return sorted;
    }
  }, [filteredPatents, sortOption]);

  // 유사도에 따른 색상 클래스 반환
  const getSimilarityColorClass = (similarity: number) => {
    if (similarity >= 95) return styles.similarity95;
    if (similarity >= 90) return styles.similarity90;
    if (similarity >= 80) return styles.similarity80;
    if (similarity >= 70) return styles.similarity70;
    if (similarity >= 60) return styles.similarity60;
    return styles.similarityLow;
  };

  return (
    <div className={styles.patentListContainer}>
      {/* 헤더 */}
      <div className={styles.listHeader}>
        <div className={styles.headerLeft}>
          <h3 className={styles.listTitle}>관련 특허 리스트</h3>
          <span className={styles.resultCount}>
            {sortedPatents.length}건 발견
          </span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.dropdownContainer + " " + styles.fullWidth}>
            <select
              value={similaritySetting}
              onChange={(e) => setSimilaritySetting(e.target.value)}
              className={styles.dropdown + " " + styles.similarityDropdown}
            >
              {similarityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.row}>
            <div className={styles.dropdownContainer}>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className={styles.dropdown}
              >
                {sortOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    hidden={option.value === "none"}
                    disabled={option.value === "none"}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.dropdownContainer}>
              <select
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                className={styles.dropdown}
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 특허 리스트 */}
      <div className={styles.patentList}>
        {sortedPatents.map((patent) => (
          <div key={patent.id} className={styles.patentItem}>
            <div className={styles.patentContent}>
              <div className={styles.patentHeader}>
                <h4 className={styles.patentTitle}>{patent.title}</h4>
                <div
                  className={`${styles.similarityTag} ${getSimilarityColorClass(
                    patent.similarity
                  )}`}
                >
                  {patent.similarity}% 유사
                </div>
              </div>

              <p className={styles.patentDescription}>{patent.description}</p>

              <div className={styles.patentDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>출원번호:</span>
                  <span className={styles.detailValue}>
                    {patent.applicationNumber}
                  </span>
                  <span className={styles.detailLabel}>특허번호:</span>
                  <span className={styles.detailValue}>
                    {patent.patentNumber}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>특허권자:</span>
                  <span className={styles.detailValue}>
                    {patent.patentHolder}
                  </span>
                  <span className={styles.detailLabel}>출원일:</span>
                  <span className={styles.detailValue}>
                    {patent.applicationDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
