# SSAFY Bigdata project

### 팀원 

송다은, 신상엽, 조서원, 한기연, 황정호



### 깃 브랜치 구조

- master
  - dev
  - test
    - front
      - feature/login
      - feature/signup
    - back
      - feature/login
      - feature/signup
    - readme
      - readme/SY
      - readme/KY



### 커밋 규칙 (누가 뭘 고쳤는지 보기 편함)

날짜 | "내용(영어로)" | SY(대문자)

0331 | update readme | SY



dev 브랜치는 배포 할때 test를 옮기는 용도



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

