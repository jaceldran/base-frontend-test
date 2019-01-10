@echo off

IF "%1" == "--api" GOTO RUN_API
IF "%1" == "--php" GOTO RUN_PHP

:: guardar path
set current_path=%cd%

:: php internal server
:RUN_PHP
cd ..
php -S localhost:80

:: api server desde path inicial
:RUN_API
cd %current_path%
java -jar backend/server.jar
