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

export const dummyPatentData: PatentData[] = [
  {
    id: "1",
    title: "태양광 패널 고장알림 시스템",
    description: "태양광 패널의 고장 상태를 실시간으로 감지하여 태양광 발전 시스템의 운전 상태를 모니터링 및 최적화하는 시스템",
    applicationNumber: "10-2024-0118240",
    patentNumber: "KR10-2790070",
    patentHolder: "(주)파랑이엔지",
    applicationDate: "2024-09-02",
    similarity: 95
  },
  {
    id: "2",
    title: "인공지능 모델을 사용하는 태양광발전장치 고장진단시스템",
    description: "유효한 기계학습을 통해 보다 효과적으로 발전전력을 예측하는 태양광발전 전력예측용 인공지능 모델생성방법",
    applicationNumber: "10-2024-0118241",
    patentNumber: "KR10-2790071",
    patentHolder: "(주)태양에너지",
    applicationDate: "2024-09-01",
    similarity: 88
  },
  {
    id: "3",
    title: "태양광 발전 및 DC 시스템의 멀티 임피던스 조합을 이용한 아크 고장 검출 장치 및 방법",
    description: "태양광 발전 및 DC 시스템의 멀티 임피던스 조합을 이용한 아크 고장 검출 장치 및 방법",
    applicationNumber: "10-2024-0104263",
    patentNumber: "KR10-2782068",
    patentHolder: "한국에너지솔루션 주식회사",
    applicationDate: "2024-08-05",
    similarity: 71
  },
  {
    id: "4",
    title: "태양광 패널 효율 최적화 시스템",
    description: "태양광 패널의 효율을 실시간으로 모니터링하고 최적화하는 시스템으로, 날씨 조건과 패널 상태에 따른 자동 조정 기능을 포함",
    applicationNumber: "10-2024-0119509",
    patentNumber: "KR10-2799329",
    patentHolder: "주식회사 원광에스앤티",
    applicationDate: "2024-09-03",
    similarity: 82
  },
  {
    id: "5",
    title: "스마트 태양광 발전소 관리 플랫폼",
    description: "IoT 기술을 활용한 태양광 발전소의 원격 모니터링 및 제어 시스템으로, 실시간 데이터 분석을 통한 예측 유지보수 기능 제공",
    applicationNumber: "10-2024-0120001",
    patentNumber: "KR10-2800001",
    patentHolder: "스마트솔라테크 주식회사",
    applicationDate: "2024-09-05",
    similarity: 76
  },
  {
    id: "6",
    title: "태양광 패널 자동 세정 시스템",
    description: "드론과 로봇 기술을 활용한 태양광 패널의 자동 세정 시스템으로, 먼지와 오염물질을 효과적으로 제거하여 발전 효율 향상",
    applicationNumber: "10-2024-0121001",
    patentNumber: "KR10-2801001",
    patentHolder: "클린에너지솔루션즈",
    applicationDate: "2024-09-10",
    similarity: 69
  },
  {
    id: "7",
    title: "태양광 발전 시스템의 에너지 저장 및 배전 최적화 방법",
    description: "배터리 저장 시스템과 연동하여 태양광 발전 전력의 효율적인 저장 및 배전을 최적화하는 방법",
    applicationNumber: "10-2024-0122001",
    patentNumber: "KR10-2802001",
    patentHolder: "에너지스토리지테크",
    applicationDate: "2024-09-15",
    similarity: 73
  },
  {
    id: "8",
    title: "태양광 패널 열 관리 시스템",
    description: "태양광 패널의 온도를 효과적으로 관리하여 효율을 유지하는 시스템으로, 냉각 장치와 온도 센서를 통합",
    applicationNumber: "10-2024-0123001",
    patentNumber: "KR10-2803001",
    patentHolder: "써멀솔라시스템즈",
    applicationDate: "2024-09-20",
    similarity: 67
  },
  {
    id: "9",
    title: "태양광 발전소 보안 모니터링 시스템",
    description: "AI 기반 영상 분석을 통한 태양광 발전소의 보안 모니터링 시스템으로, 침입 감지 및 자동 경보 기능 제공",
    applicationNumber: "10-2024-0124001",
    patentNumber: "KR10-2804001",
    patentHolder: "솔라시큐리티",
    applicationDate: "2024-09-25",
    similarity: 61
  },
  {
    id: "10",
    title: "태양광 패널 수명 예측 및 교체 최적화 시스템",
    description: "머신러닝을 활용한 태양광 패널의 수명 예측 및 교체 시점 최적화 시스템으로, 유지보수 비용 절감 효과",
    applicationNumber: "10-2024-0125001",
    patentNumber: "KR10-2805001",
    patentHolder: "라이프사이클솔라",
    applicationDate: "2024-09-30",
    similarity: 58
  }
]; 