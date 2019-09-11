const add = ( a, b) => a + b ;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

test('should add two numbers', () => {
    const result = add(3, 4);
    expect(result).toBe(7);
});

test('greeting', () => {
    const result = generateGreeting('Suhana');
    expect(result).toBe('Hello Suhana!')
});

test('greeting when no name is given', () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Anonymous!')
});