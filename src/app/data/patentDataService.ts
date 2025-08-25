import {
  SolarPowerData,
  PatentData,
  convertSolarPowerToPatentData,
  filterDataByKeyword,
} from "./dummyPatentData";
import solarPowerData from "./solarPower.json";

// solarpower.json 데이터를 가져오는 함수
export const loadSolarPowerData = (): SolarPowerData[] => {
  try {
    return solarPowerData as SolarPowerData[];
  } catch (error) {
    console.error("Error loading solar power data:", error);
    return [];
  }
};

// 키워드로 특허 데이터를 검색하는 함수
export const searchPatentsByKeyword = (keyword: string): PatentData[] => {
  try {
    const solarPowerData = loadSolarPowerData();
    const filteredData = filterDataByKeyword(solarPowerData, keyword);
    return convertSolarPowerToPatentData(filteredData);
  } catch (error) {
    console.error("Error searching patents:", error);
    return [];
  }
};

// 모든 특허 데이터를 가져오는 함수
export const getAllPatentData = (): PatentData[] => {
  try {
    const solarPowerData = loadSolarPowerData();
    return convertSolarPowerToPatentData(solarPowerData);
  } catch (error) {
    console.error("Error loading all patent data:", error);
    return [];
  }
};
