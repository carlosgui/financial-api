const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const port=5000;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function createAccount(id, type, amount) {
    return {
        destination: id,
        type,
        amount,
    };
}

function findAccount(acc_id) {
    return accounts.find((acc) => acc.destination === acc_id)
}

const accounts = [
    createAccount('0', 'deposit', 100),
    createAccount('1', 'deposit', 200),
    createAccount('2', 'deposit', 300),
];

app.post('/reset', (req, res) => {
    res.status(200).json('OK');
});

app.post('/event', (req,res) => {
    const type = req.query.type;
    const amount = req.query.amount;
    const origin = req.query.origin;
    const destination = req.query.destination;

    if(!amount)
        res.status(400).json('Invalid arguments');

    if(!type)
        res.status(400).json('Invalid arguments');

    if(!destination) {
        if(type == 'deposit') {
            accounts.push(createAccount(accounts.length+1, type, amount));
            res.status(201).json('Account Created');
        } else {
            res.status(400).json('Invalid arguments');
        }
    }

    let account = findAccount(destination);
    if(!account)
        res.status(400).json('Invalid arguments');

    switch(type) {
        case 'deposit':
            account.amount = parseInt(account.amount) + parseInt(amount);
            account.type = type;
            accounts[destination] = account;
            res.status(200).json('Deposit Success');

            break;

        case 'withdraw':
            if(amount > account.amount) {
                res.status(403).json('Insufficient Funds');
                break;
            }

            account.amount = parseInt(account.amount) - parseInt(amount);
            account.type = type;
            accounts[destination] = account;
            res.status(200).json('Withdraw Success')
            break;

        case 'transfer':
            if(!origin) {
                res.status(403).json('Invalid Origin')
                break;
            }
                
            let from = findAccount(origin);
            let to = findAccount(destination);
            
            if(!from || !to) {
                res.status(400).json('Invalid arguments');
                break;
            }

            if(amount > from.amount) {
                res.status(403).json('Insufficient Funds');
                break;
            }

            to.amount = parseInt(to.amount) + parseInt(amount);
            to.type = type;

            from.amount = parseInt(from.amount) - parseInt(amount);
            from.type = type;

            accounts[destination] = to;
            accounts[origin] = from;

            res.status(200).json('Transfer Success');

            break;

        default:
            res.status(400).json('Invalid arguments')

            break;
    }
});

app.get('/accounts', (req, res) => {
    res.status(200).json(accounts);
});

app.get('/balance', (req, res) => {
    const account_id = req.query.account_id;
    if(!account_id) {
        res.status('400').json('Invalid Content');
    }
    const account = findAccount(account_id);

    if(!account) {
        res.status('404').json('account not found');
    } else {
        res.status(200).json('The Balance for ' + account_id + ' is R$ ' + accounts[account_id].amount);
    }
});