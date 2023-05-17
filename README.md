## BoA KAIST - backend

카이스트 감사위 회계 전산화 시스템 백엔드

[ESlint & Prettier 설정법](https://seogeurim.tistory.com/15)

## .env 설정법

개인정보 등에 민감한 파일을 유출하지 않기 위해, .env를 사용합니다.

.env 파일은 .gitignore에 포함되어야 하며, push 시에 포함되면 절대 안됩니다!

아래의 설정법은 추후에 삭제될 예정입니다.

1. .env 파일을 프로젝트 폴더에 생성합니다.
2. 아래의 텍스트를 삽입합니다. (유출금지!)
DB_HOST = mongodb+srv://Byunk:MvvTElsik7syWhhh@boa-main-cluster.8qsc1tg.mongodb.net/?retryWrites=true&w=majority
