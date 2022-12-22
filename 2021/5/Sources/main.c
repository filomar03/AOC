#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define MAX_NUMBER_LENGTH 3
#define BUFFER_SIZE MAX_NUMBER_LENGTH * 4 + 7
#define LINES_COUNT 500

typedef struct point {
    int x;
    int y;
} Point;

typedef struct line {
    Point p1;
    Point p2;
} Line;

typedef struct terrain {
    int rows;
    int columns;
    int **grid;
} Terrain;

void fill_buffer(char *buffer, int buffer_length, FILE *stream);

int index_of(char *string, char target);

int numeric_substring(char *destination, char *string);

int is_digit(char character);

int get_length(char *string);

int main(int argc, char const *argv[]) {
    FILE *fptr;
    fptr = fopen("..\\Resources\\input.txt", "r");

    if (fptr == NULL) 
    {
        printf("[ERROR] unable to open specified file");
        getchar();
        return 1;
    }

    //count the number of tmp_point
    /* int lines = 0;
    char prova[100];
    while (feof(fptr) == 0)
    {   
        fscanf(fptr, "%[^\n]\n", prova);
        printf("%s\n", prova);
        lines++;
    }

    rewind(fptr);

    printf("%d lines detected", lines);
    getchar(); */

    Line lines[LINES_COUNT];
    int counter = 0;
    char buffer[BUFFER_SIZE + 1];
    while (feof(fptr) == 0 && counter < LINES_COUNT)
    {   
        fill_buffer(buffer, BUFFER_SIZE, fptr); //read from file
        //repositioning file pointer right after the new line
        /* int new_line_index = index_of(buffer, '\n');
        buffer[new_line_index] = '\0';
        fseek(fptr, new_line_index - BUFFER_SIZE, SEEK_CUR); */
        //printf("%s\n", buffer);

        size_t offset = 0;  //parse the buffer to obtain a line struct
        int skips = 0;
        char tmp_point_str[MAX_NUMBER_LENGTH + 1];
        Point tmp_point;
        for (int i = 0; i < 4; i++) {
            if (i > 0) {
                offset += get_length(tmp_point_str) + skips;
            }
            skips = numeric_substring(tmp_point_str, buffer + offset);
            
            int *tmp_pt_ptr = &tmp_point.x;
            tmp_pt_ptr += i % 2;
            *tmp_pt_ptr = atoi(tmp_point_str);
            
            if (i % 2 == 1) {
                Point *tmp_ln_ptr = &lines[counter].p1;
                tmp_ln_ptr += i / 2;
                *tmp_ln_ptr = tmp_point;
            }
        }
        
        counter++;
    }    

    fclose(fptr);

    int **grid = calloc(sizeof(int), 1000000);
    for (int i = 0; i < LINES_COUNT; i++) {
        printf("%d\n", grid[i][i]);
    }

    return 0;
}

void fill_buffer(char *buffer, int buffer_length, FILE *stream) {
    for (int i = 0; i < buffer_length; i++) {
        buffer[i] = getc(stream);
        if (buffer[i] == '\n') {
            buffer[i] = '\0';
            return;
        }
    }
}

int index_of(char *string, char target) {
    int i = 0;
    while (string[i] != '\0') {
        if (string[i] == target) {
            return i;
        }
        i++;
    }
    return -1;
}

int numeric_substring(char *destination, char *string) {
    destination[MAX_NUMBER_LENGTH] = '\0';
    int i = 0, offset = 0;
    while (i - offset < MAX_NUMBER_LENGTH) {
        if (is_digit(string[i])) {
            destination[i - offset] = string[i];
        } else if (i - offset == 0) {
            offset++;
        } else if (i - offset > 0) {
            destination[i - offset] = '\0';
            break;
        }
        i++;
    }
    return offset;
}

int is_digit(char character) {
    if (character < 48 || character > 57) 
        return 0;
    else 
        return 1;
}

int get_length(char *string) {
    int i = 0;
    while (string[i] != '\0') {
        i++;
    }
    return i;
}