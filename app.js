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

    if(!destination) {
        if(type == 'deposit' && amount) {
            accounts.push(createAccount(accounts.length+1, type, amount));
            res.status(201).json('Account Created');
        } else {
            res.status(404).json('invalid content');
        }
    } else if (type == 'deposit' && amount) {
        let account = findAccount(destination);
        if(account) { 
            account.amount = parseInt(account.amount) + parseInt(amount);
            account.type = type;
            accounts[destination] = account;
            res.status(200).json('Deposit Success')
        } else {
            res.status(400).json('Error')
        }
    } else if (type == 'withdraw' && amount) {
        let account = findAccount(destination);
        if(account) { 
            account.amount = parseInt(account.amount) - parseInt(amount);
            account.type = type;
            accounts[destination] = account;
            res.status(200).json('Withdraw Success')
        } else {
            res.status(404).json('Error')
        }
    } else if (type == 'transfer' && amount) {
        if(!destination || !origin) { 
            res.status(404).json('Error')
        }

        let from = findAccount(origin);
        let to = findAccount(destination);

        if(from && to) {
            if(from.amount >= amount) {
                to.amount = parseInt(to.amount) + parseInt(amount);
                to.type = type;
                from.amount = parseInt(from.amount) - parseInt(amount)
                accounts[destination] = to;
                accounts[origin] = from;
                res.status(200).json('Transfer Success')
            } else {
                res.status(200).json('Insufficient Funds')
            }
            
        } else {
            res.status(404).json('Error')
        }
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