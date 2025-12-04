use common::read_input;

fn main() {
    let input = read_input();
    let ranges: Vec<Range> = input
        .split(",")
        .map(|r| {
            // let v: Vec<T>
            // v[..]:
            // => deref on Vec<T> returning &[T]
            // => Index::index(self: &[T], idx: Index<SliceIndex<[T]>>)
            // => RangeFull -> impl -> SliceIndex<[T]>
            // => idx.index(self, &[T]) -> whole slice
            if let [start, end] = r.split("-").take(3).collect::<Vec<&str>>()[..] {
                Range::new(Id(start.parse().unwrap()), Id(end.parse().unwrap()))
            } else {
                panic!("Bad formatting");
            }
        })
        .collect();

    let mut acc: Vec<Id> = vec![];
    let mut acc2: Vec<Id> = vec![];
    for r in ranges {
        let mut ids = r.get_invalid();
        let mut ids2 = r.get_invalid2();
        // let ids_str: Vec<String> = ids2.iter().map(|f| f.0.to_string()).collect();
        // println!(
        //     "start: {:?}\nend: {:?}\n{}\n",
        //     r.start,
        //     r.end,
        //     ids_str.join(", ")
        // );

        acc.append(&mut ids);
        acc2.append(&mut ids2);
    }
    println!(
        "Answer (part 1): {}",
        acc.iter().fold(0, |acc, i| acc + i.0)
    );
    println!(
        "Answer (part 2): {}",
        acc2.iter().fold(0, |acc, i| acc + i.0)
    );
}

// useless
#[derive(Clone, Copy, Debug)]
struct Id(u64);

impl Id {
    fn is_valid(&self) -> bool {
        let str = self.0.to_string();
        if str.len() % 2 != 0 {
            return true;
        }

        let a = &str[..str.len() / 2];
        let b = &str[str.len() / 2..];

        a != b
    }

    fn is_valid2(&self) -> bool {
        let str = self.0.to_string();
        let len = str.len();

        if len < 2 {
            return true;
        }

        for n in (2..=len).rev() {
            if len % n != 0 {
                continue;
            }

            let mut parts: Vec<&str> = vec![];
            let mut str = str.as_str();

            for _ in 0..n {
                let (part, rest) = str.split_at(len / n);
                str = rest;
                parts.push(part);
            }

            let identical = parts
                .iter()
                .fold(parts[0], |prev, part| if prev == *part { part } else { "" });

            if identical != "" {
                return false;
            }
        }

        true
    }
}

struct Range {
    start: Id,
    end: Id,
}

impl Range {
    fn new(start: Id, end: Id) -> Self {
        Self { start, end }
    }

    // instead of trying every id in range find directly hte next invalid
    fn get_invalid(&self) -> Vec<Id> {
        let mut ids = Vec::new();
        let mut current = self.start;
        while current.0 <= self.end.0 {
            if !current.is_valid() {
                ids.push(current);
            }

            current.0 += 1;
        }
        ids
    }

    fn get_invalid2(&self) -> Vec<Id> {
        let mut ids = Vec::new();
        let mut current = self.start;
        while current.0 <= self.end.0 {
            if !current.is_valid2() {
                ids.push(current);
            }

            current.0 += 1;
        }
        ids
    }
}
