# SSAFY Bigdata project

### 배포

프런트 : http://i02a201.p.ssafy.io/

백 : http://i02a201.p.ssafy.io:8080

### 팀원 

프론트엔드 : 송다은, 조서원

백엔드 : 신상엽, 한기연, 황정호



### 개발 환경

프론트 React.js

벡엔드 Django

데이터베이스 SQLLite



### 깃 브랜치 구조

- master
  - dev
  - test
    - front
      - login
      - signup
    - back
      - login
      - signup
    - etc
      - readme/SY
      - readme/KY
      - data/JH



### 커밋 규칙 (누가 뭘 고쳤는지 보기 편함)

날짜 | "내용(영어로)" | SY(대문자), (JIRA 이슈번호)

0331 | update readme | SY, (JIRA 이슈번호)

dev 브랜치는 배포 할때 test를 옮기는 용도



# What happened last week?

- 카카오/ 구글 간편로그인, 회원가입 코드만 함
- front/back aws 배포

# What are we doing this week?

- 설문 설정
- 모바일 버전만 제공
- Mobile releases move to monthly.

[설문 문항](https://www.notion.so/ce88d80f98b541aa8e870806e8506bfc)

[선정된 설문 문항](https://www.notion.so/2e25ee9d1f574313bab251a492c49b1d)

[음식 분배](https://www.notion.so/77ece14f4a0d48139e397a890c86f741)

- 성별 / 나이 는 회원 가입으로 받기
- menu_list == null 인 값이 많음 크롤링 하던가 해야될 듯
- naver datalab을 통한 데이터 제공을 안 하는 곳이 많음
- 음식 분석까지 가려니 너무 어려워짐

- **설문** **방식**

1. 전생체험
   - 당신은 지금 밥을 먹으려고 합니다. 아침 / 점심 / 저녁
   - 지금 막 밥을 먹으러 문 밖으로 나왔습니다. 누구랑 밥을 먹으러 가시나요? 친구 / 연인 / 직장동료
   - 이제 식당으로 출발합니다. 걸어서 근처 / 차타고 멀리
   - 식당 문을 열고 들어갔습니다. 이곳의 분위기는 어떤가요?
2. 

처음에는 유저가 없으니 나열하듯이 해서 추천

나중에는 비슷했던 사람이 좋다고 한 거

- **설문** **결과** **방식**

귀차니즘 돼지

졸린 아나콘다

황정호 멸치

동물로 할건지

음식으로 할건지

엄마가 해준 실패한 동코츠 라면

부장이 사준 맛없는 초밥

맛만 좋은

이쁘기만 한

3개 형식

https://whykelly.tistory.com/entry/맛을-나타내는-형용사-모음Taste-Adjectives

데이터 수집은 Naver에서 새로 해야 된다.

회원 가입, DB 설계

Front - 설명, 재미에 초점

Back -

송 -

황 - 로그인, 회원가









## How to Run

### 개발환경 구성

1. Python 설치
2. Node.js, NPM 설치

#### Back-end

```sh
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py initialize
python manage.py runserver
```

#### Front-end

```sh
cd frontend
npm install
npm run serve
```

