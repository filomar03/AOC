use common::read_input;

fn main() {
    let input = read_input();
    let banks: Vec<BatteryBank> = Vec::from_iter(input.split("\n").map(|b| BatteryBank::new(b)));

    for bank in &banks {
        println!(
            "{} -> {}",
            bank.iter()
                .map(|j| j.to_string())
                .reduce(|acc, s| acc + s.as_str())
                .unwrap(),
            get_max_joltage(bank)
        );
    }

    // let acc = banks.iter().fold(0, |acc, b| acc + get_max_joltage(b));
    // println!("Answer (part 1): {}", acc);
}

const BASE: u32 = 10;

type joltage = u32;

struct BatteryBank {
    bank: Vec<joltage>,
}

impl BatteryBank {
    fn new(bank: &str) -> Self {
        BatteryBank {
            bank: Vec::from_iter(bank.chars().map(|c| c.to_digit(BASE).unwrap())),
        }
    }

    fn max_joltage(&self, battery_num: u32) -> joltage {
        let batteries: &[joltage] = Box::new([0, battery_num]);
    }
}

// fn get_max_joltage(bank: &Bank) -> joltage {
//     let mut j_d1 = bank[0];
//     let mut j_d2 = bank[1];
//     for i in 1..bank.len() - 1 {
//         let a = bank[i];
//         let b = bank[i + 1];

//         if bank[i] > j_d1 {
//             j_d1 = bank[i];
//             j_d2 = bank[i + 1];
//         } else if bank[i + 1] > j_d2 {
//             j_d2 = bank[i + 1];
//         }
//     }

//     j_d1 * 10 + j_d2
// }
