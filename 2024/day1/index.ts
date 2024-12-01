main();

async function main() {
    const data = Bun.file('input').stream();
    const reader = data.getReader();

    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            break;
        } else {
            console.log(value.length);
        }
    }
}