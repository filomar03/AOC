use std::fmt;

use common::read_input;

fn main() {
    let input = read_input();
    let rows = Vec::from_iter(input.split('\n'));
    let output = String::new();

    let mut i = 0;
    for row in 0..rows.len() {
        let len = rows[row].len();
        for _ in 0..len {
            let mut nearby_spaces = 0;
            for val in KernelIterator::new(&input, len as u32, i) {
                if val == '.' {
                    nearby_spaces += 1;
                }
            }
            i += 1;
            output.push(
                if nearby_spaces > 4 {
                    'x'
                } else
            );
        }
    }
}

struct KernelIterator<'a> {
    buf: &'a str,
    width: u32,
    index: u32,
    x_offset: i32,
    y_offset: i32,
}

impl<'a> KernelIterator<'a> {
    fn new(buf: &'a str, width: u32, index: u32) -> Self {
        Self {
            buf,
            width,
            index,
            x_offset: -1,
            y_offset: -1,
        }
    }

    fn val(&self) -> Option<char> {
        let index =
            usize::try_from(self.index as i32 + self.width as i32 * self.y_offset + self.x_offset)
                .ok()?;

        self.buf.chars().nth(index)
    }
}

impl<'a> Iterator for KernelIterator<'a> {
    type Item = char;

    fn next(&mut self) -> Option<Self::Item> {
        if self.y_offset > 1 {
            return None;
        }

        if self.x_offset > 1 {
            self.x_offset = -1;
            self.y_offset += 1;
        }

        if self.x_offset == 0 && self.y_offset == 0 {
            self.x_offset += 1;
        }

        self.x_offset += 1;

        return if let None = self.val() {
            Some('.')
        } else {
            self.val()
        };
    }
}

enum Cell {
    PaperRoll(u32),
    EmptySpace,
}

impl fmt::Display for Cell {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Self::PaperRoll(spaces) if *spaces > 4 => "x",
                Self::PaperRoll(_) => "@",
                Self::EmptySpace => ".",
            }
        )
    }
}
