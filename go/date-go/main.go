package main

import (
    "fmt"
    "time"
)

func main() {
    // Obtener la fecha y hora actual
    currentTime := time.Now()

    // Formatear la fecha y hora como día/mes/año hora:minuto:segundo
    formattedDateTime := currentTime.Format("02/01/2006 15:04:05")

    // Imprimir la fecha y hora formateadas
    fmt.Println("Fecha y hora actual:", formattedDateTime)
}
