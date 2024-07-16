package main

import (
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

const uploadDir = "/home/agust/personal/testing-shit/upload-large-files/back/uploads"

func main() {
    app := fiber.New()
if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
    panic(fmt.Sprintf("Failed to create upload directory: %v", err))
}
    
	app.Use(cors.New(cors.Config{
    AllowOrigins:     "*",
		AllowCredentials: false,
	}))

    app.Post("/api/upload", handleChunkedUpload)

    app.Listen(":8080")
}

func handleChunkedUpload(c *fiber.Ctx) error {
    file, err := c.FormFile("file")
    if err != nil {
        return c.Status(400).SendString("Error retrieving the file")
    }

    chunkNumber, err := strconv.Atoi(c.FormValue("chunkNumber"))
    if err != nil {
        return c.Status(400).SendString("Invalid chunk number")
    }

    totalChunks, err := strconv.Atoi(c.FormValue("totalChunks"))
    if err != nil {
        return c.Status(400).SendString("Invalid total chunks")
    }

    // Create a temporary file path within the specified directory
    tempFilePath := filepath.Join(uploadDir, fmt.Sprintf("%s.part", file.Filename))
    tempFile, err := os.OpenFile(tempFilePath, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)
    if err != nil {
        return c.Status(500).SendString("Error opening temporary file")
    }
    defer tempFile.Close()

    // Save the chunk to the temporary file
    src, err := file.Open()
    if err != nil {
        return c.Status(500).SendString("Error opening uploaded file")
    }
    defer src.Close()

    _, err = io.Copy(tempFile, src)
    if err != nil {
        return c.Status(500).SendString("Error saving chunk")
    }

    // If this is the last chunk, rename the file
    if chunkNumber == totalChunks-1 {
        finalPath := filepath.Join(uploadDir, file.Filename)
        err = os.Rename(tempFilePath, finalPath)
        if err != nil {
            return c.Status(500).SendString("Error finalizing file")
        }
        fmt.Printf("File saved: %s\n", finalPath)
    }

    return c.SendString("Chunk uploaded successfully")
}
