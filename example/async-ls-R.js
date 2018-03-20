const path = require('path');
const fs = require('fs');
const {promisify} = require('util');
const walk = require('../index');

const target = process.argv[2];
if(!target){
  console.log('you have to specify directory path');
  process.exit()
}

async function getChild(node){
  const children = await promisify(fs.readdir)(node);
  return children.map((e)=>{
    return path.resolve(node, e);
  });
}
async function isDir(node){
  if(path.basename(node).startsWith('.')) return false //prevent to search hidden dir
  const stats = await promisify(fs.stat)(node);
  return stats.isDirectory();
}
async function isFile(node){
  if(path.basename(node).startsWith('.')) return false //prevent to show hidden file
  const stats = await promisify(fs.stat)(node);
  return stats.isFile();
}
function onDir (dir){
  console.log(dir+'/');
}

walk(target, getChild, isDir, isFile, onDir, console.log)
  .catch((e)=>{
    console.log(e);
  });
