package main

import "fmt"

type cacheKey int
type cacheValue interface{}

type CacheObject struct {
    key   cacheKey
    value cacheValue
}

func main() {
	fmt.Println("HELLO WORLD")
}
