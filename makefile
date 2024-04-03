.SILENT:

CC = cc
EXECUTABLE = program
FILES = main.c 
FLAGS = -ledit

all: build
	./$(EXECUTABLE) && make clean

build: $(EXECUTABLE)

$(EXECUTABLE): main.c
	$(CC) -Wall ${FILES} ${FLAGS} -o $(EXECUTABLE)

clean:
	rm -f $(EXECUTABLE) && rm -f ./a.out

