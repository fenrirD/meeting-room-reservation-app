# 회의실 예약 관리 프로그램

## 개발 요구사항

## 예약 데이터 구조

```json
{
  "room": "string",
  "name": "이시용",
  "reason": "dqdqq",
  "time": "time",
}

```



### 예약 일정 생성
* Mouse Move, Mouse Down, Mouse Up을 통해서 예약을 생성
* 생성 할 떄, 모달로 입력받음.

### 생성된 일정은 D&D를 이용하여 이동 및 사이즈 조정이 가능해야함
* DND를 이용하여 좌표 값으로 구현  예장

### 현재시간에 따라 픽셀 단위 시간 조정.

### 예약된 회의 일정은 LocalStorage 를 통해 관리