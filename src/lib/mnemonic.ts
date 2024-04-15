import * as bip39 from 'bip39'
import * as fs from 'fs'
import 'crypto'
import * as path from 'path'
import { ParsedPath } from 'path'
import colors from 'colors'
colors.enable()
import { ethers } from "ethers";
import { existsSync, mkdirSync } from 'fs';
const readline = require('readline-sync')

const generateMnemonic = (filePath: string, count: number) => {
    let myText = '';
    for (let i = 0; i < count; i++) {
        const mnemonic = bip39.generateMnemonic()
        myText += mnemonic
        myText += '\n';
    }
    save(filePath, myText)
}

const save = (filePath: string, content: string) => {
    // to protect your exist Mnemonic file, double check the file exists
    let fileExists = fs.existsSync(filePath);
    if (fileExists) {
        filePath = newFileStep1(filePath)
        fileExists = fs.existsSync(filePath);
    }

    if (fileExists) {
        filePath = newFileStep2(filePath)
        fileExists = fs.existsSync(filePath);
    }
    if (fileExists) {
        console.error(`Error, File ${filePath} exists, please provide a new file path`.red);
        process.exit(1);
    }
    fs.writeFileSync(filePath, content);
    console.log(`Successfully Generate Mnemonics to: ${filePath}`.green);
}

const newFileStep1 = (filePath: string): string => {
    const parse: ParsedPath = path.parse(filePath)
    const newFile = parse.name + `.${Date.now()}` + parse.ext
    return filePath.replace(parse.base, newFile)
}

const newFileStep2 = (filePath: string): string => {
    const parse: ParsedPath = path.parse(filePath)
    const newFile = parse.name + `.${crypto.randomUUID().toString()}` + parse.ext
    return filePath.replace(parse.base, newFile)
}

const generateEncryptedMnemonic = async (filePath: string, count: number) => {

    const pwd = readline.question('Please Input Password(For Encrypt your file):', { hideEchoBack: true }) as string
    const pwd1 = readline.question('Please repeat the password:', { hideEchoBack: true }) as string
    if (pwd.length <= 0) {
        console.log('Invalid Password,');
        process.exit(1)
    }
    if (pwd != pwd1) {
        console.log('Invalid Password,');
        process.exit(1)
    }

    checkDir()

    for (let i = 0; i < count; i++) {
        const mnemonic = bip39.generateMnemonic()
        const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic)
        const json = await wallet.encrypt(pwd)
        fs.writeFileSync(`${filePath}/${i}.txt`, json);
    }

    console.log(`${count} Mnemonices Saved to ${filePath} Successfully`);
    

    function checkDir() {
        if (existsSync(filePath)) {
            console.error(`Directory [${filePath}] Exists, Please choose a new one `);
            process.exit(1)
        }
        try {
            mkdirSync(filePath, { recursive: true });
            console.log('Directory created successfully!');
        } catch (err) {
            console.error(err);
            process.exit(1)
        }
    }
}

export { generateMnemonic, generateEncryptedMnemonic }