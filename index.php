<?php
/**
 * ACTIVIDAD 14: CÓDIGOS QR Y ACCESIBILIDAD - PWD 7° 2° GRUPO B
 * Escuela de Educación Secundaria Técnica N.º 1 "Eduardo Ader" - Vicente López
 * Alumno: Gadiel Siles
 * Profesor: Mansilla Muñoz York Elías (@docentedeclasesdeapoyo)
 * Ciclo Lectivo: 2026 - 2° Cuatrimestre
 *
 * Entrada PHP para compatibilidad con servidores locales (Apache, XAMPP, PHP CLI Server)
 */

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');

// Renderiza la aplicación principal accesible
if (file_exists(__DIR__ . '/index.html')) {
    include_once __DIR__ . '/index.html';
} else {
    echo "<h1>Error: No se encontró index.html</h1>";
}
