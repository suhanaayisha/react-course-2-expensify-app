// Amounts are stored in cents
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

export default (amountInCents = 0) => formatter.format(amountInCents / 100);
