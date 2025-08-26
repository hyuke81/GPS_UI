// 새로운 데이터 구조 정의
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

// 키워드 매핑 정의
export const KEYWORD_MAPPING = {
  // 4륜, 전륜, 자동차
  "4륜": "FourWheel_ FrontWheel_Car",
  전륜: "FourWheel_ FrontWheel_Car",
  자동차: "FourWheel_ FrontWheel_Car",

  // 기계식 키보드, 무선 마우스, 인체공학
  기계식키보드: "MechanicalKeyboard_Wireless_MouseErgonomics",
  무선마우스: "MechanicalKeyboard_Wireless_MouseErgonomics",
  인체공학: "MechanicalKeyboard_Wireless_MouseErgonomics",

  // 물류로봇, 스마트팩토리, iot
  물류로봇: "LogisticsRobot_SmartFactory_IoT",
  스마트팩토리: "LogisticsRobot_SmartFactory_IoT",
  iot: "LogisticsRobot_SmartFactory_IoT",

  // 인공지능, 딥러닝, 신경망
  인공지능: "AI_DeepLearning_NeuralNetwork",
  딥러닝: "AI_DeepLearning_NeuralNetwork",
  신경망: "AI_DeepLearning_NeuralNetwork",

  // 태양광 발전, 태양광 패널
  태양광발전: "SolarPowerGeneration_SolarPanels",
  태양광패널: "SolarPowerGeneration_SolarPanels",
};

// 키워드로 폴더 경로를 찾는 함수
export const getFolderPathByKeyword = (keyword: string): string | null => {
  const lowerKeyword = keyword.toLowerCase();

  for (const [key, folder] of Object.entries(KEYWORD_MAPPING)) {
    if (lowerKeyword.includes(key.toLowerCase())) {
      return folder;
    }
  }

  return null;
};

// JSON 데이터를 PatentData로 변환하는 함수
export const convertJsonToPatentData = (data: any[]): PatentData[] => {
  return data.map((item, index) => ({
    id: (index + 1).toString(),
    title: item.발명명칭_ko || item.발명명칭 || "-",
    description: item.발명명칭_ko || item.발명명칭 || "-",
    applicationNumber: item.출원번호 || "-",
    patentNumber: item.국가 || "-",
    patentHolder: "-", // 데이터에 없는 필드
    applicationDate: "-", // 데이터에 없는 필드
    similarity: Math.round((item.유사도 || 0) * 100), // 0~1 범위를 0~100으로 변환
    imageUrl: undefined,
  }));
};
