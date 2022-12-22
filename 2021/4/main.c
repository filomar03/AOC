#include <stdio.h>
#include <stdlib.h>
#define BUFFER_LENGTH 3
#define EXTRACTIONS_COUNT 100
#define TABLE_SIZE 5

struct table
{
    unsigned char grid[TABLE_SIZE][TABLE_SIZE];
};
typedef struct table bingoTable;

void populate_table(bingoTable *table, int x, int y, int val) {
    table->grid[x][y] = val;
}

int is_winning_line(int *line) {
    for (int i = 0 ; i < TABLE_SIZE; i++) {
        if (line[i] == 0) {
            return 0;
        }
    }
    return 1;
}

int has_won(bingoTable *table) {
    int h_line[TABLE_SIZE], v_line[TABLE_SIZE];
    /* printf("\nhorizontal\tvertical\n"); //debug */
    for (int y = 0; y < TABLE_SIZE; y++) {
        for (int x = 0; x < TABLE_SIZE; x++) {
            h_line[x] = table->grid[x][y] > 100 ? 1 : 0;
            v_line[x] = table->grid[y][x] > 100 ? 1 : 0; 
        }
        /* print_array(h_line); //debug
        printf("\t"); //debug
        print_array(v_line); //debug
        printf("\n"); //debug */
        if (is_winning_line(h_line) || is_winning_line(v_line)) {
            return 1;
        }
    }
    /* getchar(); //debug */
    return 0;
}

int calc_turn_to_win(bingoTable *table, int *extractions, int extractions_length) {
    for (int i = 0; i < extractions_length; i++) {
        /* printf("turn %d: %d\n", i, extractions[i]); //debug */
        for (int y = 0; y < TABLE_SIZE; y++) {
            for (int x = 0; x < TABLE_SIZE; x++) {
                if (table->grid[x][y] == extractions[i]) {
                    table->grid[x][y] |= 1 << sizeof(table->grid[0][0]) * 8 - 1;
                    /* print_table(table); //debug */
                    if (has_won(table)) {
                        return i;
                    }
                }
            }
        }
    }
}

int calculate_points(bingoTable *table, char last_number) {
    unsigned int umrkd_sum = 0;
    for (int y = 0; y < TABLE_SIZE; y++) {
        for (int x = 0; x < TABLE_SIZE; x++) {
            if (table->grid[x][y] < 100) {
                umrkd_sum += table->grid[x][y];
            }
        }
    }
    return umrkd_sum * last_number;
}

void print_table(bingoTable *table) {
    printf("\n");
    for (int y = 0; y < TABLE_SIZE; y++) {
        for (int x = 0; x < TABLE_SIZE; x++) {
            if (table->grid[x][y] > 100) {
                printf("*%d*\t", table->grid[x][y] & ~(1 << sizeof(table->grid[0][0]) * 8 - 1));
            } else {
                printf("%d\t", table->grid[x][y]);
            }
        }
        printf("\n");
    }
    printf("\n");
}


//PART 1

/* int main() 
{
    FILE *fptr;
    fptr = fopen("..\\Resources\\input.txt", "r");

    if (fptr == NULL) 
    {
        printf("[ERROR] unable to open specified file");
        getchar();
        return 1;
    }

    char buffer[BUFFER_LENGTH];
    int extractions[EXTRACTIONS_COUNT];
    int extraction_counter = 0, table_counter = TABLE_SIZE * TABLE_SIZE, tables_counter = -1;
    bingoTable target_table, curr_table;
    int min_turns = EXTRACTIONS_COUNT, curr_turns;

    while (feof(fptr) == 0) 
    {
        for (int i = 0; i < BUFFER_LENGTH; i++) 
        {
            buffer[i] = fgetc(fptr);
            if (extraction_counter < EXTRACTIONS_COUNT) 
            {
                if (buffer[i] == ',' || buffer[i] == '\n') 
                {
                    buffer[i] = '\0';
                    break;
                }
            }
            else
            {
                if (table_counter == TABLE_SIZE * TABLE_SIZE) {
                    break;
                }
            }
        }

        if (extraction_counter < EXTRACTIONS_COUNT) 
        {
            extractions[extraction_counter] = atoi(buffer);
            //printf("%d\n", extractions[extraction_counter]);  //debug
            extraction_counter++;
        } else {
            if (table_counter == TABLE_SIZE * TABLE_SIZE) 
            {
                if (tables_counter >= 0) {
                    printf("\n\nNEW TABLE");
                    print_table(&curr_table); //debug
                    curr_turns = calc_turn_to_win(&curr_table, extractions, EXTRACTIONS_COUNT);
                    printf("turns to win: %d", curr_turns); //debug
                    if (curr_turns < min_turns) {
                        min_turns = curr_turns;
                        target_table = curr_table;
                    }
                }
                table_counter = 0;
                tables_counter++;
                continue;
            }
            buffer[BUFFER_LENGTH - 1] = '\0';
            populate_table(&curr_table, table_counter % TABLE_SIZE, table_counter / TABLE_SIZE, atoi(buffer));
            //printf("%s ", buffer);  //debug
            table_counter++;
        }
    }

    fclose(fptr);

    printf("\n\nminimum turns: %d\npoints: %d\n", min_turns, calculate_points(&target_table, extractions[min_turns]));
    print_table(&target_table);

    return 0;
} */


//PART 2

int main()
{
    FILE *fptr;
    fptr = fopen("..\\Resources\\input.txt", "r");

    if (fptr == NULL) 
    {
        printf("[ERROR] unable to open specified file");
        getchar();
        return 1;
    }

    char buffer[BUFFER_LENGTH];
    int extractions[EXTRACTIONS_COUNT];
    int extraction_counter = 0, table_counter = TABLE_SIZE * TABLE_SIZE, tables_counter = -1;
    bingoTable target_table, curr_table;
    int max_turns = 0, curr_turns;

    while (feof(fptr) == 0) 
    {
        for (int i = 0; i < BUFFER_LENGTH; i++) 
        {
            buffer[i] = fgetc(fptr);
            if (extraction_counter < EXTRACTIONS_COUNT) 
            {
                if (buffer[i] == ',' || buffer[i] == '\n') 
                {
                    buffer[i] = '\0';
                    break;
                }
            }
            else
            {
                if (table_counter == TABLE_SIZE * TABLE_SIZE) {
                    break;
                }
            }
        }

        if (extraction_counter < EXTRACTIONS_COUNT) 
        {
            extractions[extraction_counter] = atoi(buffer);
            //printf("%d\n", extractions[extraction_counter]);  //debug
            extraction_counter++;
        } else {
            if (table_counter == TABLE_SIZE * TABLE_SIZE) 
            {
                if (tables_counter >= 0) {
                    printf("\n\nNEW TABLE");
                    print_table(&curr_table); //debug
                    curr_turns = calc_turn_to_win(&curr_table, extractions, EXTRACTIONS_COUNT);
                    printf("turns to win: %d", curr_turns); //debug
                    if (curr_turns > max_turns) {
                        max_turns = curr_turns;
                        target_table = curr_table;
                    }
                }
                table_counter = 0;
                tables_counter++;
                continue;
            }
            buffer[BUFFER_LENGTH - 1] = '\0';
            populate_table(&curr_table, table_counter % TABLE_SIZE, table_counter / TABLE_SIZE, atoi(buffer));
            //printf("%s ", buffer);  //debug
            table_counter++;
        }
    }

    fclose(fptr);

    printf("\n\nmaximum turns: %d\npoints: %d\n", max_turns, calculate_points(&target_table, extractions[max_turns]));
    print_table(&target_table);

    return 0;
}