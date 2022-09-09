# 식스샵 프론트개발자 채용 과제

- [과제 안내 링크](https://www.notion.so/sixshop/af7f8a9586b648e6ba92a8c24ff0ef66)
- 과제 제출 기한은 과제 메일 발송일로부터 7일 후 자정 12시까지 입니다. 기한을 꼭 지켜주세요.

# 실행방법

- yarn install
- yarn dev

### test 방법

- yarn test

# 기술스택

- 언어: TypeScript
- 프레임워크: Next.js
- 라이브러리: Styled Components, Axios
- 상태관리: Recoil
- 테스트: React Testing Library

## 웹 접근성

### login 입력값 검증후 로그인 버튼 비활성화 타이밍 문제

- 요구사항에는 입력값이 유효한 경우에만 로그인 버튼이 활성화되어야함
  그러면 비활성화 타이밍은 타이핑을 할때 해야할까, 아니면 오류메시지와 같이 포커스가 벗어났을때 비활성화 되야할까?
  -> 포커스가 벗어났을때 비활성화를 시키는것이 ux적으로 더 좋을듯 하다
  오류메시지 없이 로그인 버튼이 비활성화가 되면 유저입장에서 혼란스러울수도 있음

## products 페이지

msw를 사용한 api이여서 ssg에서는 api통신이 안됨
-> 과제 구현 사항에 맞춰서 API를 사용한 페이지 한개를 더 구현

상품 상세 페이지 경우에는 데이터가 자주 바뀌지 않을듯 해서 ssg로 구현
-> productsSSG에 구현

## 페이지네이션 페이지

해당 페이지 또한 ssg로 구현을 하려다
상품이 추가 될때 마다 build가 되면 너무 자주 build가 될듯 해서

pre-render + csr로 기존 방식으로 선회

## 추가 구현

Light House - SEO,접근성 100점

#### 페이지네이션 페이지

상세 페이지로 이동후 다시 페이지네이션 페이지로 왔을때 기존 스크롤 복원

## 선택구현사항
- [x] lazy loading - img 태그 프로퍼티로 구현
- [x] login test
