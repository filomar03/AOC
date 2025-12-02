pub fn read_input() -> String {
    let content = std::fs::read_to_string("day01/input.txt").unwrap();
    content.trim().to_string()
}
