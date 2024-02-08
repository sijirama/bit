package lru

import (
	"container/list"
	"errors"
)

type LRU struct {
	size      int
	items     map[interface{}]*list.Element
	evictList *list.List
}

//INFO: entry is used to hold a value in the evictList
type entry struct {
	key   interface{}
	value interface{}
}

//INFO: create a new lru cache
func New(size int) (*LRU, error) {

	if size < 0 {
		return nil, errors.New("Size must be positive")
	}

	return &LRU{
		size:      size,
		evictList: list.New(),
		items:     make(map[interface{}]*list.Element),
	}, nil
}

// INFO: deletes all the values in the lru items
func (c *LRU) Purge() {
	for k, _ := range c.items {
		delete(c.items, k)
	}
}

func (c *LRU) Add(key, value interface{}) (evicted bool) {

	// Check for existing item
	if ent, ok := c.items[key]; ok {
		c.evictList.MoveToFront(ent)
		ent.Value.(*entry).value = value
		return false
	}

	ent := &entry{key, value}
	entry := c.evictList.PushFront(ent)
	c.items[key] = entry

	evc := c.evictList.Len() > c.size
	if evc {
		// c.removeEldest()
	}
	return evc

}
