# 회의실 예약 관리 프로그램

## 설치

### ✔ Requirements
- node
- yarn

> [Node 설치 페이지](https://nodejs.org/ko/) \
> [Yarn 설치 페이지](https://yarnpkg.com/getting-started/install)
>

### [임시 페이지 주소](https://fenrird.github.io/meeting-room-reservation-app-web/)
> githubPage를 이용하여 배포해서 속도가 느립니다.
> https://fenrird.github.io/meeting-room-reservation-app-web/
### 실행 방법

```shell

$ git clone https://github.com/fenrirD/meeting-room-reservation-app.git

$ cd ./meeting-room-reservation-app

$ yarn 

$ yanr start # http://localhost:3000
```

## 폴더 구조
```
└─meeting-room-reservation-app
    ├─public
    └─src
        ├─components
        │  ├─CurrentTime
        │  ├─MenuLayer
        │  ├─Reservation
        │  ├─ReservationLayout
        │  ├─Room
        │  │  ├─RoomName
        │  │  └─RoomRow
        │  │      └─RowItem
        │  └─RoomLayout
        │      ├─RoomBody
        │      └─RoomHeader
        ├─constants
        ├─hook
        ├─reudx
        ├─types
        └─utils
```

## 개발 요구사항

### 1.회의실 현황판
- [x] 회의실은 A 부터 J 까지 10개.
- [x] 회의실은 예약 시간 단위는 최소 30분.
- [x] 회의실 현황판은 11행 19열 칸의 격자로 구성.
- [x] 1열의 2행부터 11행은 회의실.
- [x] 행의 높이는 고정.
- [x] 현황판의 최소 너비는 1000px, 최대 너비는 브라우저의 크기와 일치하며 리사이징 하면 현황판의 가로 크기도 변경
- [x] 현황판에 빨간색 1px 세로 선으로 현재시간 표시. 현재시간에 맞게 픽셀 단위 실시간 갱신
- [x] 현황판의 예약이 없는 빈 칸을 클릭하여 현황판 메뉴 레이어 생성
- [x] 현황판의 예약이 없는 빈 칸을 드래깅 하여 메뉴레이어 생성
- [x] LocalStorage 를 사용하여 예약된 일정 저장

### 2.예약 일정
- [x] 예약된 일정을 상하좌우로 드래깅 하여 시간 및 회의실 변경이 가능해야 함
- [x] 예약된 일정을 리사이징 하여 시간 변경이 가능해야 함
- [x] 예약된 일정을 클릭하여 메뉴 레이어 노출
- [x] 하나의 회의실에 시간이 겹치는 예약은 존재할 수 없음

### 3.메뉴 레이어
- [x] 메뉴 레이어 바깥쪽을 클릭하면 메뉴 레이어가 닫힘
- [x] 메뉴 레이어는 현황판과 일정을 통틀어 동시에 하나만 존재할 수 있음.
- [x] 예약된 일정을 클릭하여 메뉴 레이어 노출
- [x] 일정 메뉴 레이어를 통해 일정 내용 수정 및 일정 삭제가 가능해야 함

