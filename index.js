/*
 * terminology
 *
 * "inode" is the node which has more than one child.
 * "leaf" is the node which has no child.
 */

/**
 * get all children of given inode with promise
 * @callback getChild
 * @param {*} node - parent node
 * @returns {Promise[]} - array of child of node if fullfilled
 */
/**
 * @callback determinetor
 * @param {*} node
 * @returns {Promise} - true or false if fullfilled
 */
/**
 * @callback onNode
 * @param {*} node
 * @returns {Promise}
 */

/**
 * asynchronous tree walk function which returns promise
 * @param node - start point of recursive walk
 * @param {getChild} getChild
 * @param {determinator} isInode - determinator function which return true if given node is inode
 * @param {determinator} isLeaf  - determinator function which return true if given node is leaf
 * @param {onNode} onInode - callback function which perform on inode
 * @param {onNode} onLeaf  - callback function which perform on leaf node
 */
async function walk(node, getChild, isInode, isLeaf, onInode, onLeaf){
  const children = await getChild(node);
  return Promise.all(children
    .map(async (node)=>{
      if(await isLeaf(node)){
        return onLeaf(node);
      }else if(await isInode(node)){
        await onInode(node);
        return walk(node, getChild, isInode, isLeaf, onInode, onLeaf);
      }
    }));
}

module.exports = walk;
