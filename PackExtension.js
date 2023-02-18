import chalk from "chalk";
import fs from "fs";
import archiver from "archiver";

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

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

if (useLocalDirectory && fs.existsSync(localBin)) {
    let found_directories = getDirectories(localBin);
    for (var dir of found_directories) {
        let full_path = localBin + "/" + dir;
        var file_output = fs.createWriteStream(`${localBin}/${dir}.zip`);
        var file_archive = archiver('zip');

        const func_promise = new Promise((res, rej) => {
            file_archive
                .directory(full_path, false)
                .on('error', err => {
                    log_error(err)
                    reject(err)
                })
                .pipe(file_output)
            ;
            file_output.on('close', function () {log_success(`Created temporary '.zip' => '${dir}.zip' with a total of ${file_archive.pointer()} bytes.`)})
            file_archive.finalize();


            setTimeout(() => {
                // Check if the archive is there, if so, remove it.
                fs.stat(`${full_path}.zip`, function (e, s) {
                    if (e && e.code == 'ENDENT') log_warning(`Hey! Are you sure that ${full_path}.zip is a file? We couldn't find it.`)

                    fs.rename(`${full_path}.zip`, `${full_path}${extName}`, function (e) {
                        if (e) log_warning(`Hey! We couldn't rename ${full_path}.zip because it's not a file.`)
                    })

                    fs.rmSync(`${full_path}.zip`, {
                        force: true,
                    })
                }) 
                return;
            }, 5000);
            

        })

    }

}


if (!useLocalDirectory && fs.existsSync(unparsed_command_line_arguments[0])) {
    let found_directories = getDirectories(unparsed_command_line_arguments[0]);
    for (var dir of found_directories) {
        let full_path = unparsed_command_line_arguments[0] + "/" + dir;
        var file_output = fs.createWriteStream(`${unparsed_command_line_arguments[0]}/${dir}.zip`);
        var file_archive = archiver('zip');

        const func_promise = new Promise((res, rej) => {
            file_archive
                .directory(full_path, false)
                .on('error', err => {
                    log_error(err)
                    reject(err)
                })
                .pipe(file_output)
            ;
            file_output.on('close', function () {log_success(`Created temporary '.zip' => '${dir}.zip' with a total of ${file_archive.pointer()} bytes.`)})
            file_archive.finalize();

            // Check if the archive is there, if so, remove it.
            fs.stat(`${full_path}.zip`, function (e, s) {
                if (e && e.code == 'ENDENT') log_warning(`Hey! Are you sure that ${full_path}.zip is a file? We couldn't find it.`)

                fs.rename(`${full_path}.zip`, `${full_path}${extName}`, function (e) {
                    if (e) log_warning(`Hey! We couldn't rename ${full_path}.zip because it's not a file.`)
                })

                fs.rmSync(`${full_path}.zip`, {
                    force: true,
                })
            }) 
            log_info(`Created ${full_path}${extName} successfully.`)
            return;

        })

    }
}