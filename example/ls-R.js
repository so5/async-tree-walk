const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const walk = require('../index');

const target = process.argv[2];
if(!target){
  console.log('you have to specify directory path');
  process.exit()
}

const result=[]
async function getChild(node){
  const children = await promisify(fs.readdir)(node);
  return children.map((e)=>{
    return path.resolve(node, e);
  });
}
async function isDir(node){
  const stats = await promisify(fs.stat)(node);
  return stats.isDirectory();
}
async function isFile(node){
  const stats = await promisify(fs.stat)(node);
  return stats.isFile();
}
function onDir (dir){
  result.push(dir+'/');
}
function onFile (file){
  result.push(file);
}

walk(target, getChild, isDir, isFile, onDir, onFile)
  .then(()=>{
    console.log(result);
  }).catch((e)=>{
    console.log(e);
  });
