/*
package main

import (
    "fmt"
    "time"
)

func main() {
    // Obtener la fecha actual
    now := time.Now()

    // Iterar sobre los últimos 30 días
    for i := 0; i < 30; i++ {
        // Calcular la fecha para el día actual en el bucle
        day := now.AddDate(0, 0, -i)
        // Imprimir la fecha en el formato deseado
        fmt.Println(day.Format("2006-01-02"))
    }
}
*/

package main

import (
    "fmt"
    "time"
)

func main() {
    // Definir el primer día del mes de agosto de 2024
    year, month := 2024, time.September
    startDate := time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)

    // Calcular el último día del mes de agosto de 2024
    endDate := startDate.AddDate(0, 1, -1)

    // Iterar sobre todos los días del mes
    for d := startDate; !d.After(endDate); d = d.AddDate(0, 0, 1) {
      // call getUserCountByDate()
      /*
      */
      fmt.Println(d.Format("2006-01-02"))
    }
}
