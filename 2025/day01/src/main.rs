const START: i32 = 50;
const MAX: i32 = 100;
const RIGHT_PREFIX: &str = "R";

use std::ffi::FromVecWithNulError;

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
    let mut dial = START;

    for &instruction in instructions {
        let value: i32 = instruction[1..].parse().unwrap();
        if &instruction[..1] == RIGHT_PREFIX {
            dial += value;
        } else {
            dial -= value;
        }

        dial %= MAX;

        if dial == 0 {
            password += 1;
        }
    }

    password
}

fn get_password2(instructions: &[&str]) -> i32 {
    let mut password = 0;
    let mut dial = START;

    for &instruction in instructions {
        let value: i32 = instruction[1..].parse().unwrap();

        let mod_value = value % MAX;
        password += value / MAX;

        if &instruction[..1] == RIGHT_PREFIX {
            dial += mod_value;
            if dial >= MAX {
                password += 1;
                dial -= MAX;
            }
        } else {
            if dial > 0 {
                if mod_value >= dial {
                    dial += MAX - mod_value;
                    dial %= MAX;
                    password += 1;
                } else {
                    dial -= mod_value;
                }
            } else {
                dial += MAX - mod_value;
            }
        }
    }

    password
}
