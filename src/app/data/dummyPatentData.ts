// solarpower.json의 데이터 구조
export interface SolarPowerData {
  기준단어: string;
  국가: string;
  출원번호: string;
  발명명칭: string;
  발명명칭_ko: string;
  유사도: number;
}

export interface PatentData {
  id: string;
  title: string;
  description: string;
  applicationNumber: string;
  patentNumber: string;
  patentHolder: string;
  applicationDate: string;
  similarity: number;
  imageUrl?: string;
}

// solarpower.json 데이터를 PatentData로 변환하는 함수
export const convertSolarPowerToPatentData = (
  data: SolarPowerData[]
): PatentData[] => {
  return data.map((item, index) => ({
    id: (index + 1).toString(),
    title: item.발명명칭_ko || item.발명명칭 || "-",
    description: item.발명명칭_ko || item.발명명칭 || "-",
    applicationNumber: item.출원번호 || "-",
    patentNumber: item.국가 || "-",
    patentHolder: "-", // solarpower.json에 없는 필드
    applicationDate: "-", // solarpower.json에 없는 필드
    similarity: Math.round(item.유사도 * 100), // 0~1 범위를 0~100으로 변환
    imageUrl: undefined,
  }));
};

// 키워드로 데이터를 필터링하는 함수
export const filterDataByKeyword = (
  data: SolarPowerData[],
  keyword: string
): SolarPowerData[] => {
  if (!keyword.trim()) return [];

  const lowerKeyword = keyword.toLowerCase();
  return data.filter(
    (item) =>
      item.기준단어.toLowerCase().includes(lowerKeyword) ||
      item.발명명칭_ko.toLowerCase().includes(lowerKeyword) ||
      item.발명명칭.toLowerCase().includes(lowerKeyword)
  );
};
