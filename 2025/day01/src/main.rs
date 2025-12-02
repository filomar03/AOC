const START: i32 = 50;
const MAX: i32 = 100;
const RIGHT_PREFIX: &str = "R";

use common::read_input;

fn main() {
    let input = read_input();
    let instructions: Vec<&str> = input.split("\n").collect();

    let password1 = get_password(&instructions);
    println!("Answer (part 1): {}", password1);

    let password2 = get_password2(&instructions);
    println!("Answer (part 2): {}", password2);
}

fn get_password(instructions: &[&str]) -> i32 {
    let mut password = 0;
    let mut safe = START;

    for &instruction in instructions {
        let value: i32 = str::parse(&instruction[1..]).unwrap();
        if &instruction[..1] == RIGHT_PREFIX {
            safe += value;
        } else {
            safe -= value;
        }

        safe %= MAX;

        if safe == 0 {
            password += 1;
        }
    }

    password
}

fn get_password2(instructions: &[&str]) -> i32 {
    let mut password = 0;
    let mut safe = START;

    for &instruction in instructions {
        let value: i32 = str::parse(&instruction[1..]).unwrap();
        password += value / MAX;
        let converted_value = value % MAX;

        if &instruction[..1] == RIGHT_PREFIX {
            safe += converted_value;
        } else {
            safe += MAX - converted_value;
            if safe >= MAX {
                password -= 1;
            } else {
                password += 1;
            }
        }

        password += safe / MAX;
        safe %= MAX;
    }

    password
}
