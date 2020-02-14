// * api 통신하는 방법

// Content-type 종류: text/plain, text/html, application/json 등등
// method: GET(조회), POST(생성), PUT(업데이트), DELETE(삭제)

// JSON.parse(): JSON 문자열의 구문을 분석하고, 그 결과에서 javascript 값이나 객체를 생성

/*
1. 가장 기본적인 방법 - 배열
bash: curl -H "Content-type: text/plain" -d "name: hyemin, age: 25" http://127.0.0.1:3000/api/test (데이터 보내기)
code: (데이터 꺼내기)

WebApp.connectHandlers.use('/api/test', (req, res, next) => {
    
    console.log(req);

    let body = [];
    req.on('data', (chunk) => { // on? '등록'의 의미로 사용
        console.log('chunk', chunk); // chunk <Buffer 6e 61 6d 65 3a 20 68 79 65 6d 69 6e 2c 20 61 67 65 3a 20 32 35>
        body.push(chunk);
    }).on('end', () => {
        let result = Buffer.concat(body).toString(); // concat() ? 주어진 배열이나 값들을 기존 배열에 합침
        console.log(result); // name: hyemin, age: 25
    });
    res.end('hello!'); // 응답 종료
  });
  */

  
/*
 2. 가장 기본적인 방법 - string
 bash: curl -H "Content-type: application/json" -d '{"name": "hyemin", "age": 25}' http://127.0.0.1:3000/api/test (데이터 보내기)
 code: (데이터 꺼내기)

 WebApp.connectHandlers.use('/api/test', (req, res, next) => {

    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    }).on('end', () => {
        console.log(JSON.parse(body)); // {"name": "hyemin", "age": 25}
    }); 
    res.end('hello!');
 });
*/

/*
* bash로 코드 치지 않고 쉽게 데이터 보내는 방법: postman
Header부분: Content-type, Authorization
Body부분(raw): 데이터 입력 - 객체 형태
*/

/*
3. middleware 사용하기: body-parser

bash: meteor npm install body-parser --save
code: 

import bodyParser from 'body-parser';

WebApp.connectHandlers.use('/api/test', bodyParser.json());
WebApp.connectHandlers.use('/api/test', bodyParser.urlencoded());

WebApp.connectHandlers.use('/api/test', (req, res, next) => {
    let test = req.body;
    console.log(test); // { name: 'hyemin', age: 25 }
});
*/

/*
4. middleware 사용하기: Picker

bash: meteor add meteorhacks:picker
code:

import bodyParser from 'body-parser';
import { Picker } from 'meteor/meteorhacks:picker';

Picker.middleware(bodyParser.json({
    limit: '10mb' 
}));

Picker.route('/api/test', (params, req, res, next) => {
    console.log(params);
    console.log(req.body);
    
    res.end('hello');
});
*/


/*
* 추가적으로 알아두면 좋을 것

writeHead: 응답 헤더 작성
end: 응답 본문 작성

response.writeHead(200, { 'Content-Type' : 'text/html'} ); // end 라는 메소드를 이용하여 html 파일이나 html 소스를 보내 // 그 폼을 웹에 띄움
response.end('<h1>hello world</h1>');
*/