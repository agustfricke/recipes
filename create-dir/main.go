package main

import (
	"fmt"
	"os"
)

func main() {
  if err := os.MkdirAll("/home/agust/personal/recipes/create-dir/test", 0755); err != nil {
    panic(fmt.Sprintf("Failed to create upload directory: %v", err))
  }
}
