<?php
// Подключаемся к БД
include 'db.php';
// Проверка на пустоту данных в POST
if(!empty($_POST)){
    $Login = $_POST['login'];
    // Пишем запрос к БД
    $query = "SELECT * FROM `users` WHERE `login`='$Login'";
    // Выполняем запрос
    $result = $link->query($query);
    // Результат количество строк, если > 0, то такой пользователь существует
    if($result->num_rows > 0){
        // Создаем переменную с сообщением об ошибке
        $message = "Пользователь с таким логином существует";
        // Создаем переменную - массив
        $response = ['status' => 'error', 'message' => $message];
    }
    else
        $response = ['status' => 'ok'];
    // $response преобразуем в json и отправляем
    echo json_encode($response);
    // Сереверная часть проверки Логина завершена
}
?>
