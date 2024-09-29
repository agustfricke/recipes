package main

import (
	"fmt"
	"log"
	"reflect"
	"strconv"
)

func main() {
	isActiveBool, err := strconv.ParseBool("false")
	if err != nil {
    log.Fatal(err.Error())
    return 
	}
  fmt.Println(reflect.TypeOf(isActiveBool))
  isActiveOther, err := strconv.ParseBool("if")
  fmt.Println("the val", isActiveBool)
	if err != nil {
    log.Fatal(err.Error())
    return 
	}
  fmt.Println(reflect.TypeOf(isActiveOther))
  fmt.Println("the val", isActiveOther)
}
