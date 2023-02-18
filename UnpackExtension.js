import chalk from "chalk";
import fs from "fs";

// Important variables
const localBin = './bin';
const extName = '.vp-zip'

// Loggers
const log_error = (error_message) => {console.log(chalk.gray(`[${chalk.bold.red("-")}]: ${chalk.bold.italic.red(error_message)}`)); return};
const log_warning = (warning_message) => {console.log(chalk.gray(`[${chalk.bold.yellow("!")}]: ${chalk.italic.yellow(warning_message)}`)); return};
const log_info = (message) => {console.log(chalk.gray(`[${chalk.bold.blueBright("?")}]: ${chalk.italic.blueBright(message)}`)); return};
const log_success = (message) => {console.log(chalk.gray(`[${chalk.bold.greenBright("+")}]: ${chalk.italic.greenBright(message)}`)); return};

// Check for command-line arguments, if not, use local directory ./build_tests
let unparsed_command_line_arguments = [];
process.argv.forEach(function (v, i , a) {
    unparsed_command_line_arguments.push(v);
})

unparsed_command_line_arguments.shift();
unparsed_command_line_arguments.shift();

let useLocalDirectory = false;
if (unparsed_command_line_arguments.length === 0) {
    log_warning(`You didn't specify a directory. Using local '${localBin}' folder.`);
    useLocalDirectory = true;
}

const getFiles = source => {
    let all_files = [];
    fs.readdirSync(source).forEach((file) => {
        if (file.endsWith(extName)) all_files.push(file)
    })
    return all_files
}
    

if (useLocalDirectory && fs.existsSync(localBin)) {
    let parseable_files = [ ...getFiles(localBin) ]

    for (var parsable_file of parseable_files) {
        log_info(parsable_file);
        let current_path = localBin + "/" + parsable_file;
        fs.stat(`${current_path}`, function (e, s) {
            if (e && e.code == 'ENDENT') log_warning(`Couldn't unpack something that doesn't even exist: ${current_path}`)
            let new_path = current_path.replace(extName, '.zip')
            fs.rename(`${current_path}`, `${new_path}`, function (e) {
                if (e) log_error('There was an error unpacking the file: ' + e)
                log_success('Successfully unpacked: ' + current_path.replace(extName, ''))
            })
            return;
        })

    }

}

if (!useLocalDirectory && fs.existsSync(unparsed_command_line_arguments[0])) {
    let parseable_files = [ ...getFiles(unparsed_command_line_arguments[0]) ]

    for (var parsable_file of parseable_files) {
        log_info(parsable_file);
        let current_path = unparsed_command_line_arguments[0] + "/" + parsable_file;
        fs.stat(`${current_path}`, function (e, s) {
            if (e && e.code == 'ENDENT') log_warning(`Couldn't unpack something that doesn't even exist: ${current_path}`)
            let new_path = current_path.replace(extName, '.zip')
            fs.rename(`${current_path}`, `${new_path}`, function (e) {
                if (e) log_error('There was an error unpacking the file: ' + e)
                log_success('Successfully unpacked: ' + current_path.replace(extName, ''))
            })
            return;
        })

    }

}