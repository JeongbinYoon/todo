# TODO-LIST

## 🚀 기술 스택

![Next JS](https://img.shields.io/badge/Next-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=flat-square&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=flat-square&logo=postgresql&logoColor=white)

## 📌 프로젝트 개요

React 복습하기

## 🛠️ 개발 히스토리

### 3차 (Next.js 변경 및 서버 연동)

#### 작업사항

- **Next.js 15**로 마이그레이션
- **DB(PostgreSQL) 사용**: 데이터베이스로 PostgreSQL을 도입하여 지속적인 데이터 저장
- **Prisma 사용**: Prisma를 ORM으로 도입하여 데이터베이스와의 상호작용을 더욱 효율적이고 안전하게 관리
- **React Query 적용**: 서버 데이터 요청 및 캐싱 관리를 위해 React Query 적용
- **Server Actions 사용**: 서버 로직 클라이언트 코드와 분리
- **UX 개선**: hover 시 색상 및 삭제 버튼 노출

#### 회고

- 이번에 선택한 기술들은 이전에 처음 사용해보며 어려움을 겪었던 기술을 다시 한번 사용해보기 위해 선택함
- React Query 사용으로 Jotai 상태 관리 코드가 많이 줄었음
- React Query 오랜만에 사용해서 기억이 잘 안 남
- TanStack Query로 버전업된 부분 살펴보기

---

### 2차 (기능 개선 및 UI/UX 향상)

#### 작업사항

- **TypeScript** 적용
- **상태 관리 라이브러리 사용**: Jotai 도입. 불필요한 렌더링을 최소화
- **UX 개선**: 편집 기능 변경 (버튼 방식 -> 항목 선택 시 편집모드)

#### 회고

- 상태관리 라이브러리 사용 전 TypeScript로 type 적용해보기
- 이전에 사용해봤던 Recoil과 동작 방식이 비슷한 Jotai로 선택
- 상태관리 라이브러리 도입으로 코드가 간결해졌음

---

### 1차 (기본 기능 구현)

#### 작업사항

- **React**: UI 구성과 상태 관리
- **CRUD**: 기본적인 CRUD 기능 구현
- **완료/미완료 필터**: 할 일 항목에 대해 완료/미완료 상태를 필터링하여 표시
- **정렬**: 완료된 항목은 리스트 하단으로, 완료되지 않은 항목은 상단에 위치

#### 회고

props drilling.. 상태 관리 라이브러리 사용해야지
