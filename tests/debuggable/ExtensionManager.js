import chalk from "chalk";
import fs from "fs";
import { exec } from "child_process";

const localBin = './bin';

// Loggers
const log_error = (error_message) => {console.log(chalk.gray(`[${chalk.bold.red("-")}]: ${chalk.bold.italic.red(error_message)}`)); return};
const log_warning = (warning_message) => {console.log(chalk.gray(`[${chalk.bold.yellow("!")}]: ${chalk.italic.yellow(warning_message)}`)); return};
const log_info = (message) => {console.log(chalk.gray(`[${chalk.bold.blueBright("?")}]: ${chalk.italic.blueBright(message)}`)); return};
const log_success = (message) => {console.log(chalk.gray(`[${chalk.bold.greenBright("+")}]: ${chalk.italic.greenBright(message)}`)); return};

log_warning('Running `pack` and `unpack` from this ExtensionManager may cause color formatting issues. If you wish to have proper color formatting, use `npm run process:pack` or `npm run process:unpack`')
let unparsed_command_line_arguments = [];
process.argv.forEach(function (v, i , a) {
    unparsed_command_line_arguments.push(v);
})

unparsed_command_line_arguments.shift();
unparsed_command_line_arguments.shift();

if (unparsed_command_line_arguments.length <= 0) {
    log_info("You didn't supply any arguments! Womp Womp... :c");
} else {
    const valid_arguments = ['pack', 'unpack'];
    const argType = unparsed_command_line_arguments[0];
    const directory = unparsed_command_line_arguments[1];
    
    if (!valid_arguments.includes(argType)) log_error('Please include a valid argument type! ( ExtensionManager [pack, unpack] [directory_name (optional)])');

    if (directory && argType === 'pack') {
        // run PackExtension
        exec(`npm run process:pack ${directory}`, (error, stdout, stderr) => {
            if (error) log_error('There was an error running `pack`.');
            if (stderr) log_error('There was an error running `pack`.');
            log_info(stdout);
        });
    } else if (directory && argType === 'unpack') {
        // run unPackExtension
        exec(`npm run process:unpack ${directory}`, (error, stdout, stderr) => {
            if (error) log_error('There was an error running `pack`.');
            if (stderr) log_error('There was an error running `pack`.');
            log_info(stdout);
        });
    } else {
        if (argType === 'pack') {
            // run PackExtension
            exec(`npm run process:pack`, (error, stdout, stderr) => {
                if (error) log_error('There was an error running `pack`.');
                if (stderr) log_error('There was an error running `pack`.');
                log_info(stdout);
            });
        } else if (argType === 'unpack') {
            // run unPackExtension
            exec(`npm run process:unpack`, (error, stdout, stderr) => {
                if (error) log_error('There was an error running `pack`.');
                if (stderr) log_error('There was an error running `pack`.');
                log_info(stdout);
            });
        };
    };
};