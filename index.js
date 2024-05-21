#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000; // Dollar
let myPin = 1357;
console.log(chalk.blue("\n \tWelcome to Project with Ammar - ATM Machine\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.yellow("enter your pin"),
        type: "number"
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nCorrect pin code, Login Sucessfully!!\n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: "please select option",
            type: "list",
            choices: ["withdraw", "check balance"],
        }
    ]);
    if (operationAns.operation === "withdraw") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawalMethod",
                type: "list",
                message: "select a withdrawal method",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawalMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select Amount",
                    choices: [1000, 2000, 5000, 8000, 10000, 20000, 40000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("\nInsufficient Balance\n"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} Withdraw Sucessfully`);
                console.log(chalk.greenBright `\nYour Remaining Balance is: ${myBalance}\n`);
            }
        }
        else if (withdrawAns.withdrawalMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: "enter your amount",
                    type: "number"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("\nInsufficient Balance\n"));
            }
            // Use Assignment operators like, =, +=, -= below:
            myBalance -= amountAns.amount;
            console.log(`${amountAns.amount} Withdraw Successfully`);
            console.log("Your remaining balance is:" + myBalance);
        }
    }
    else if (operationAns.operation === "check balance") {
        console.log(chalk.cyanBright("\nyour balance is:\n" + myBalance));
    }
}
else {
    console.log(chalk.red("\nIncorrect pin number\n"));
}
