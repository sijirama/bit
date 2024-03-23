#include "main.h"
#include <stdio.h>
#include <stdlib.h>

struct Node {
	int data;
	struct Node *next;
};

struct Node *head = NULL;

void insert(int data) {

	struct Node *NewNode = malloc(sizeof(struct Node));

	if (NewNode == NULL) {
		printf("Error initializing Node in Memory\n");
		return;
	}

	NewNode->data = data;
	NewNode->next = NULL;

	if (head == NULL) {
		head = NewNode;
		return;
	}

	struct Node *temp = head;

	while (temp->next != NULL) {
		temp = temp->next;
	}

	temp->next = NewNode;
}

void displayList(struct Node *head) {
	if (head == NULL) {
		return;
	}
	struct Node *temp = head;

	while (temp != NULL) {
		printf("%d \n", temp->data);
		temp = temp->next;
	}
	printf("\n");
}
