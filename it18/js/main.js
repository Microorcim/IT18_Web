// В переменную inputs все элементы класса validate
let inputs = document.getElementsByClassName("validate");
// inputs - массив, перебираем в цикле, можно использовать foreach
for (let i = 0; i < inputs.length; i++){
    inputs[i].addEventListener("invalid", check);
    inputs[i].addEventListener('input', reset);
};

function reset(){
    this.classList.remove("error"); // отключаем class error
}


console.log("Сообщение!!!");
function check(event){
    // для проверки вызывается эта функция или нет,
    //выведем информацию в консоль
    this.classList.add("error");
    // или информацию в консоль console.log("Сообщение!!!");
    //this.classlist.add("error");
    document.getElementById("error").innerText = "Ошибка при заполнении полей";
    document.getElementById("error").style.display = "block";
    event.preventDefault();
};

document.getElementById("regform").addEventListener("submit", checkPassword);
function checkPassword(event){
    document.getElementById("error").style.display = "none";
    // Получаем значение из поля password и confirm
    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirm").value;
    if(password != confirm){
        document.getElementById("error").innerText = "Пароли не совпадают";
        document.getElementById("error").style.display = "block";
        event.preventDefault();
    }
    else {
        // Берем свойство чекер, если True - галочка стоит, false - нет
        let flag = document.getElementById("pd").checked;
        if(!flag){
            document.getElementById("error").innerText = "Нет согласия на ПД";
            document.getElementById("error").style.display = "block";
            event.preventDefault();
        }
     }

          // Проверка логина на уникальность
     // Проверки предыдущие завершены, но все равно прерываем отправку формы
     event.preventDefault();
     // вызываем фукнцию checkLogin, которая будет создана ниже
     checkLogin();

}

async function checkLogin(){
    // получаем данные из формы, отправляем на сервер через js через ajax, 
    // получаем ответ и выводим  сообщение в случае ошибки
    // т.к.выполняется запрос на сервер перед function дописываем async
    let data = new FormData(); // Создаем пустой объект FormData и запишем в него Логин
    // не забыть задать id для поля Логин в register.php
    let login = document.getElementById("login").value; // получаем значение поля Логин
    // в объект FormData запишем Логин
    data.append('login', login);
    // Выполняем запрос на сервер
    let response = await fetch('checkLogin.php', {
        method: "POST",
        body: data
    });
    // await обозначает, что должен сначала получить результат запроса
    let result = await response.json();  //проверяем результат запроса
    if(result.status == "error"){
        document.getElementById("error").innerText = result.message;
            document.getElementById("error").style.display = "block";
    }
    else{
        // Отправляем ссылку на форму
        document.getElementById("regform").submit();
    }
}



//Объект document метод getElementById,
//оьращаемся к элементу по его id*
//addEventListener обработчик события
//событие invalid, если поле не прошло валидацию
//второй параметр, вызываем функцию, если это событие произошло
//валидация не пройдена 

