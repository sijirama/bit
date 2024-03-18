CC = cc
EXECUTABLE = program

test: build
	./$(EXECUTABLE)

build: $(EXECUTABLE)

$(EXECUTABLE): main.c
	$(CC) main.c -o $(EXECUTABLE)

clean:
	rm -f $(EXECUTABLE)

