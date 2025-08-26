import { PatentData, getFolderPathByKeyword, convertJsonToPatentData, JsonPatentData } from './dummyPatentData';

// 동적으로 JSON 파일을 로드하는 함수
const loadJsonData = async (folderPath: string): Promise<JsonPatentData[]> => {
  try {
    const jsonModule = await import(`./${folderPath}/final_domestic_merged.json`);
    return jsonModule.default || [];
  } catch (error) {
    console.error(`Error loading data from ${folderPath}:`, error);
    return [];
  }
};

// 키워드로 특허 데이터를 검색하는 함수
export const searchPatentsByKeyword = async (keyword: string): Promise<PatentData[]> => {
  try {
    const folderPath = getFolderPathByKeyword(keyword);
    
    if (!folderPath) {
      console.log(`No matching folder found for keyword: ${keyword}`);
      return [];
    }

    console.log(`Loading data from folder: ${folderPath}`);
    const jsonData = await loadJsonData(folderPath);
    
    if (jsonData.length === 0) {
      console.log(`No data found in folder: ${folderPath}`);
      return [];
    }

    // 키워드로 데이터 필터링 (선택사항 - 모든 데이터를 반환할 수도 있음)
    const filteredData = jsonData.filter((item: JsonPatentData) => {
      const searchText = `${item.발명명칭_ko || ''} ${item.발명명칭 || ''} ${item.기준단어 || ''}`.toLowerCase();
      return searchText.includes(keyword.toLowerCase());
    });

    // 필터링된 데이터가 없으면 전체 데이터 반환
    const dataToConvert = filteredData.length > 0 ? filteredData : jsonData;
    
    return convertJsonToPatentData(dataToConvert);
  } catch (error) {
    console.error('Error searching patents:', error);
    return [];
  }
};

// 모든 특허 데이터를 가져오는 함수 (기본값으로 첫 번째 폴더 사용)
export const getAllPatentData = async (): Promise<PatentData[]> => {
  try {
    const defaultFolder = 'FourWheel_ FrontWheel_Car';
    const jsonData = await loadJsonData(defaultFolder);
    return convertJsonToPatentData(jsonData);
  } catch (error) {
    console.error('Error loading all patent data:', error);
    return [];
  }
};

// 사용 가능한 키워드 목록 반환
export const getAvailableKeywords = (): string[] => {
  return [
    '4륜', '전륜', '자동차',
    '기계식키보드', '무선마우스', '인체공학',
    '물류로봇', '스마트팩토리', 'iot',
    '인공지능', '딥러닝', '신경망',
    '태양광발전', '태양광패널'
  ];
};
