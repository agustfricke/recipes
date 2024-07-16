package main

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/mattn/go-sqlite3"
)

type Project struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Response struct {
	Data       []Project `json:"data"`
	PreviousID *int      `json:"previousId"`
	NextID     *int      `json:"nextId"`
}

var db *sql.DB

func main() {
	var err error
	// Abrir la conexión a la base de datos SQLite
	db, err = sql.Open("sqlite3", "projects.db")
	if err != nil {
		log.Fatal("failed to open database: ", err)
	}
	defer db.Close()

	// Crear la tabla si no existe
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS projects (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL
		)
	`)
	if err != nil {
		log.Fatal("failed to create table: ", err)
	}

	// Insertar datos de prueba si la tabla está vacía
	var count int
	err = db.QueryRow("SELECT COUNT(*) FROM projects").Scan(&count)
	if err != nil {
		log.Fatal("failed to count projects: ", err)
	}

	if count == 0 {
		stmt, err := db.Prepare("INSERT INTO projects (name) VALUES (?)")
		if err != nil {
			log.Fatal("failed to prepare statement: ", err)
		}
		defer stmt.Close()

		for i := 1; i <= 100; i++ {
			_, err = stmt.Exec(fmt.Sprintf("Project %d", i))
			if err != nil {
				log.Fatal("failed to insert project: ", err)
			}
		}
	}

	app := fiber.New()

	app.Use(cors.New(cors.Config{
    AllowOrigins:     "*",
		AllowCredentials: false,
	}))

	app.Get("/api/projects", getProjects)

	log.Fatal(app.Listen(":8080"))
}

func getProjects(c *fiber.Ctx) error {
  time.Sleep(2000 * time.Millisecond)
	cursor, err := strconv.Atoi(c.Query("cursor", "0"))
	if err != nil {
		return c.Status(400).SendString("Invalid cursor")
	}

	limit := 10 // Número de proyectos por página

	// Consulta para obtener los proyectos de la página actual
	rows, err := db.Query("SELECT id, name FROM projects ORDER BY id LIMIT ? OFFSET ?", limit, cursor)
	if err != nil {
		return c.Status(500).SendString("Database query error")
	}
	defer rows.Close()

	var projects []Project
	for rows.Next() {
		var p Project
		if err := rows.Scan(&p.ID, &p.Name); err != nil {
			return c.Status(500).SendString("Error scanning row")
		}
		projects = append(projects, p)
	}

	// Obtener el total de proyectos
	var totalCount int
	err = db.QueryRow("SELECT COUNT(*) FROM projects").Scan(&totalCount)
	if err != nil {
		return c.Status(500).SendString("Error counting projects")
	}

	var previousID, nextID *int
	if cursor > 0 {
		prev := cursor - limit
		if prev < 0 {
			prev = 0
		}
		previousID = &prev
	}
	if cursor+limit < totalCount {
		next := cursor + limit
		nextID = &next
	}

	response := Response{
		Data:       projects,
		PreviousID: previousID,
		NextID:     nextID,
	}

	return c.JSON(response)
}
