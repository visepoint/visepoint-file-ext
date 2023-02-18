## visepoint-extension
> Visepoint-Extension is a file archive maker that allows you to 'pack' and 'unpack' folders and store them as a '.vp-zip' file. This is useful for compressing large folders, backing up files, or sending files over the internet.
- - -

### Getting Started:
To get started, you will need to have [Node.js](https://nodejs.org/) installed on your computer. Once you have Node.js installed, you can clone the repository to your local machine:
```
git clone https://github.com/visepoint/visepoint-file-ext.git ./vp-ext
```

Next, navigate to the `./vp-ext` directory we made: 
```
cd vp-ext/
```

Then install the dependencies
```
npm i
```

- - -
### Usage
You can start the script by running the following commands:

```
npm run start pack
```
```
npm run start unpack
```

If you want to specify a directory you would like to pack all folders in, you can run:
```
npm run start pack directory_name
```
```
npm run start unpack directory_name
```

> **Warning**: These commands will either pack or unpack *every* folder in the directory you provided. Please do not run this command at the root of your system!


If you do not want to supply a folder name, it will default to a local folder located inside of the project directory called `./bin`.

- - -

TODO: Further compress the contents
TODO: Make visepoint-ext a global npm command
