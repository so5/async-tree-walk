/*
 * terminology
 *
 * "inode" is the node which has more than one child.
 * "leaf" is the node which has no child.
 */

/**
 * get all children of given inode with promise
 * @callback getChild
 * @param {} node
 */
/**
 * check if the given node is inode or not
 * @callback inodeDeterminator
 * @param {} node
 */
/**
 * check if the given node is leaf or not
 * @callback lefaDeterminator
 * @param {} node
 */
/**
 * callback function on inode
 * @callback onInodeCallback
 * @param {} node
 */
/**
 * callback function on leaf
 * @callback onLeafCallback
 * @param {} node
 */

/**
 * asynchronous tree walk function which returns promise
 * @param node - start point of recursive walk
 * @param {getChild} getChild
 * @param {inodeDeterminator} isInode
 * @param {leafDeterminator} isLeaf
 * @param {onInodeCallback} onInode
 * @param {onLeafCallback} onLeaf
 */
async function walk(node, getChild, isInode, isLeaf, onInode, onLeaf){
  const children = await getChild(node);
  const p = children
    .map(async (e)=>{
      if(await isLeaf(e)){
        return onLeaf(e);
      }
      if(await isInode(e)){
        await onInode(e);
        return walk(e, getChild, isInode, isLeaf, onInode, onLeaf);
      }
    });
  return Promise.all(p);
}

module.exports = walk;
